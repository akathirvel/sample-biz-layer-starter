import express from 'express';

import UserRoute from './user-route';
import UtiltiyRoute from './utility-route';

const router = express.Router();


router.use('/user', UserRoute);
router.use('/utils', UtiltiyRoute);
export default router;
