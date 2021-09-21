import {Request, Response} from "express"
import { TOKEN_SECRET } from "../config/config";
import * as jwt from "jsonwebtoken"
import { Company } from "../models/company";
import { hashPassword } from "../middleware/authethication";
import { createCompany, getCompanyByEmail, getCompanyInfoByName } from "../database/companiesTable";
import { compare } from "bcrypt";
import { BADREQUEST, FORBIDDEN, NOTFOUND, OK } from "../statuscodes/statusCode";

export async function userLogin(req: Request, res: Response) {
  const email = req.body.email
  const password = req.body.password
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
  try {
    const newUser: Company = {
      password: await hashPassword(req.body.password),
      email: req.body.email,
      category: req.body.category,
      contact_no: req.body.contact_no,
      company_name: req.body.company_name,
    }
    await createCompany(newUser)
  } catch (err) {
    return res.status(BADREQUEST).json({
      message: "Something bad happen in our server" // Need to handle err
    })
  }
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



