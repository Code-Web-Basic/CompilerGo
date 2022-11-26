import express from 'express';
import { CompileController } from '../../controllers/compile.controller';
const router = express.Router();

router.route('/').post(CompileController.compile);
router.route('/input').post(CompileController.compileWithInput);
export const CompileRoutes = router;
