import * as geoutils from "geolocation-utils";
import { Request, Response } from "express";
import {Promotion} from "../models/promotion";
import { NearbyStoreData} from "../models/store";

import {getStores} from "../database/storesTable";
import {getPrmotionByID} from "../database/promotionsTable";
import { BADREQUEST, OK } from "../statuscodes/statusCode";
import { getPromotionIdByStoreID } from "../database/promotionStoreTable";
const range = 4000;

export async function nearbyStoresDataGET(req: Request, res: Response) {

    try{
        console.log(geoutils.distanceTo(JSON.parse(req.body).currentLocation, {lon: 1, lat: 1}))
        let stores = await getNearbyStores(JSON.parse(req.body).currentLocation)
        res.status(OK).json({
            "stores": stores
        })
    } catch (err) {
        console.log(err)
        res.status(BADREQUEST).json({
            "error": err
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
async function getNearbyStores(loc: geoutils.LatLon): Promise<NearbyStoreData[]> {
    let filteredrow = (await getStores()).rows.filter((row) => geoutils.distanceTo(loc, {lon: parseFloat(row.longitude), lat: parseFloat(row.latitude)}) < range)
    let currentPromotionDictionary = new Map<number, Promotion>()
    let storeData = await Promise.all(filteredrow.map(async (row) => {
        let promos = await Promise.all((await getPromotionIdByStoreID(row.store_id)).rows.map(async (row) => {
            let promo_id = row.promotion_id
            if (!currentPromotionDictionary.has(promo_id)) {
               let promotion = await getPrmotionByID(promo_id)
               currentPromotionDictionary.set(promo_id, promotion)
            }
            return currentPromotionDictionary.get(promo_id) as Promotion
        }))
        let storeLocation = {lon: row.longitude, lat: row.latitude}
        return {
            store_id: row.store_id,
            address: row.address,
            location: storeLocation,
            category_name: row.category_name,
            opening_hours: row.opening_hours,
            distanceFrom: geoutils.distanceTo(loc, storeLocation),
            promotions: promos
        }
    }))
    return storeData
}
