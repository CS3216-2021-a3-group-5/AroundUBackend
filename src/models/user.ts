import { textChangeRangeIsUnchanged } from "typescript"

export interface User {
  userID: string,
  password: string,
  email: string,
  category: string,
  contact_no: string,
  company_name: string,
}

export class UserInfo {
  userID: string
  email: string
  category: string
  contact_no: string
  company_name: string
  constructor(user: User) {
    this.userID = user.userID
    this.email = user.email
    this.category = user.category
    this.contact_no = user.contact_no
    this.company_name = user.company_name
  }
}