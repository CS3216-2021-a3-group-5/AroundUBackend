import * as express from "express";
import {json, urlencoded} from "body-parser";
import { getNearbyStoreID, getSingleStore, getStoresFromID, nearbyStoreID, nearbyStoresDataGET } from "./routes/nearbyStoresAPI";
import { getUserInfo, handlePreflight, registerUser, userLogin } from "./routes/userAPI";
import { extractJWT } from "./middleware/extractJWT";
import { createNewStore, deleteUserStore, getUserStore, updateStore } from "./routes/manageStoresAPI";
import {
    createNewPromotion,
    deleteUserPromotion,
    getUserPromotions,
    removePromoFromStore,
    updatePromo
} from "./routes/managePromotionsAPI";
import {getLogo,getPromoPics, logoUpload, promoPicUpload, postLogo, postPromoPic} from "./image/imageAccess";
import {deletePromotion} from "./database/promotionsTable";
import { deleteStore } from "./database/storesTable";
const routes = express.Router();

routes.use(json())
routes.use(urlencoded({extended : true}))
routes.use(express.text())


function indexGET(req: express.Request, res: express.Response) {
    res.json({ info: 'Node.js, Express, and Postgres API' })
}

routes.get('/', indexGET);
routes.get('/nearbystores', nearbyStoresDataGET)
routes.options('/nearbystores', handlePreflight);
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
routes.get('/logo', getLogo);
routes.get('/promoPic', getPromoPics);
routes.get('/nearbyStoreId', nearbyStoreID)
routes.options('/nearbyStoreId', handlePreflight);
routes.post('/storesById', getStoresFromID)
routes.options('/storesById', handlePreflight);
routes.get('/stores/:id', getSingleStore)
routes.options('/stores/:id', handlePreflight);
routes.delete('/promotion', deleteUserPromotion)
routes.delete('/store', deleteUserStore)
routes.post('/getStoresById', getStoresFromID)
routes.post('/updatePromotion', extractJWT, updatePromo)
routes.delete('/deletePromotion', extractJWT, deletePromotion)
routes.post('/removePromoFromStore', extractJWT, removePromoFromStore)
routes.post('/updateStore', extractJWT, updateStore)
routes.delete('/deleteStore', extractJWT, deleteStore)

export default routes;
