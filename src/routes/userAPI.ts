import {Request, Response, NextFunction} from "express"
import { TOKEN_SECRET } from "../config/config";
import * as jwt from "jsonwebtoken"
import { testUsers } from "../testdata/testdata";
import { Company, UserInfo } from "../models/company";
import { getListOfPromotionsOfUser } from "../models/promotion";
import { getListOfStoresOfUser } from "../models/store";
import { hashPassword, isCorrectPassword } from "../middleware/authethication";

export async function userLogin(req: Request, res: Response) {
  const userID = req.body.userID
  const password = req.body.password
  if (!await isCorrectPassword(userID, password)) {
    return res.status(400).send('wrong password or user does not exist')
  }
  const user = {
    userID: userID
  }
  const accessToken = jwt.sign(user, TOKEN_SECRET);
  res.json({
    accessToken: accessToken
  })
}

export async function registerUser(req: Request, res: Response) {
  const userID = req.body.userID
  if (testUsers.has(userID)) {
    return res.send("User already exists")
  }
  const newUser: Company = {
    logo_path: userID,
    password: await hashPassword(req.body.password),
    email: req.body.email,
    category: req.body.category,
    contact_no: req.body.contact_no,
    name: req.body.company_name,
  }
  testUsers.set(userID, newUser)
  res.status(400).send("registration successful")

}

export function getUserInfo(req: Request, res: Response) {
  const userID = res.locals.jwt.userID
  const user = testUsers.get(userID)
  if (user == undefined) {
    return res.json(404)
  }
  res.send(new UserInfo(user))
}

export function getUserPromotions(req: Request, res: Response) {
  const userID = res.locals.jwt.userID
  res.send(getListOfPromotionsOfUser(userID))
}

export function getUserStore(req: Request, res: Response) {
  const userID = res.locals.jwt.userID
  res.send(getListOfStoresOfUser(userID))
}


