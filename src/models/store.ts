import { LatLon } from "geolocation-utils";
import { insertPromotionAtStoreRow, selectPromotionIdAtStore } from "../database/promotionStoreTable";
import { insertStoreRow, selectStoreRowByCompany } from "../database/storesTable";
import {Promotion} from "./promotion";

export interface Store {
  store_id: number | null;
  address: string;
  location: LatLon;
  opening_hours: string;
  promotionIDs: number[]
  company_name: string
}

export interface NearbyStoreData {
  store_id: number | null;
  address: string;
  location: LatLon;
  category_name: string | undefined;
  opening_hours: string;
  distanceFrom: number;
  company_name: string | undefined;
  promotions: Promotion[]
}

export async function fillUpPromotionID(store: Store) {
  store.promotionIDs = (await selectPromotionIdAtStore(store.store_id as number)).rows.map(row => row.promotion_id)
}

export async function getListOfStoresOfCompany(companyName: string): Promise<Store[]> {
  const stores = await selectStoreRowByCompany(companyName)

  await Promise.all(stores.map(async store => {
    await fillUpPromotionID(store)
  }))
  return stores
}

export async function saveNewStore(newStore: Store) {
  if (newStore.promotionIDs == null) {
    insertStoreRow(newStore)
  } else {
    let newStoreID = (await insertStoreRow(newStore)).rows[0].store_id
    await Promise.all(newStore.promotionIDs.map(async (id) => {
      await insertPromotionAtStoreRow(id, newStoreID)
    })) 
  }
}
