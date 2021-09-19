import { Response, Request } from "express"
import { saveNewStore } from "../models/store"
import { getListOfPromotionsOfCompany, saveNewPromotion } from "../models/promotion"
import { BADREQUEST, OK } from "../statuscodes/statusCode"

export async function createNewPromotion(req: Request, res: Response) {
    try {
        await saveNewPromotion({
            promotion_id: req.body.promotion_id,
            company_name: res.locals.jwt.company_name,
            promo_name: req.body.promo_name,
            end_date: req.body.end_date,
            details: req.body.details,
            category: req.body.category,
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