import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../exceptions";
import { PharmacyService } from "../services";
import { stripUser } from "../utils";

class PharmacyController {
  service: PharmacyService;

  constructor() {
    this.service = new PharmacyService();
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { limit, skip } = req.query;
      const limitValue = limit ? Number(limit) : 20;
      const offsetValue = skip ? Number(skip) : 0;

      const users = await this.service.getAllPharmacies(
        offsetValue,
        limitValue
      );
      const processedUsers = [];
      for (const pharmacy of users) {
        const foundUser = stripUser(pharmacy, "pharmacy");
        processedUsers.push(foundUser);
      }

      return res.status(200).json({ status: "success", data: processedUsers });
    } catch (err: any) {
      next(err);
    }
  };

  getPharmacyById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const id = req.params.id;
      if (!id) throw new BadRequestError(`No id provided`);

      const pharmacy = await this.service.getPharmacyById(id);
      const stripPharmacy = stripUser(pharmacy, "pharmacy");

      return res.status(200).json({ status: "success", data: stripPharmacy });
    } catch (err: any) {
      next(err);
    }
  };

  getPharmacy = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { businessName } = req.params;
      if (!businessName) throw new BadRequestError(`No business name provided`);

      const pharmacy = await this.service.getPharmacy({ businessName });
      const stripPharmacy = stripUser(pharmacy, "pharmacy");

      return res.status(200).json({ status: "success", data: stripPharmacy });
    } catch (err: any) {
      next(err);
    }
  };
}

export default PharmacyController;
