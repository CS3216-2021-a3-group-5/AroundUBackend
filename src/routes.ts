import * as express from "express";
import {json, urlencoded} from "body-parser";
import { getNearbyStoreID, getStoresFromID, nearbyStoresDataGET } from "./routes/nearbyStoresAPI";
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
routes.options('/userInfo', handlePreflight);
routes.get('/userStoreInfo', extractJWT, getUserStore)
routes.options('/userStoreInfo', handlePreflight);
routes.post('/newStore', extractJWT, createNewStore)
routes.options('/newStore', handlePreflight);
routes.post('/newPromotion', extractJWT, createNewPromotion)
routes.options('/newPromotion', handlePreflight);
routes.get('/userPromotionInfo', extractJWT, getUserPromotions)
routes.options('/userPromotionInfo', handlePreflight);
routes.post('/registerUser', registerUser)
routes.options('/registerUser', handlePreflight);
routes.post('/uploadLogo/:company', logoUpload.single('image'), postLogo);
routes.options('/uploadLogo/:company', handlePreflight);
routes.post('/uploadPromoPic/:promo_id', promoPicUpload.single('image'), postPromoPic);
routes.options('/uploadPromoPic/:promo_id', handlePreflight);
routes.get('/getLogo', getLogo);
routes.get('/getPromoPic', getPromoPics);
routes.post('/getnearbyStoreId', getNearbyStoreID)
routes.post('getStoresById', getStoresFromID)

export default routes;
