import { Router } from "express";

// Middlewares
import validate from "@middlewares/validate";

// Validators
import * as user from '@validations/user';

// Controllers
import * as auth from '@controllers/auth';

const router = Router();

// Signup
router.post('/signup', validate(user.createUser), auth.register);

export default router;