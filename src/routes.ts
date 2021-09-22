import * as express from "express";
import { json, urlencoded } from "body-parser";
import { extractJWT } from "./middleware/extractJWT";
import {
    getCompanyInfo,
    handlePreflight,
    registerCompany,
    updateCompanyDetails,
    companyLogin
} from "./routes/companyAPI";
import {
    getSingleStore,
    getStoresFromID,
    nearbyStoreID,
    nearbyStoresDataGET
} from "./routes/nearbyStoresAPI";
import {
    createNewStore,
    deleteUserStore,
    getUserStore,
    updateStore
} from "./routes/storesAPI";
import {
    createNewPromotion,
    deleteUserPromotion,
    getUserPromotions,
    removePromoFromStore,
    updatePromo
} from "./routes/promotionsAPI";
import {
    getLogo,
    getPromoPics,
    logoUpload,
    promoPicUpload,
    postLogo,
    postPromoPic
} from "./image/imageAccess";

const routes = express.Router();
routes.use(json())
routes.use(urlencoded({extended : true}))
routes.use(express.text())

function index(req: express.Request, res: express.Response) {
    res.json({ info: 'AroundU Server is running.' })
}

routes.get('/', index);

// Company APIs
routes.get('/company/info', extractJWT, getCompanyInfo);
routes.post('/company/login', companyLogin);
routes.options('/company/login', handlePreflight);
routes.post('/company/registration', registerCompany);
routes.options('/company/registration', handlePreflight);
routes.put('/company/update', extractJWT, updateCompanyDetails);

// Store APIs
routes.get('/store/nearby', nearbyStoresDataGET);
routes.options('/store/nearby', handlePreflight);
routes.get('/store/nearbyId', nearbyStoreID);
routes.options('/store/nearbyId', handlePreflight);
routes.get('/store/companyStoreInfo', extractJWT, getUserStore);
routes.options('/store/companyStoreInfo', handlePreflight);
routes.get('/store/:id', getSingleStore);
routes.options('/store/:id', handlePreflight);
routes.post('/store/id', getStoresFromID);
routes.post('/store/new', extractJWT, createNewStore);
routes.options('/store/id', handlePreflight);
routes.put('/store', extractJWT, updateStore);
routes.delete('/store', deleteUserStore);

// Promotion APIs
routes.get('/promotion/company', extractJWT, getUserPromotions);
routes.post('/promotion', extractJWT, createNewPromotion);
routes.put('/promotion', extractJWT, updatePromo);
routes.delete('/promotion', deleteUserPromotion);
routes.delete('/promotion/fromStore', extractJWT, removePromoFromStore);

// Image APIs
routes.get('/image/logo/:company', extractJWT, getLogo);
routes.post('/image/logo/:company', extractJWT, logoUpload.single('image'), postLogo);
routes.get('/image/promotionPicture/:promo_id', extractJWT, getPromoPics);
routes.post('/image/promotionPicture/:promo_id', extractJWT, promoPicUpload.single('image'), postPromoPic);

export default routes;
