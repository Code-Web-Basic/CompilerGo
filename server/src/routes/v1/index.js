import express from 'express';
const router = express.Router();
import { UsersRoutes } from './user.route';

router.use('/users', UsersRoutes);
export const ApiV1 = router;
