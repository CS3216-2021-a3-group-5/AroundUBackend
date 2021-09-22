import * as geoutils from "geolocation-utils";
import { Request, Response } from "express";
import {Promotion} from "../models/promotion";
import { NearbyStoreData} from "../models/store";

import {getStoreByIdWithCompany, getStores} from "../database/storesTable";
import {getPrmotionByID} from "../database/promotionsTable";
import { BADREQUEST, OK, NOTFOUND } from "../statuscodes/statusCode";
import { getNumberOfPromotionOfStore, getPromotionIdByStoreID } from "../database/promotionStoreTable";
const range = 30000;

export async function nearbyStoresDataGET(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const body = JSON.parse(req.body)
    try{
        let stores = await getNearbyStores(body.currentLocation)
        return res.status(OK).json({
            stores: stores
        })
    } catch (err) {
        console.log(err)
        return res.status(BADREQUEST).json({
            message: err
        })
    }

    //let stores = getStores(loc);
   /* if (stores.length != 0) {
        res.send(stores.map((store) => new NearbyStoreData(store)))
    } else {
        try {
            await populateRandomData(loc)
            let stores = getStores(loc);
            res.send(stores.map((store) => new NearbyStoreData(store)))
        } catch (err) {
            throw err;
        }
    }*/
}
export async function nearbyStoreID(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    //const body = JSON.parse(req.body)  
    //let currentLocation = req.body.currentLocation
    let currentLocation = JSON.parse(req.body).currentLocation
    console.log(currentLocation)
    try {
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
// populates database with 1 copy of random company, store and promotion
/*async function populateRandomData(loc: geoutils.LatLon) {
    for (let i = 0; i < 3; i++) {
        try {
            const company = new Company();
            await createCompany(company);
            const location = getRandomLocation(loc);
            const store = new Store(location, company);
            await createStore(store);
            const promo = new Promotion(company);
            await createPromotion(promo);
        } catch (err) {
            throw err;
        }
    }
}
*/
export async function getNearbyStores(loc: geoutils.LatLon): Promise<NearbyStoreData[]> {
    let filteredrow = (await getStores()).rows.filter((row) => 
    geoutils.distanceTo(loc, {lon: parseFloat(row.longitude), lat: parseFloat(row.latitude)}) < range)
    
    let currentPromotionDictionary = new Map<number, Promotion>()
    let storeData = await Promise.all(filteredrow.map(async (row) => {
        let promosId = (await getPromotionIdByStoreID(row.store_id)).rows
        //console.log(promosId)
        let promos = (await Promise.all(promosId.map(async (row) => {
            let promo_id = row.promotion_id
            if (!currentPromotionDictionary.has(promo_id)) {
               let promotion = await getPrmotionByID(promo_id)
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
    return storeData.filter((x): x is NearbyStoreData => x !== null)
}


export interface StoreIDWithRange {
    store_id: number,
    distanceFrom: number
}
export async function getNearbyStoreID (loc: geoutils.LatLon): Promise<StoreIDWithRange[]> {
    let filteredrow = (await getStores()).rows.filter((row) => geoutils.distanceTo(loc, {lon: parseFloat(row.longitude), lat: parseFloat(row.latitude)}) < range)
    return (await Promise.all(filteredrow.map(async (row) => {
        let count = await(getNumberOfPromotionOfStore(row.store_id))
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
        let promos = (await Promise.all((await getPromotionIdByStoreID(store_id)).rows.map(async (row) => {
            let promo_id = row.promotion_id
            if (!currentPromotionDictionary.has(promo_id)) {
              let promotion = await getPrmotionByID(promo_id)
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
