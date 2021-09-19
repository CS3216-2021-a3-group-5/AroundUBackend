import {compare, genSalt, hash} from 'bcrypt'
import { getCompanyByEmail } from '../database/companiesTable'
import { Company } from '../models/company'
import { testUsers } from '../testdata/testdata'

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt()
  return await hash(password, salt)
}

