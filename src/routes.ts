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
routes.options('/company/info', handlePreflight);
routes.post('/company/login', companyLogin);
routes.options('/company/login', handlePreflight);
routes.post('/company/registration', registerCompany);
routes.options('/company/registration', handlePreflight);
routes.put('/company/update', extractJWT, updateCompanyDetails);
routes.options('/company/update', handlePreflight);

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
routes.options('/store/id', handlePreflight);
routes.post('/store/new', extractJWT, createNewStore);
routes.options('/store/new', handlePreflight);
routes.put('/store', extractJWT, updateStore);
routes.delete('/store', extractJWT, deleteUserStore);
routes.options('/store', handlePreflight);

// Promotion APIs
routes.get('/promotion/company', extractJWT, getUserPromotions);
routes.options('/promotion/company', handlePreflight);
routes.post('/promotion', extractJWT, createNewPromotion);
routes.put('/promotion', extractJWT, updatePromo);
routes.delete('/promotion', extractJWT, deleteUserPromotion);
routes.options('/promotion', handlePreflight);
routes.delete('/promotion/fromStore', extractJWT, removePromoFromStore);
routes.options('/promotion/fromStore', handlePreflight);

// Image APIs
routes.get('/image/logo/:company', getLogo);
routes.options('/image/logo/:company', handlePreflight);
routes.post('/image/logo/:company', extractJWT, logoUpload.single('image'), postLogo);
routes.get('/image/promotionPicture/:promo_id', getPromoPics);
routes.options('/image/promotionPicture/:promo_id', handlePreflight);
routes.post('/image/promotionPicture/:promo_id', extractJWT, promoPicUpload.single('image'), postPromoPic);


export default routes;
