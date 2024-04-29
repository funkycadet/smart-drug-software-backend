import express from "express";
import { validateJwt, validateReqBody } from "../../middleware";
import { createProductSchema, updateProductSchema } from "../../validations";
import InventoryController from "./inventory.controller";

const inventoryController = new InventoryController();

const inventoryRouter = express.Router();

inventoryRouter.get("/", inventoryController.getAll);

inventoryRouter.use(validateJwt());

inventoryRouter.get("/me", inventoryController.getMyProducts);
inventoryRouter.get("/:id", inventoryController.getProduct);
inventoryRouter.post(
  "/",
  // validateReqBody(createProductSchema),
  inventoryController.addProductToInventory
);
inventoryRouter.patch(
  "/:id",
  // validateReqBody(updateProductSchema),
  inventoryController.updateProduct
);

export default inventoryRouter;
