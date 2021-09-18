import {compare, genSalt, hash} from 'bcrypt'
import { testUsers } from '../testdata/testdata'

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt()
  return await hash(password, salt)
}

export async function isCorrectPassword(userID: string, password: string): Promise<boolean> {
  const user = testUsers.get(userID)
  if (user == undefined) {
    return false
  }
  return await compare(password, user.password)
}