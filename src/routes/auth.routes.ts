import express from "express";
import { validateReqBody, validateJwt } from "../middleware";
import {
  loginSchema,
  registerPharmacySchema,
  registerSchema,
} from "../validations";
import { AuthController } from "../controllers";

const authController = new AuthController();

const router = express.Router();

router.post(
  "/signup",
  validateReqBody(registerSchema),
  authController.signup
);

router.post(
  "/pharmacy/signup",
  validateReqBody(registerPharmacySchema),
  authController.signupPharmacy
);

router.post(
  "/login",
  validateReqBody(loginSchema),
  authController.login("user")
);
router.post(
  "/pharmacy/login",
  validateReqBody(loginSchema),
  authController.login("pharmacy")
);

router.use(validateJwt());

export default router;
