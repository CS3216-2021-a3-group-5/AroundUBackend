import { Response, Request } from "express"
import { saveNewStore } from "../models/store"
import { getListOfPromotionsOfCompany, saveNewPromotion } from "../models/promotion"
import { BADREQUEST, FORBIDDEN, OK } from "../statuscodes/statusCode"
import { deletePromotion, getPrmotionByID } from "../database/promotionsTable"
import { JsonWebTokenError } from "jsonwebtoken"

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
        let promo = await getPrmotionByID(promo_id)
        if (promo?.company_name != res.locals.jwt.company_name) {
            return res.status(FORBIDDEN).json({
                error: "This promotion does not belong to you!"
            })
        }
        await deletePromotion(promo_id)
        return res.status(OK).json({
            message: "deletion success!"
        })
    } catch (err) {
        return res.status(FORBIDDEN).json({
            error: err
        })
    }
}