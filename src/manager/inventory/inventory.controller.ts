import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../../exceptions";
import InventoryService from "./inventory.service";
import { ProtectedRequest } from "src/types";

class InventoryController {
  service: InventoryService;

  constructor() {
    this.service = new InventoryService();
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { limit, skip, category, brand, price } = req.query;
      const limitValue = limit ? Number(limit) : 20;
      const offsetValue = skip ? Number(skip) : 0;
      const filter: { [key: string]: any } = {
        category,
        brand,
      };

      if (price) {
        const numericPrice = Number(price);
        filter.price = numericPrice;
      }

      const products = await this.service.getAllProducts(
        offsetValue,
        limitValue,
        filter
      );
      return res.status(200).json({ status: "success", data: products });
    } catch (err: any) {
      next(err);
    }
  };

  getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const productId = req.params.id;
      if (!productId) throw new BadRequestError("No id provided");

      const product = await this.service.getProductById(productId);

      return res.status(200).json({ status: "success", data: product });
    } catch (err: any) {
      next(err);
    }
  };

  getMyProducts = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const pharmacyId = req.pharmacy?.id;
      if (!pharmacyId)
        throw new UnauthorizedError("Kindly login as a pharmacy to continue!");

      // const product = await this.service.getAllProducts(0, 20, { pharmacyId });
      const product = await this.service.getProducts({ pharmacyId });
      return res.status(200).json({ status: "success", data: product });
    } catch (err: any) {
      next(err);
    }
  };

  addProductToInventory = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const pharmacyId = req.pharmacy?.id;
      if (!pharmacyId)
        throw new UnauthorizedError("Kindly login as a pharmacy to continue!");

      const { drugId, category, quantity, price, alert } = req.body;

      const productExists = await this.service.getProduct({
        pharmacyId,
        drugId,
      });
      if (productExists)
        throw new ConflictError(
          `Product with id: ${drugId} already exists in your inventory!`
        );

      const product = await this.service.createProduct({
        pharmacyId,
        ...req.body,
      });

      return res.status(201).json({ status: "success", data: product });
    } catch (err: any) {
      next(err);
    }
  };

  updateProduct = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const pharmacyId = req.pharmacy?.id;
      if (!pharmacyId)
        throw new UnauthorizedError("Kindly login as a pharmacy to continue!");

      const id = req.params.id;
      if (!id) throw new BadRequestError("No inventory id provided");

      const { quantity, price, alert } = req.body;

      const product = await this.service.updateProduct(pharmacyId, id, {
        ...req.body,
      });

      return res.status(200).json({ status: "success", data: product });
    } catch (err: any) {
      next(err);
    }
  };
}

export default InventoryController;
