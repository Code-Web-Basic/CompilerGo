import express from 'express';
const router = express.Router();
import { UsersRoutes } from './user.route';
import { CompileRoutes } from './compile.route';

router.use('/users', UsersRoutes);
router.use('/compile', CompileRoutes);
export const ApiV1 = router;
