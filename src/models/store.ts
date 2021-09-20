import { LatLon, distanceTo, toLatLon } from "geolocation-utils";
import { createPromotionAtStore, getPromotionIdByStoreID } from "../database/promotionStoreTable";
import { createStore, getStoreByCompany } from "../database/storesTable";
import { testpromos, testStores, testUsers } from "../testdata/testdata";
import {Promotion} from "./promotion";
import {Company} from "./company";

export class Store {
  store_id: number | null;
  address: string;
  location: LatLon;
  opening_hours: string;
  promotionIDs: Array<number>
  company_name: string

  static randomCount: number = 0;
  constructor(location: LatLon, co: Company) {
    Store.randomCount += 1;
    this.store_id = null
    this.address = 'Something Road, Something Mall, Singapore',
    this.location = location
    this.opening_hours = '8 am to 8 pm daily'
    this.promotionIDs = []
    this.company_name = co.company_name
  }
}

export class NearbyStoreData {
  store_id: number | null;
  address: string;
  location: LatLon;
  category_name: string | undefined;
  opening_hours: string;
  promotions: Array<Promotion>

  constructor(store: Store) {
    this.store_id = store.store_id
    this.address = store.address
    this.location = store.location
    this.category_name = testUsers.get(store.company_name)?.category
    this.opening_hours = store.opening_hours
    this.promotions = store.promotionIDs.flatMap((id) => testpromos.get(id)).
    filter((item): item is Promotion => !!item)
  }
}

export async function getListOfStoresOfCompany(companyName: string): Promise<Store[]> {
  const data = (await getStoreByCompany(companyName)).rows
  const stores = data.map(async (row) => {
    console.log(row)
    let promoIDS = (await getPromotionIdByStoreID(row.store_id)).rows
    console.log(promoIDS)
    return {
      store_id: row.store_id,
      address: row.address,
      location: {
        lat: row.latitude,
        lon: row.longitude
      },
      opening_hours: row.opening_hours,
      promotionIDs: promoIDS.map(row => row.promotion_id),
      company_name: row.company_name
    }
  })
  return Promise.all(stores)
}

export async function saveNewStore(newStore: Store) {
  let newStoreID = (await createStore(newStore)).rows[0].store_id
  await Promise.all(newStore.promotionIDs.map(async (id) => {
    await createPromotionAtStore(id, newStoreID)
  }))
}
