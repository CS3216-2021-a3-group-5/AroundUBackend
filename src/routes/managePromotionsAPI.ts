import { Response, Request } from "express"
import { saveNewStore } from "../models/store"
import { getListOfPromotionsOfCompany, saveNewPromotion } from "../models/promotion"
import { BADREQUEST, OK } from "../statuscodes/statusCode"

export async function createNewPromotion(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
    try {
        const body = JSON.parse(req.body)
        const newId = await saveNewPromotion({
            promotion_id: null,
            company_name: res.locals.jwt.company_name,
            promo_name: body.promo_name,
            end_date: body.end_date,
            details: body.details,
            storeIDs: body.store_ids
        })
        return res.status(OK).json({
            newid: newId
        })
    } catch (err) {
        return res.status(BADREQUEST).send(err)
    }
}


export async function getUserPromotions(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      
    try {
        const promos = await getListOfPromotionsOfCompany(res.locals.jwt.company_name)
        res.status(200).json({
            promotions: promos
        })
    } catch (err) {
        res.status(BADREQUEST).send(err)
    }
  }
