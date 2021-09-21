import {Request, Response, NextFunction} from "express"
import { TOKEN_SECRET } from "../config/config";
import * as jwt from "jsonwebtoken"
import { Company, CompanyInfo } from "../models/company";
import { getListOfPromotionsOfCompany } from "../models/promotion";
import { hashPassword } from "../middleware/authethication";
import { createCompany, getCompanyByEmail, getCompanyInfoByName } from "../database/companiesTable";
import { compare } from "bcrypt";
import { getListOfStoresOfCompany } from "../models/store";
import { BADREQUEST, FORBIDDEN, NOTFOUND, OK } from "../statuscodes/statusCode";

export async function userLogin(req: Request, res: Response) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const body = JSON.parse(req.body)
  const email = body.email
  const password = body.password
  try {
    const companyInfo = await getCompanyByEmail(email)
    if (!await compare(password, companyInfo.password)) {
      return res.status(FORBIDDEN).json({
        message: "Wrong password"
      })
    }
    const user = {
      company_name: companyInfo.company_name
    }
    const accessToken = jwt.sign(user, TOKEN_SECRET);
    return res.status(OK).json({
      accessToken: accessToken
    })
  } catch (error) {
    console.log(error)
    return res.status(FORBIDDEN).json({
      message: "Error logging in!"
    })
  }

}

export async function registerUser(req: Request, res: Response) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const body = JSON.parse(req.body)
  try {
    const newUser: Company = {
      password: await hashPassword(body.password),
      email: body.email,
      category: body.category,
      contact_no: body.contact_no,
      company_name: body.company_name,
    }
    await createCompany(newUser)
  } catch (err) {
    console.log(err)
    return res.status(BADREQUEST).json({
      message: "Something bad happen in our server" // Need to handle err
    })
  }
  return res.status(OK).json({
    message: "Success!"
  })

}

export async function handlePreflight(req: Request, res: Response) {
  console.log("handle preflight CORS")

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  return res.status(OK).json({
    message: "Success!"
  })
}

export async function getUserInfo(req: Request, res: Response) {
  try {
    return res.status(OK).json(await getCompanyInfoByName(res.locals.jwt.company_name))
  } catch (err) {
    return res.status(NOTFOUND).json({
      message: "Fail to get user info."
    })
  }
}
