import { Response, Request } from "express"
import { deleteStoreRow, selectStoreCompanyRowByCompany, updateStoreRow} from "../database/storesTable"
import { saveNewStore } from "../models/store"
import { getListOfStoresOfCompany } from "../models/store"
import { BADREQUEST, FORBIDDEN, OK } from "../statuscodes/statusCode"
import {insertPromotionAtStoreRow, deleteRowByStore} from "../database/promotionStoreTable";

export async function createNewStore(req: Request, res: Response) {
    const body = JSON.parse(req.body)
    try {
        await saveNewStore({
            store_id: body.store_id,
            company_name: res.locals.jwt.company_name,
            location: {
                lon: body.longitude,
                lat: body.latitude,
            },
            address: body.address,
            opening_hours: body.opening_hours,
            promotionIDs: body.promotion_ids
        })
        return res.status(OK).send("Creation success!")
    } catch (err) {
        return res.status(BADREQUEST).send(err)
    }
}

export async function getUserStore(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    try {
      let stores = await getListOfStoresOfCompany(res.locals.jwt.company_name)

      return res.status(OK).json({
          stores: stores
      })
    } catch (err) {
      return res.status(FORBIDDEN).send(err)
    }
}

export async function deleteUserStore(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    let body = JSON.parse(req.body)
    let store_id = body.store_id
    try {
        let store = await selectStoreCompanyRowByCompany(store_id)
        if (store?.company_name != res.locals.jwt.company_name) {
            return res.status(FORBIDDEN).json({
                message: "This is not your store!"
            })
        }
        await deleteStoreRow(store_id)
        return res.status(OK).json({
            message: "Deletion success!"
        })
    } catch (err) {
        return res.status(FORBIDDEN).json({
            error: err
        })
    }
}


export async function updateStore(req: Request, res: Response) {
    let body = JSON.parse(req.body)
    try {
        let store = await selectStoreCompanyRowByCompany(req.body.store_id)
        if (store?.company_name != res.locals.jwt.company_name) {
            return res.status(FORBIDDEN).json({
                message: "This is not your store!"
            })
        }
        const newStore = {
            store_id: body.store_id,
            address: body.address,
            location: body.location,
            opening_hours: body.opening_hours,
            promotionIDs: body.promotionIDs,
            company_name: res.locals.jwt.company_name
        };
        await updateStoreRow(newStore);
        return res.status(OK).json({
          message: "Successfully updated!"
        });
    } catch (err) {
        return res.status(BADREQUEST).send(err)
    }
}

