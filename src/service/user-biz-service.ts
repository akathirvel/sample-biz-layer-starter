
import apiService from '../lib/client/ApiService'
import UserModel from '../models/user-model';
//import { logger } from '@sunriseupc/nodejs-common';


class UserCtrlService {     
     
    constructor() {         
    }

    getAllUsers = async (pageNumber:any,providerEnv:string):Promise<UserModel[]> => {

        let options = apiService.getOption();
        let userArry:UserModel[] = []

        options.params = {"page":pageNumber}

        let baseUrl = apiService.getAPIBaseEndpoint(providerEnv);
        
        let response;
        
        if (providerEnv === 'mock'){             
            response = await  apiService.readMockResponse((baseUrl+ "GET_ALL_USER.json"))
        } else {
            response = await apiService.get((baseUrl+ "users"),options)
        }
        
        if (response.status == 200 && response.data && response.data.data.length > 0) {
           
            await response.data.data.map((o:any) =>{
                let temp:UserModel = {
                    userId: o.id,
                    email:o.email ,
                    first_name: o.first_name ,
                    last_name: o.last_name,
                    avatar: o.avatar
                }; 
                userArry.push(temp)
            })
        }
        
        return userArry 
    } 
}

const userCtrlService = new UserCtrlService();
export default userCtrlService;