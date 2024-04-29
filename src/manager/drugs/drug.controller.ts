import { Request, Response, NextFunction } from "express";
import DrugService from "./drug.service";
import { ProtectedRequest } from "../../types";
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../../exceptions";

class DrugController {
  private service: DrugService;

  constructor() {
    this.service = new DrugService();
  }

  getAllDrugs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { limit, skip, brand } = req.query;
      const limitValue = limit ? Number(limit) : 20;
      const offsetValue = skip ? Number(skip) : 0;
      const filter: { [key: string]: any } = {
        brand,
      };

      const drugs = await this.service.getAllDrugs(
        offsetValue,
        limitValue,
        filter
      );

      return res.status(200).json({ status: "success", data: drugs });
    } catch (err: any) {
      next(err);
    }
  };

  getDrug = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const pharmacyId = req.pharmacy?.id;
      if (!pharmacyId)
        throw new UnauthorizedError("Kindly log in as a pharmacy to continue!");

      const id = req.params.id;
      if (!id) throw new BadRequestError("No id provided");

      const drug = await this.service.getDrug({ pharmacyId, id });

      return res.status(200).json({ status: "success", data: drug });
    } catch (err: any) {
      next(err);
    }
  };

  getMyDrugs = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const pharmacyId = req.pharmacy?.id;
      if (!pharmacyId)
        throw new UnauthorizedError("Kindly log in as a pharmacy to continue!");

      const drugs = await this.service.getDrugs({
        pharmacyId,
      });

      return res.status(200).json({ status: "success", data: drugs });
    } catch (err: any) {
      next(err);
    }
  };

  createDrug = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const pharmacyId = req.pharmacy?.id;
      if (!pharmacyId)
        throw new UnauthorizedError("Kindly log in as a pharmacy to continue!");

      const {
        name,
        brand,
        medical_condition,
        dosageStrengthNumber,
        dosageStrengthUnit,
        contraindications,
        interactions,
        picture,
      } = req.body;

      const drugExists = await this.service.getDrug({
        pharmacyId,
        name,
        brand,
      });
      if (drugExists)
        throw new ConflictError(
          `A drug exists with name: ${name} and brand: ${brand} in your inventory!`
        );

      const drug = await this.service.createDrug({
        pharmacyId,
        ...req.body,
      });

      return res.status(201).json({ status: "success", data: drug });
    } catch (err: any) {
      next(err);
    }
  };

  updateDrug = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const pharmacyId = req.pharmacy?.id;
      if (!pharmacyId)
        throw new UnauthorizedError("Kindly log in as a pharmacy to continue!");

      const id = req.params.id;
      if (!id) throw new BadRequestError("No drug id provided");

      const {} = req.body;

      const drug = await this.service.updateDrug(pharmacyId, id, {
        ...req.body,
      });

      return res.status(200).json({ status: "success", data: drug });
    } catch (err: any) {
      next(err);
    }
  };
}

export default DrugController;
