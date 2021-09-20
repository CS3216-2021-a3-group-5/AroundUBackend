import * as express from "express";
import {json, urlencoded} from "body-parser";
import { nearbyStoresDataGET } from "./routes/nearbyStoresAPI";
import { getUserInfo, registerUser, userLogin } from "./routes/userAPI";
import { extractJWT } from "./middleware/extractJWT";
import { createNewStore, getUserStore } from "./routes/manageStoresAPI";
import { createNewPromotion, getUserPromotions } from "./routes/managePromotionsAPI";
const routes = express.Router();

routes.use(json())
routes.use(urlencoded({extended : true}))
routes.use(express.text())


function indexGET(req: express.Request, res: express.Response) {
    res.json({ info: 'Node.js, Express, and Postgres API' })
}

routes.get('/', indexGET);
routes.get('/nearbystores', nearbyStoresDataGET)
routes.post('/login', userLogin)
routes.get('/userInfo', extractJWT, getUserInfo)
routes.get('/userStoreInfo', extractJWT, getUserStore)
routes.post('/newStore', extractJWT, createNewStore)
routes.post('/newPromotion', extractJWT, createNewPromotion)
routes.get('/userPromotionInfo', extractJWT, getUserPromotions)
routes.post('/registerUser', registerUser)

export default routes;
