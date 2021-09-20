import { createPromotion, getPromotionByCompany } from "../database/promotionsTable";
import { createPromotionAtStore, getStoreIdByPromotionID } from "../database/promotionStoreTable";
import {Company} from "./company";
import {getRandomInt} from "./locationGenerator";
export class Promotion {
  promotion_id: number | null;
  promo_name: string;
  end_date: Date;
  details: string;
  storeIDs: Array<number>
  company_name: string

  static randomCount: number = 120;
  constructor(co: Company) {
    Promotion.randomCount = getRandomInt();
    this.promotion_id = null
    this.promo_name = 'promo ' + Promotion.randomCount
    this.end_date = new Date('2021-12-12')
    this.details = 'promo details of promo ' + Promotion.randomCount
    this.storeIDs = []
    this.company_name = co.company_name
  }
}


export async function getListOfPromotionsOfCompany(companyName: string): Promise<Promotion[]> {
  const data = (await getPromotionByCompany(companyName)).rows
  const promotions = data.map(async (row) => {
    console.log(row)
    let store_ids = (await getStoreIdByPromotionID(row.promotion_id)).rows
    console.log(store_ids)
    return {
      promotion_id: row.promotion_id,
      promo_name: row.promo_name,
      end_date: row.end_date,
      details: row.details,
      storeIDs: store_ids.map(row => row.store_id),
      company_name: row.company_name,
      category: row.category
    }
  })
  return Promise.all(promotions)
}

export async function saveNewPromotion(newPromotion: Promotion) {
  let newPromoID = (await createPromotion(newPromotion)).rows[0].promotion_id
  await Promise.all(newPromotion.storeIDs.map(async (store_id) => {
    await createPromotionAtStore(newPromoID, store_id)
  }))
}
