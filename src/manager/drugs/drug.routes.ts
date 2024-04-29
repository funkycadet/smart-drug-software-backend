import express from "express";
import { validateJwt } from "../../middleware";
import DrugController from "./drug.controller";

const drugController = new DrugController();

const drugRouter = express.Router();

drugRouter.get("/", drugController.getAllDrugs);

drugRouter.use(validateJwt());

drugRouter.get("/me", drugController.getMyDrugs);
drugRouter.get("/:id", drugController.getDrug);
drugRouter.post("/", drugController.createDrug);
drugRouter.patch("/:id", drugController.updateDrug);

export default drugRouter;
