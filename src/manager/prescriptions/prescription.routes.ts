import { Router } from "express";
import { validateJwt, validateReqBody } from "../../middleware";
import { createPrescriptionSchema } from "../../validations";
import PrescriptionController from "./prescription.controller";

const prescriptionController = new PrescriptionController();

const prescriptionRouter = Router();

prescriptionRouter.get("/", prescriptionController.getAll);

prescriptionRouter.use(validateJwt());
prescriptionRouter.get("/:id", prescriptionController.getPrescriptionById);
prescriptionRouter.post(
  "/",
  // validateReqBody(createPrescriptionSchema),
  prescriptionController.createPrescription
);
prescriptionRouter.get("/me", prescriptionController.getMyPrescriptions);
prescriptionRouter.patch("/:id", prescriptionController.updatePrescription);

export default prescriptionRouter;
