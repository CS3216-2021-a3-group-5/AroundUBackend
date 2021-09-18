import { LatLon, distanceTo } from "geolocation-utils";
import { testpromos, testStores, testUsers } from "../testdata/testdata";
import {Promotion} from "./promotion";

export interface Store {
  storeID: string;
  address: string;
  location: LatLon;
  opening_hours: string;
  promotionIDs: Array<string>
  company_name: string
}

export class NearbyStoreData {
  storeID: string;
  address: string;
  location: LatLon;
  category_name: string | undefined;
  opening_hours: string;
  promotions: Array<Promotion>

  constructor(store: Store) {
    this.storeID = store.storeID
    this.address = store.address
    this.location = store.location
    this.category_name = testUsers.get(store.company_name)?.category
    this.opening_hours = store.opening_hours
    this.promotions = store.promotionIDs.flatMap((id) => testpromos.get(id)).
    filter((item): item is Promotion => !!item)
  }
}

export function getListOfStoresOfUser(userid: string): Store[] {
  return Array.from(testStores.values()).filter((store) => (store.company_name == userid))
}
