import express from 'express';
const router = express.Router();
import { UsersRoutes } from './user.route';
import { CompileRoutes } from './compile.route';
import { PracticeRoutes } from './practice.route';

router.use('/users', UsersRoutes);
router.use('/compile', CompileRoutes);
router.use('/practice', PracticeRoutes);
export const ApiV1 = router;
