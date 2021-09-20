import { textChangeRangeIsUnchanged } from "typescript"
import {getRandomInt} from "./locationGenerator";

export class Company {
  email: string
  logo_path: string | null
  password: string
  category: string
  contact_no: number
  company_name: string

  static randomCount: number = 100;
  constructor() {
    Company.randomCount += 1;
    this.email = 'randomCompany' + Company.randomCount + '@email.com'
    this.logo_path = 'sample.jpg'
    this.category = 'Fashion'
    this.contact_no = 123456
    this.password = 'password'
    this.company_name = 'random company ' + Company.randomCount
  }
}

export class CompanyInfo {
  email: string
  logo_path: string | null
  category: string
  contact_no: number
  company_name: string
  constructor(user: Company) {
    this.logo_path = user.logo_path
    this.email = user.email
    this.category = user.category
    this.contact_no = user.contact_no
    this.company_name = user.company_name
  }
}

