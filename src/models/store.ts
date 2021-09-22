import { LatLon, distanceTo, toLatLon } from "geolocation-utils";
import { createPromotionAtStore, getPromotionIdByStoreID } from "../database/promotionStoreTable";
import { createStore, getStoreByCompany } from "../database/storesTable";
import { testpromos, testStores, testUsers } from "../testdata/testdata";
import {Promotion} from "./promotion";
import {Company} from "./company";
import {getRandomInt} from "./locationGenerator";
import { getPromotionByCompany } from "../database/promotionsTable";

export interface Store {
  store_id: number | null;
  address: string;
  location: LatLon;
  opening_hours: string;
  promotionIDs: number[]
  company_name: string

  //static randomCount: number = 100;
  /*constructor(location: LatLon, co: Company) {
    Store.randomCount = getRandomInt();
    this.store_id = null
    this.address = 'Something Road, Something Mall, Singapore',
    this.location = location
    this.opening_hours = '8 am to 8 pm daily'
    this.promotionIDs = []
    this.company_name = co.company_name
  }*/
}

export interface NearbyStoreData {
  store_id: number | null;
  address: string;
  location: LatLon;
  category_name: string | undefined;
  opening_hours: string;
  distanceFrom: number;
  promotions: Promotion[]

  /*constructor(store: Store) {
    this.store_id = store.store_id
    this.address = store.address
    this.location = store.location
    this.category_name = testUsers.get(store.company_name)?.category
    this.opening_hours = store.opening_hours
    this.promotions = store.promotionIDs.flatMap((id) => testpromos.get(id)).
    filter((item): item is Promotion => !!item)
  }*/
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
  if (newStore.promotionIDs == null) {
    createStore(newStore)
  } else {
    let newStoreID = (await createStore(newStore)).rows[0].store_id
    await Promise.all(newStore.promotionIDs.map(async (id) => {
      await createPromotionAtStore(id, newStoreID)
    })) 
  }
  
}
