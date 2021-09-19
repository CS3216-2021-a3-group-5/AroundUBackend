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
  const email = req.body.email
  const password = req.body.password
  try {
    const companyInfo = await getCompanyByEmail(email)
    if (!await compare(password, companyInfo.password)) {
      return res.status(FORBIDDEN).send("Wrong password")
    }
    const user = {
      company_name: companyInfo.company_name
    }
    const accessToken = jwt.sign(user, TOKEN_SECRET);
    return res.status(OK).json({
      accessToken: accessToken
    })
  } catch (error) {
    return res.status(FORBIDDEN).send("Error logging in!")
  }

}

export async function registerUser(req: Request, res: Response) {
  try {
    const newUser: Company = {
      logo_path: req.body.logo_path,
      password: await hashPassword(req.body.password),
      email: req.body.email,
      category: req.body.category,
      contact_no: req.body.contact_no,
      company_name: req.body.company_name,
    }
    await createCompany(newUser)
  } catch (err) {
    return res.status(BADREQUEST).send(err)
  }
  return res.status(OK).send("Success!")

}

export async function getUserInfo(req: Request, res: Response) {
  try {

    return res.status(OK).json(await getCompanyInfoByName(res.locals.jwt.company_name))
  } catch (err) {
    return res.status(NOTFOUND).send(err)
  }
}



