import { testpromos } from "../testdata/testdata";

export interface Promotion {
  promoID: string;
  promoName: string;
  end_date: Date;
  details: string;
  storeIDs: Array<string>
  userID: string
}

export function getListOfPromotionsOfUser(userid: string): Promotion[] {
  return Array.from(testpromos.values()).filter((promo) => (promo.userID == userid))
}