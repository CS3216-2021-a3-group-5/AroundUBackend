import { textChangeRangeIsUnchanged } from "typescript"
import {getRandomInt} from "./locationGenerator";

export class Company {
  email: string
  password: string
  category: string
  contact_number: number
  company_name: string

  static randomCount: number = 100;
  constructor() {
    Company.randomCount += 1;
    this.email = 'randomCompany' + Company.randomCount + '@email.com'
    this.category = 'Fashion'
    this.contact_number = 123456
    this.password = 'password'
    this.company_name = 'random company ' + Company.randomCount
  }
}

export class CompanyInfo {
  email: string
  category: string
  contact_number: number
  company_name: string
  constructor(user: Company) {
    this.email = user.email
    this.category = user.category
    this.contact_number = user.contact_number
    this.company_name = user.company_name
  }
}

