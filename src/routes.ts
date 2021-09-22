import * as express from "express";
import {json, urlencoded} from "body-parser";
import { getNearbyStoreID, getStoresFromID, nearbyStoreID, nearbyStoresDataGET } from "./routes/nearbyStoresAPI";
import { getUserInfo, handlePreflight, registerUser, userLogin } from "./routes/userAPI";
import { extractJWT } from "./middleware/extractJWT";
import { createNewStore, getUserStore } from "./routes/manageStoresAPI";
import { createNewPromotion, getUserPromotions } from "./routes/managePromotionsAPI";
import {getLogo,getPromoPics, logoUpload, promoPicUpload, postLogo, postPromoPic} from "./image/imageAccess";
const routes = express.Router();

routes.use(json())
routes.use(urlencoded({extended : true}))
routes.use(express.text())


function indexGET(req: express.Request, res: express.Response) {
    res.json({ info: 'Node.js, Express, and Postgres API' })
}

routes.get('/', indexGET);
routes.post('/nearbystores', nearbyStoresDataGET)
routes.post('/login', userLogin)
routes.options('/login', handlePreflight);
routes.get('/userInfo', extractJWT, getUserInfo)
routes.get('/userStoreInfo', extractJWT, getUserStore)
routes.options('/userStoreInfo', handlePreflight);
routes.post('/newStore', extractJWT, createNewStore)
routes.post('/newPromotion', extractJWT, createNewPromotion)
routes.get('/userPromotionInfo', extractJWT, getUserPromotions)
routes.post('/registerUser', registerUser)
routes.options('/registerUser', handlePreflight);
routes.post('/uploadLogo/:company', logoUpload.single('image'), postLogo);
routes.post('/uploadPromoPic/:promo_id', promoPicUpload.single('image'), postPromoPic);
routes.get('/getLogo', getLogo);
routes.get('/getPromoPic', getPromoPics);
routes.post('/getnearbyStoreId', nearbyStoreID)
routes.post('getStoresById', getStoresFromID)

export default routes;
