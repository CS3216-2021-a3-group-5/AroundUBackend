import { Response, Request } from "express"
import { getListOfPromotionsOfCompany, saveNewPromotion } from "../models/promotion"
import { BADREQUEST, OK } from "../statuscodes/statusCode"
import {removePromotion, updatePromotion} from "../database/promotionsTable";
import {deletePromotionAtStore} from "../database/promotionStoreTable";

export async function createNewPromotion(req: Request, res: Response) {
    try {
        await saveNewPromotion({
            promotion_id: req.body.promotion_id,
            company_name: res.locals.jwt.company_name,
            promo_name: req.body.promo_name,
            end_date: req.body.end_date,
            details: req.body.details,
            storeIDs: req.body.store_ids
        })
        return res.status(OK).send("Creation success!")
    } catch (err) {
        return res.status(BADREQUEST).send(err)
    }
}


export async function getUserPromotions(req: Request, res: Response) {
    try {
        const promos = await getListOfPromotionsOfCompany(res.locals.jwt.company_name)
        res.status(200).json({
            "promotions": promos
        })
    } catch (err) {
        res.status(BADREQUEST).send(err)
    }
  }

export async function deletePromotion(req: Request, res: Response) {
    try {
        const promo_id: number = req.body.promo_id;
        await removePromotion(promo_id);
        res.status(200).send();
    } catch (err) {
        res.status(BADREQUEST).send(err)
    }
}

export async function removePromoFromStore(req: Request, res: Response) {
    try {
        const promo_id: number = req.body.promo_id;
        const store_id: number = req.body.store_id;
        await deletePromotionAtStore(promo_id, store_id)
        res.status(200).send();
    } catch (err) {
        res.status(BADREQUEST).send(err)
    }
}

export async function updatePromo(req: Request, res: Response) {
    try {
        await updatePromotion({
            promotion_id: req.body.promotion_id,
            company_name: res.locals.jwt.company_name,
            promo_name: req.body.promo_name,
            end_date: req.body.end_date,
            details: req.body.details,
            storeIDs: req.body.store_ids
        })
        return res.status(OK).send();
    } catch (err) {
        return res.status(BADREQUEST).send(err)
    }
}
