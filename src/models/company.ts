import { textChangeRangeIsUnchanged } from "typescript"

export interface Company {
  logo_path: string,
  password: string,
  email: string,
  category: string,
  contact_no: string,
  name: string,
}

export class UserInfo {
  logo_path: string
  email: string
  category: string
  contact_no: string
  company_name: string
  constructor(user: Company) {
    this.logo_path = user.logo_path
    this.email = user.email
    this.category = user.category
    this.contact_no = user.contact_no
    this.company_name = user.name
  }
}
