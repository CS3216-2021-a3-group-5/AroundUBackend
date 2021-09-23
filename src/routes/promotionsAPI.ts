import { Response, Request } from "express"
import { getListOfPromotionsOfCompany, saveNewPromotion } from "../models/promotion"
import { BADREQUEST, FORBIDDEN, OK } from "../statuscodes/statusCode"
import {deletePromotionRow, selectPromotionRowById, updatePromotionRow} from "../database/promotionsTable"
import {
    deletePromotionAtStoreRow,
    deleteRowByPromotion,
    insertPromotionAtStoreRow
} from "../database/promotionStoreTable";

export async function createNewPromotion(req: Request, res: Response) {
    try {
        const body = JSON.parse(req.body)
        await saveNewPromotion({
            promotion_id: body.promotion_id,
            company_name: res.locals.jwt.company_name,
            promo_name: body.promo_name,
            end_date: body.end_date,
            details: body.details,
            storeIDs: body.store_ids
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
            promotions: promos
        })
    } catch (err) {
        res.status(BADREQUEST).send(err)
    }
  }

export async function deleteUserPromotion(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    let body = JSON.parse(req.body)
    let promo_id = body.promotion_id
    try {
        let promo = await selectPromotionRowById(promo_id)
        if (promo?.company_name != res.locals.jwt.company_name) {
            return res.status(FORBIDDEN).json({
                error: "This promotion does not belong to you!"
            })
        }
        await deletePromotionRow(promo_id)
        return res.status(OK).json({
            message: "deletion success!"
        })
    } catch (err) {
        return res.status(FORBIDDEN).json({
            error: err
        })
    }
}

export async function removePromoFromStore(req: Request, res: Response) {
    try {
        const promo_id: number = req.body.promo_id;
        const store_id: number = req.body.store_id;
        await deletePromotionAtStoreRow(promo_id, store_id)
        res.status(200).send();
    } catch (err) {
        res.status(BADREQUEST).send(err)
    }
}

export async function updatePromo(req: Request, res: Response) {
    try {
        let promo = await selectPromotionRowById(req.body.promotion_id)
        if (promo?.company_name != res.locals.jwt.company_name) {
            return res.status(FORBIDDEN).json({
                error: "This promotion does not belong to you!"
            })
        }
        const promotion = {
            promotion_id: req.body.promotion_id,
            company_name: res.locals.jwt.company_name,
            promo_name: req.body.promo_name,
            end_date: req.body.end_date,
            details: req.body.details,
            storeIDs: req.body.store_ids
        };
        await updatePromotionRow(promotion);
        await deleteRowByPromotion(promotion.promotion_id);
        await Promise.all(promotion.storeIDs.map(async (id: number) => {
            await insertPromotionAtStoreRow(promotion.promotion_id, id)
        }))
        return res.status(OK).send();
    } catch (err) {
        return res.status(BADREQUEST).send(err)
    }
}
