import * as geoutils from "geolocation-utils";
import { Request, Response } from "express";
import {Promotion} from "../models/promotion";
import {Store, NearbyStoreData} from "../models/store";
import { testStores } from "../testdata/testdata";
import {Company} from "../models/company";
import {createCompany} from "../database/companiesTable";
import {getRandomLocation} from "../models/locationGenerator";
import {createStore} from "../database/storesTable";
import {createPromotion} from "../database/promotionsTable";
const range = 7000;

export async function nearbyStoresDataGET(req: Request, res: Response) {
    const loc: geoutils.LatLon = req.body.currentLocation;
    let stores = getStores(loc);
    if (stores.length != 0) {
         res.send(stores.map((store) => new NearbyStoreData(store)))
    }
    try {
        await populateRandomData(loc)
        let stores = getStores(loc);
        res.send(stores.map((store) => new NearbyStoreData(store)))
    } catch (err) {
        throw err;
    }
}

// populates database with 1 copy of random company, store and promotion
async function populateRandomData(loc: geoutils.LatLon) {
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

function getStores(loc: geoutils.LatLon): Array<Store> {
    return Array.from(testStores.values()).filter((store) => {
        const dist = geoutils.distanceTo(loc, store.location);
        console.log(dist);
        return dist <= range
    })
}
