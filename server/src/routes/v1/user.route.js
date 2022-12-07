import express from 'express';
import passport from 'passport';
import { UserController } from '../../controllers/user.controller';
import { verifyToken } from '../../middlewares/verifyToken';
import { UserValidation } from '../../validations/user.validation';
const passportConfig = require('../../middlewares/passport');
const router = express.Router();

router.route('/secret').get(passport.authenticate('jwt', { section: false }), UserController.secret);
router.route('/register').post(UserController.register);

router.route('/login').post(UserController.login);
router.route('/signIn/failed').get(UserController.signUpFailed);
router.route('/signIn/success').get(UserController.signInSuccess);
router.route('/logout').post(verifyToken, UserController.logout);
router.route('/auth/google').get(passport.authenticate('google', { scope: ['email', 'profile'] }));

router.route('/auth/google/callback').get(UserController.googleCallBack);

router.route('/auth/github').get(passport.authenticate('github', { scope: ['user:email', 'profile'] }));

router.route('/auth/github/callback').get(UserController.githubCallBack);

router.route('/getAllUser').get(verifyToken, UserController.getAllUser);
router.route('/refresh').post(UserController.refresh);
router.route('/submitCode').post(UserController.submitCode);
export const UsersRoutes = router;
