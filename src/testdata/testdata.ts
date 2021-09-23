import {Store} from "../models/store"
import {Promotion} from "../models/promotion"
import { Company } from "../models/company"

export let testUsers = new Map<string, Company>([
  ["user1", {
    company_name: "user1",
    email: "email",
    password: "$2b$10$EgcNfNc4YJ5lzuAONIaG.uIXywIPq2vDfqFhiwrvlNXjq7qDd8Xwu",
    category: "cat1",
    contact_number: 999
  }]
])
export let testpromos = new Map<number, Promotion>([
  [123123 , {
    promotion_id: 23444,
    promo_name: "psefr",
    end_date: new Date("2019-01-16"),
    details: "aaa",
    storeIDs: [234,2342],
    company_name: "user1"
  }],
  [234, {
    promotion_id: 23422,
    promo_name: "psefr",
    end_date: new Date("2019-01-16"),
    details: "aaa",
    storeIDs: [234,234],
    company_name: "user1"
  }]
])

export let testStores = new Map<number,Store>([
/*  [234, {
    store_id: 234,
    address: "ewe",
    location: { lat: 1.32, lon: 103.915 },
    opening_hours: "ssss",
   promotionIDs: [234, 234],
   company_name: "user1"
  } ], [
    2324, {
      store_id: 234,
      address: "ewe",
      location: { lat: 1.32, lon: 103.915 },
      opening_hours: "ssss",
     promotionIDs: [234, 222],
     company_name: "user1"
    }
  ]*/
])
