import express from 'express';
 
import userCtrlService from '../service/user-biz-service'
import { logger } from '@sunriseupc/nodejs-common';
import utilityObject from './util'
const router = express.Router();


router.get("/all" ,async (req: express.Request, res: express.Response) => {

    logger.info("Inside Get All users")
   
    res.header('Accept', 'application/json');
    res.header('Content-Type', 'application/json');     
    let pageNumber = req.query.pageNumber
    let providerEnv = utilityObject.readEnvironmentParam(req);
    userCtrlService.getAllUsers(pageNumber,providerEnv).then((response:any) => {
        res.status(200).json(response); 
   }).catch((error:any)=> {    
        let errResponse = utilityObject.errorResponse(error)           
        res.status(errResponse["status"]).json(errResponse["data"]); 
       
    })
        
}) 

export default router;