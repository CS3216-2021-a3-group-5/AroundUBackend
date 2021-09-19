import {Store} from "../models/store"
import {Promotion} from "../models/promotion"
import { Company } from "../models/company"

export let testUsers = new Map<string, Company>([
  ["user1", {
    name: "user1",
    email: "email",
    password: "$2b$10$EgcNfNc4YJ5lzuAONIaG.uIXywIPq2vDfqFhiwrvlNXjq7qDd8Xwu",
    category: "cat1",
    logo_path: "angry company",
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
    userID: "user1",
    category: "Fashion"
  }],
  ["promo2", {
    promoID: "promo2",
    promoName: "psefr",
    end_date: new Date("2019-01-16"),
    details: "aaa",
    storeIDs: ["1"],
    userID: "user1",
    category: "Fashion"
  }]
])
export let testStores = new Map<string,Store>([
  ["store1", {
    storeID: "store1",
    address: "ewe",
    location: { lat: 1.32, lon: 103.915 },
    opening_hours: "ssss",
   promotionIDs: ["promo1", "promo2"],
   company_name: "user1"
  } ], [
    "store2", {
      storeID: "store2",
      address: "ewe",
      location: { lat: 1.32, lon: 103.915 },
      opening_hours: "ssss",
     promotionIDs: ["promo1", "promo2"],
     company_name: "user1"
    }
  ]
])
