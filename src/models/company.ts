export interface Company {
  email: string
  password: string
  category: string
  contact_no: number
  company_name: string
}

export class CompanyInfo {
  email: string
  category: string
  contact_no: number
  company_name: string
  constructor(user: Company) {
    this.email = user.email
    this.category = user.category
    this.contact_no = user.contact_no
    this.company_name = user.company_name
  }
}

