import { Response, Request } from "express"
import { saveNewStore } from "../models/store"
import { getListOfStoresOfCompany } from "../models/store"
import { BADREQUEST, FORBIDDEN, OK } from "../statuscodes/statusCode"
import {removeStore, updateStoreTable} from "../database/storesTable";
import {createPromotionAtStore, deleteByStore} from "../database/promotionStoreTable";
export async function createNewStore(req: Request, res: Response) {
    try {
        await saveNewStore({
            store_id: req.body.store_id,
            company_name: res.locals.jwt.company_name,
            location: {
                lon: req.body.longitude,
                lat: req.body.latitude,
            },
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            promotionIDs: req.body.promotion_ids
        })
        return res.status(OK).send("Creation success!")
    } catch (err) {
        return res.status(BADREQUEST).send(err)
    }
}

export async function getUserStore(req: Request, res: Response) {
    try {
      let stores = await getListOfStoresOfCompany(res.locals.jwt.company_name)

      return res.status(OK).json({
          "stores": stores
      })
    } catch (err) {
      return res.status(FORBIDDEN).send(err)
    }
}

export async function updateStore(req: Request, res: Response) {
    try {
        const store = {
            store_id: req.body.store_id,
            address: req.body.address,
            location: req.body.location,
            opening_hours: req.body.opening_hours,
            promotionIDs: req.body.promotionIDs,
            company_name: res.locals.jwt.company_name
        };
        await updateStoreTable(store);
        await deleteByStore(store.store_id);
        await Promise.all(store.promotionIDs.map(async (id: number) => {
            await createPromotionAtStore(id, store.store_id)
        }))
        return res.status(OK).send();
    } catch (err) {
        return res.status(BADREQUEST).send(err)
    }
}

export async function deleteStore(req: Request, res: Response) {
    try {
        const store_id: number = req.body.store_id;
        await removeStore(store_id);
        res.status(200).send();
    } catch (err) {
        res.status(BADREQUEST).send(err)
    }
}
