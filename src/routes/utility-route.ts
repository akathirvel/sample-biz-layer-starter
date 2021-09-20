import express from 'express';
import { logger } from '@sunriseupc/nodejs-common';

const router = express.Router();

router.put('/changeloglevel', async (req: express.Request, res: express.Response) => {
    res.header('Accept', 'application/json');
    res.header('Content-Type', 'application/json');

    let loglevel = (req.query.loglevel && typeof req.query.loglevel === 'string') ? req.query.loglevel.toString() : 'error';
    loglevel = (loglevel === 'default') ? 'error' : loglevel;
    
    logger.level = loglevel;
    res.status(202).json({ message: `Log level changed to ${logger.level}` });
});

export default router;
