import express, { Application } from 'express';
import { requestLogger,profileUtils } from '@sunriseupc/nodejs-common';
import cors from 'cors';
import Router from './routes';
import apiService from './lib/client/ApiService';
 

const app: Application = express(); 
app.use(requestLogger);
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
 
if (process.env.ALLOW_URL) {

    const allowedOrigins = [`${process.env.ALLOW_URL}`];
    const options: cors.CorsOptions = {
        origin: allowedOrigins,
    };
    app.use(cors(options));
}



// Adding the API Configuration
apiService.setAPIConfig(profileUtils.getConfig('server-config')) 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', Router);


/*
logger.trace('TRACE Message Print');
logger.debug('DEBUG Message Print');
logger.info('INFO Message Print');
logger.warn('WARNING Message Print');
logger.error('ERROR Message Print');
logger.fatal('FATAL Message Print');
*/

export default app;
