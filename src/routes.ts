import * as express from "express";
import {json, urlencoded} from "body-parser";
import { nearbyStoresDataGET } from "./routes/nearbyStoresAPI";
import { getUserInfo, getUserPromotions, getUserStore, registerUser, userLogin } from "./routes/userAPI";
import { extractJWT } from "./middleware/extractJWT";
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
routes.get('/userPromotionInfo', extractJWT, getUserPromotions)
routes.post('/registerUser', registerUser)
/*
routes.get('/promotions', require("./promotion").promotionsGET);
routes.get('/promotion/:id', require("./promotion").promotionByIdGET);
*/
/*
routes.get('/users', db.getUsers)
routes.get('/users/:id', db.getUserById)
routes.post('/users', db.createUser)
routes.put('/users/:id', db.updateUser)
routes.delete('/users/:id', db.deleteUser)

*/
export default routes;
