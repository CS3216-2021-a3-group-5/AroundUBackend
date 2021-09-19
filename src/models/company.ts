import { textChangeRangeIsUnchanged } from "typescript"

export interface Company {
  email: string,
  logo_path: string | null,
  password: string,
  category: string,
  contact_no: number,
  company_name: string,
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

