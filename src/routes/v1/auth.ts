import { Router, Request, Response } from "express";
import { container } from "tsyringe";

// Middlewares
import validate from "../../middlewares/validate";
import auth from "../../middlewares/auth";

// Validators
import * as user from '../../validations/user';

// Utilities
import makeAsync from "../../utils/makeAsync";

// Controllers
import AuthController from "../../controllers/auth";
const authController = container.resolve(AuthController);

const router = Router();

// Sign up
router.post('/signup', validate(user.createUser), makeAsync((req: Request, res: Response) => authController.register(req, res)));
// // Fetch logged in user
// router.get('/', auth(), authController.me);
// // Sign in
// router.post('/signin', validate(user.signIn), authController.signin);
// // Admin Sign in
// router.post('/adminSignin', authController.adminSignin);
// // Admin Sign out Log
// router.post('/adminSignOutLog', auth(), authController.adminSignoutLog);
// // Super Admin Sign in (from redirect)
// router.post('/superAdminRedirectSignin', auth(), authController.superAdminRedirectSignin);
// // Verify Email by Token
// router.get("/verifyEmail/:token", validate(user.verifyToken), authController.verifyEmail);
// // Verify Reset Password From Email
// router.get('/verifyResetPasswordEmail/:token', validate(user.verifyToken), authController.verifyResetPasswordEmail);
// // Reset Password (User)
// router.post('/resetUserPassword', auth(), authController.resetPasswordForUser);
// // Reset Password
// router.post('/resetPassword', authController.resetPassword);
// // Forgot Password
// router.post('/forgotPassword', authController.forgotPassword);
// // Forgot Company Code
// router.post('/forgotCompanyCode', authController.forgotCompanyCode);
// // Update User Info
// router.post('/updateUserInfo', auth(), authController.updateUserInfo);
// // Enable 2FA Authentication
// router.get('/enable-2fa', auth(), authController.enable2Fa);
// // Confirm Enable 2FA Authentication
// router.post('/confirmEnable-2fa', auth(), authController.confirmEnable2Fa);
// // Verify 2FA
// router.post('verify2FA', auth(), authController.verify2Fa);
// // Disable 2FA
// router.post('/disable2FA', auth(), authController.disable2Fa);
// // Upload Users' Profile Photo
// router.post('/uploadUserPhoto', auth(), authController.uploadUserPhoto);

export default router;