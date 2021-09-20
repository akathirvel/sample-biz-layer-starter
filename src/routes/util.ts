

import express from 'express';

class Utility  {

    
    private useTargetParam:boolean = false
    
    constructor() {
        if (process.env.USE_TARGET_PARAM) {
            this.useTargetParam = process.env.USE_TARGET_PARAM.toUpperCase() === "TRUE" ? true:false
        }       
    }

    readEnvironmentParam = (req: express.Request):string => {
        let target = 'default'
        if (this.useTargetParam) {
            target = (req.query.target && typeof req.query.target === 'string') ? req.query.target.toString() : target;
        }
        return target
    }

    errorResponse = (error: any):any => {

        let errResponse:any = {}
        
        if (error.response) {
            errResponse.status = error.response.status
            errResponse.data = error.response.data
        } else if (error.data){
            errResponse.status = error.status
            errResponse.data = error.data
        } else {
            errResponse.status = 500           
            errResponse.data = {'message':error.message}
        }         
        return errResponse;

    }
}

 
const utility = new Utility();
export default utility;
