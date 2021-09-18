import * as geoutils from "geolocation-utils";
import { Request, Response } from "express";
import {Promotion} from "../models/promotion";
import {Store, NearbyStoreData} from "../models/store";
import { testStores } from "../testdata/testdata";
const range = 7000;

export function nearbyStoresDataGET(req: Request, res: Response) {
    const loc: geoutils.Location = req.body.currentLocation;
    const stores = Array.from(testStores.values()).filter((store) => {
        const dist = geoutils.distanceTo(loc, store.location);
        console.log(dist);
        return dist <= range
    })
    res.send(stores.map((store) => new NearbyStoreData(store)))
}

