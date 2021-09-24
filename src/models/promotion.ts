import { insertPromotionRow, selectPromotionRowByCompany } from "../database/promotionsTable";
import { insertPromotionAtStoreRow, selectStoreIdWithPromotion } from "../database/promotionStoreTable";

export interface Promotion {
  promotion_id: number | null;
  promo_name: string;
  end_date: Date;
  details: string;
  storeIDs: Array<number>
  company_name: string
}


export async function getListOfPromotionsOfCompany(companyName: string): Promise<Promotion[]> {
  const data = (await selectPromotionRowByCompany(companyName)).rows
  const promotions = data.map(async (row) => {
    console.log(row)
    let store_ids = (await selectStoreIdWithPromotion(row.promotion_id)).rows
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

export async function saveNewPromotion(newPromotion: Promotion): Promise<number> {
  let newPromoID = (await insertPromotionRow(newPromotion)).rows[0].promotion_id
  await Promise.all(newPromotion.storeIDs.map(async (store_id) => {
    await insertPromotionAtStoreRow(newPromoID, store_id)
  }))
  return newPromoID
}
