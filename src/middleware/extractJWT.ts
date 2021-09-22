import {NextFunction, Request, Response} from "express"
import { verify } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";
export function extractJWT(req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
  console.log("extracting token");
  let token = req.headers.authorization?.split(' ')[0]
  if (token) {
    verify(token, TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error
        })
      } 
      else 
      {
        res.locals.jwt = decoded;
        console.log("decoded:")
        console.log(decoded)
        next()
      }
    })
  }
  else {
    return res.status(401).json({
      message: "Error accessing"
    });
  }

}
