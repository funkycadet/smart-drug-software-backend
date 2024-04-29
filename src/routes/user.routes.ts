import express from "express";
// import { validateReqBody } from "../middlewares";
import { UserController } from "../controllers";
import { validateJwt } from "../middleware";

const userController = new UserController();

const router = express.Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getUserById);
router.get("/email/:email", userController.getUser);

// router.use(validateJwt());
// router.get("/me", userController.getMe);

export default router;
