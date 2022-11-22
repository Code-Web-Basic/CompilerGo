import express from 'express';
import { PracticeController } from '../../controllers/practice.controller';
import { verifyToken } from '../../middlewares/verifyToken';

const router = express.Router();

router.route('/create').post(PracticeController.create);
router.route('/update/:id').post(PracticeController.update);

export const PracticeRoutes = router;
