import express from 'express';
import passport from 'passport';
import { UserController } from '../../controllers/user.controller';
import { UserValidation } from '../../validations/user.validation';
const passportConfig = require('../../middlewares/passport');
const router = express.Router();

router.route('/secret').get(passport.authenticate('jwt', { section: false }), UserController.secret);
router.route('/signUp').post(UserValidation.signUp, UserController.signUp);

router
    .route('/signIn')
    .post(UserValidation.signIn, passport.authenticate('local', { section: false }), UserController.signIn);
router.route('/signIn/failed').get(UserController.signUpFailed);
router.route('/signIn/success').get(UserController.signUpSuccess);
router.route('/signOut').get(UserController.signOut);
router
    .route('/auth/google')
    .get(passport.authenticate('google', { scope: ['email', 'profile'] }), UserController.authGoogle);

router.route('/auth/google/callback').get(
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3000',
        failureRedirect: '/signIn/failed',
    }),
);

router
    .route('/auth/facebook')
    .post(passport.authenticate('facebook-token', { section: false }), UserController.authFacebook);
export const UsersRoutes = router;
