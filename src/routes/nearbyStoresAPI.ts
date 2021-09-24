import * as geoutils from "geolocation-utils";
import { Request, Response } from "express";
import {Promotion} from "../models/promotion";
import { NearbyStoreData} from "../models/store";

import {getStoreByIdWithCompany, selectAllStoresFromCompany} from "../database/storesTable";
import {selectPromotionRowById} from "../database/promotionsTable";
import { BADREQUEST, OK, NOTFOUND } from "../statuscodes/statusCode";
import { selectNumberOfPromotionAtStore, selectPromotionIdAtStore } from "../database/promotionStoreTable";
const range = 2000;

export async function nearbyStoresDataGET(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        let currentLocation = {lat: parseFloat(req.query.lat as string), lon: parseFloat(req.query.lon as string)}
        let stores = await getNearbyStores(currentLocation)
        return res.status(OK).json({
            stores: stores
        })
    } catch (err) {
        console.log(err)
        return res.status(BADREQUEST).json({
            message: err
        })
    }
}
export async function nearbyStoreID(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    //const body = JSON.parse(req.body)
    //let currentLocation = req.body.currentLocation\
    try {
    let currentLocation = {lat: parseFloat(req.query.lat as string), lon: parseFloat(req.query.lon as string)}
    console.log(currentLocation)
        let ids = await getNearbyStoreID(currentLocation)
        console.log(ids)
        return res.status(OK).json({
            "store_id" : ids
        })
    } catch (err) {
        return res.status(BADREQUEST).json({
            "error": err
        })
    }
}
export async function getStoreByIds(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const body = JSON.parse(req.body)
    try {
        let stores = await getStoresFromID(body.store_ids)
        return res.status(OK).json({
            stores: stores
        })
    }
    catch (err) {
        return res.status(BADREQUEST).json({
            message: err
        })
    }
}

export async function getSingleStore(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        let stores = await getStoresFromID([parseInt(req.params.id)])
        if (stores.length ==0) {
            return res.status(NOTFOUND).json({
                error: "NO SUCH STORE!"
            })
        }
        return res.status(OK).json({
            stores: stores[0]
        })
    }
    catch (err) {
        return res.status(BADREQUEST).json({
            message: err
        })
    }
}

export async function getNearbyStores(loc: geoutils.LatLon): Promise<NearbyStoreData[]> {
    let filteredrow = (await selectAllStoresFromCompany()).rows.filter((row) =>
    geoutils.distanceTo(loc, {lon: parseFloat(row.longitude), lat: parseFloat(row.latitude)}) < range)

    let currentPromotionDictionary = new Map<number, Promotion>()
    let storeData = await Promise.all(filteredrow.map(async (row) => {
        let promosId = (await selectPromotionIdAtStore(row.store_id)).rows
        //console.log(promosId)
        let promos = (await Promise.all(promosId.map(async (row) => {
            let promo_id = row.promotion_id
            if (!currentPromotionDictionary.has(promo_id)) {
               let promotion = await selectPromotionRowById(promo_id)
               if (promotion != null) {
                currentPromotionDictionary.set(promo_id, promotion)
              }
            }
            return currentPromotionDictionary.get(promo_id)
        }))).filter((x): x is Promotion => x !== null)
        if (promos.length == 0) {
            return null
        }
        let storeLocation = {lon: row.longitude, lat: row.latitude}
        return {
            store_id: row.store_id,
            address: row.address,
            location: storeLocation,
            category_name: row.category,
            company_name: row.company_name,
            opening_hours: row.opening_hours,
            distanceFrom: geoutils.distanceTo(loc, storeLocation),
            promotions: promos
        }
    }))
    return storeData.filter((x): x is NearbyStoreData => x !== undefined)
}


export interface StoreIDWithRange {
    store_id: number,
    distanceFrom: number
}
export async function getNearbyStoreID (loc: geoutils.LatLon): Promise<StoreIDWithRange[]> {
    let filteredrow = (await selectAllStoresFromCompany()).rows.filter((row) => geoutils.distanceTo(loc, {lon: parseFloat(row.longitude), lat: parseFloat(row.latitude)}) < range)
    return (await Promise.all(filteredrow.map(async (row) => {
        let count = await(selectNumberOfPromotionAtStore(row.store_id))
        if (count == 0) return null;
        return {
        store_id: row.store_id,
        distanceFrom: geoutils.distanceTo(loc, {lon: parseFloat(row.longitude), lat: parseFloat(row.latitude)})
    }}))).filter((x): x is StoreIDWithRange => x !== null)

}

export async function getStoresFromID(ids: number[]): Promise<NearbyStoreData[]> {
    let currentPromotionDictionary = new Map<number, Promotion>()
    let data = await Promise.all(ids.map( async (store_id) => {
        let store = (await getStoreByIdWithCompany(store_id)).rows[0];
        let promos = (await Promise.all((await selectPromotionIdAtStore(store_id)).rows.map(async (row) => {
            let promo_id = row.promotion_id
            if (!currentPromotionDictionary.has(promo_id)) {
              let promotion = await selectPromotionRowById(promo_id)
              if (promotion != null) {
                currentPromotionDictionary.set(promo_id, promotion)
              }
            }
            return currentPromotionDictionary.get(promo_id)
        }))).filter((x): x is Promotion => x !== null)
        let storeLocation = {lon: store.longitude, lat: store.latitude}
        return {
            store_id: store_id,
            address: store.address,
            location: storeLocation,
            category_name: store.category,
            opening_hours: store.opening_hours,
            company_name: store.company_name,
            distanceFrom: 0,
            promotions: promos
        }
    }))
    return data
}
