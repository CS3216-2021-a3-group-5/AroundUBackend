import { LatLon } from "geolocation-utils";
import { createPromotionAtStore, getPromotionIdByStoreID } from "../database/promotionStoreTable";
import { createStore, getStoreByCompany } from "../database/storesTable";
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
  store.promotionIDs = (await getPromotionIdByStoreID(store.store_id as number)).rows.map(row => row.promotion_id)
}

export async function getListOfStoresOfCompany(companyName: string): Promise<Store[]> {
  const stores = await getStoreByCompany(companyName)

  await Promise.all(stores.map(async store => {
    await fillUpPromotionID(store)
  }))
  return stores
}

export async function saveNewStore(newStore: Store) {
  let newStoreID = (await createStore(newStore)).rows[0].store_id
  await Promise.all(newStore.promotionIDs.map(async (id) => {
    await createPromotionAtStore(id, newStoreID)
  }))
}
