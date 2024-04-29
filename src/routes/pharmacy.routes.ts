import express from "express";
import { validateReqBody, validateJwt } from "../middleware";
import { PharmacyController } from "../controllers";

const pharmacyController = new PharmacyController();

const router = express.Router();

router.get("/", pharmacyController.getAll);
router.get("/:id", pharmacyController.getPharmacyById);
router.get("business/:businessName", pharmacyController.getPharmacy);

export default router;
