import express from 'express';
import { PracticeController } from '../../controllers/practice.controller';
import { verifyToken } from '../../middlewares/verifyToken';

const router = express.Router();

router.route('/create').post(PracticeController.create);
router.route('/update/:id').post(PracticeController.update);
router.route('/getList/:id').get(PracticeController.getList);
router.route('/findOneById/:id').get(PracticeController.findOneById);
export const PracticeRoutes = router;
