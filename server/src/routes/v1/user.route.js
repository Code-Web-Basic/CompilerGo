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
router.route('/signIn/success').get(UserController.signInSuccess);
router.route('/signOut').get(UserController.signOut);
router.route('/auth/google').get(passport.authenticate('google', { scope: ['email', 'profile'] }));

router.route('/auth/google/callback').get(UserController.googleCallBack);

router.route('/auth/github').get(passport.authenticate('github', { scope: ['user:email', 'profile'] }));

router.route('/auth/github/callback').get(
    passport.authenticate('github', {
        successRedirect: 'http://localhost:3000',
        failureRedirect: '/signIn/failed',
    }),
);
export const UsersRoutes = router;
