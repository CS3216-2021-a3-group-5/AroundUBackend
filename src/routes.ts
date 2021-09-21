import * as express from "express";
import {json, urlencoded} from "body-parser";
import { getNearbyStoreID, getStoresFromID, nearbyStoresDataGET } from "./routes/nearbyStoresAPI";
import { getUserInfo, registerUser, userLogin } from "./routes/userAPI";
import { extractJWT } from "./middleware/extractJWT";
import {createNewStore, deleteStore, getUserStore, updateStore} from "./routes/manageStoresAPI";
import { createNewPromotion, getUserPromotions, deletePromotion, removePromoFromStore, updatePromo } from "./routes/managePromotionsAPI";
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
routes.get('/userInfo', extractJWT, getUserInfo)
routes.get('/userStoreInfo', extractJWT, getUserStore)
routes.post('/newStore', extractJWT, createNewStore)
routes.post('/newPromotion', extractJWT, createNewPromotion)
routes.get('/userPromotionInfo', extractJWT, getUserPromotions)
routes.post('/registerUser', registerUser)
routes.post('/uploadLogo/:company', logoUpload.single('image'), postLogo);
routes.post('/uploadPromoPic/:promo_id', promoPicUpload.single('image'), postPromoPic);
routes.get('/getLogo', getLogo);
routes.get('/getPromoPic', getPromoPics);
routes.post('/getnearbyStoreId', getNearbyStoreID)
routes.post('/getStoresById', getStoresFromID)

routes.post('/updatePromotion', extractJWT, updatePromo)
routes.delete('/deletePromotion', extractJWT, deletePromotion)
routes.post('/removePromoFromStore', extractJWT, removePromoFromStore)

routes.post('/updateStore', extractJWT, updateStore)
routes.delete('/deleteStore', extractJWT, deleteStore)

export default routes;
