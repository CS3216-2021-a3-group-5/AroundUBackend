export interface Company {
  email: string
  password: string
  category: string
  contact_number: number
  company_name: string
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

