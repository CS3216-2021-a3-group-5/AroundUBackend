import {Store} from "../models/store"
import {Promotion} from "../models/promotion"
import { User } from "../models/user"

export let testUsers = new Map<string, User>([
  ["user1", {
    userID: "user1",
    email: "email",
    password: "asdasd",
    category: "cat1",
    company_name: "angry company",
    contact_no: "999"
  }]
])
export let testpromos = new Map<string, Promotion>([
  ["promo1" , {
    promoID: "promo1",
    promoName: "psefr",
    end_date: new Date("2019-01-16"),
    details: "aaa",
    storeIDs: ["1"],
    userID: "user1"
  }],
  ["promo2", {
    promoID: "promo2",
    promoName: "psefr",
    end_date: new Date("2019-01-16"),
    details: "aaa",
    storeIDs: ["1"],
    userID: "user1"
  }]
])
export let testStores = new Map<string,Store>([
  ["store1", {
    storeID: "store1",
    address: "ewe",
    name: "a",
    location: { lat: 1.32, lon: 103.915 },
    opening_hours: "ssss",
   promotionIDs: ["promo1", "promo2"],
   userID: "user1"    
  } ], [
    "store2", {
      storeID: "store2",
      address: "ewe",
      name: "a",
      location: { lat: 1.32, lon: 103.915 },
      opening_hours: "ssss",
     promotionIDs: ["promo1", "promo2"],
     userID: "user1"
    }    
  ]
])
