import axios, { AxiosInstance, AxiosRequestConfig,AxiosResponse } from 'axios';
import {ResponseOptions} from '../../models/api-reponse-model'
import { logger } from '@sunriseupc/nodejs-common';
import fs from 'fs'

class ApiService {

  //private static apiService :ApiService;

  client: AxiosInstance;
  options: any | undefined;
  apiConfigData: any = {}

  constructor() {

    this.options = {
      //timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar', Origin: 'http://localhost:4000' },
    };

    this.client = axios.create({
      ...this.options,
      validateStatus: (status) => status >= 200 && status < 400,
    });

    // Request Intereptior
    this.client.interceptors.request.use( (config: AxiosRequestConfig) => {
      //Add some common logic here
      logger.info("Inside Request interceptor")
      return config;
    }, (error: any)=>{ 
       return Promise.reject(error);
    })
    // Response Intereptior
    this.client.interceptors.response.use((res: AxiosResponse<any>)=>{
      logger.info("Inside response interceptor")
      return res
    },(error: any)=> {
      return Promise.reject(error);
    })
  } 
  
  get(pURL: string,httpOption?: any):Promise<ResponseOptions> {
    
    if (!httpOption) {
      httpOption = this.options
    }
    return this.client.get(pURL,httpOption);
  }

  post(pURL: string , data?:any,httpOption?: any):Promise<ResponseOptions> {
    if (!httpOption) {
      httpOption = this.options
    }
    return this.client.post(pURL,data,httpOption)    
  }  
  
  getOption():any {
    return this.options;
  }
  setAPIConfig(apiConfig:any) : void {
    this.apiConfigData = apiConfig;
  }
  
  getAPIBaseEndpoint(environment:string): string  {
    if (!this.apiConfigData.hasOwnProperty(environment)) {
      environment = "default"
    }
    return this.apiConfigData[environment] 
  }

  fileExists (path:string):boolean  {
    try {
      if (fs.existsSync(path)) {
        return true
      }
    } catch(err) {
      console.log(`error from fs: ${err}`)
      
    }
    return false
  }

  readMockResponse (filePath:string):Promise<ResponseOptions>  {

    if (!this.fileExists(filePath)) {
        //res.status(400).send(err);
        let errResponse :ResponseOptions = {
          status:404,
          data:{"message":"Mock Response not found"}
        }        
        return Promise.reject(errResponse);
    }
    
    let response :ResponseOptions = {
        status:200,
        data:require(filePath)
    }
    return Promise.resolve(response);
  }
  
}
const apiService = new ApiService();
export default apiService;
