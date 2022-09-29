import express from 'express';
import { CompileController } from '../../controllers/compile.controller';
const router = express.Router();

router.route('/python').post(CompileController.pythonCompile);
router.route('/pythonWithInput').post(CompileController.pythonCompileWithInput);

router.route('/cPlus').post(CompileController.cPlusCompile);
router.route('/cPlusWithInput').post(CompileController.cPlusCompileWithInput);

router.route('/java').post(CompileController.javaCompile);
router.route('/javaWithInput').post(CompileController.javaCompileWithInput);

router.route('/cs').post(CompileController.csCompile);
router.route('/csWithInput').post(CompileController.csCompileWithInput);
export const CompileRoutes = router;
