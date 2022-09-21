import express from 'express';
import passport from 'passport';
import { UserController } from '../../controllers/user.controller';
import { UserValidation } from '../../validations/user.validation';
const passportConfig = require('../../middlewares/passport');
const router = express.Router();

router.route('/signUp').post(UserValidation.signUp, UserController.signUp);

router
    .route('/signIn')
    .post(UserValidation.signIn, passport.authenticate('local', { section: false }), UserController.signIn);

router.route('/secret').get(passport.authenticate('jwt', { section: false }), UserController.secret);

router
    .route('/auth/google')
    .post(passport.authenticate('google-plus-token', { section: false }), UserController.authGoogle);
router
    .route('/auth/facebook')
    .post(passport.authenticate('facebook-token', { section: false }), UserController.authFacebook);
export const UsersRoutes = router;
