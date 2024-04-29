import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../../exceptions";
import { ProtectedRequest } from "src/types";
import PrescriptionService from "./prescription.service";

class PrescriptionController {
  service: PrescriptionService;

  constructor() {
    this.service = new PrescriptionService();
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { limit, skip, status } = req.query;
      const limitValue = limit ? Number(limit) : 20;
      const offsetValue = skip ? Number(skip) : 0;
      const filter: { [key: string]: any } = {
        status,
      };

      const prescriptions = await this.service.getAllPrescriptions(
        offsetValue,
        limitValue,
        filter
      );
      return res.status(200).json({ status: "success", data: prescriptions });
    } catch (err: any) {
      next(err);
    }
  };

  getPrescriptionById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const id = req.params.id;
      if (!id) throw new BadRequestError(`No id provided`);

      const prescription = await this.service.getPrescriptionById(id);
      return res.status(200).json({ status: "success", data: prescription });
    } catch (err: any) {
      next(err);
    }
  };

  getMyPrescriptions = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const id = req.user?.id || req.pharmacy?.id;
      if (!id) throw new UnauthorizedError("Kindly login to continue!");

      // const prescriptions = await this.service.getAllPrescriptions(0, 20, {
      //   id,
      // });
      const prescription = await this.service.getPrescriptions({ id });

      return res.status(200).json({ status: "success", data: prescription });
    } catch (err: any) {
      next(err);
    }
  };

  createPrescription = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { drugId, dosage } = req.body;

      const pharmacyId = req.pharmacy?.id;
      if (!pharmacyId) throw new UnauthorizedError("Kindly login to continue!");

      const prescription = await this.service.addPrescription({
        pharmacyId,
        ...req.body,
      });

      return res.status(201).json({ status: "success", data: prescription });
    } catch (err: any) {
      next(err);
    }
  };

  updatePrescription = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const id = req.pharmacy?.id;
      if (!id) throw new BadRequestError("No id provided");

      const prescriptionId = req.params.id;
      if (!prescriptionId)
        throw new BadRequestError("No prescription id provided");

      const { dosage } = req.body;

      const product = await this.service.updatePrescription(prescriptionId, {
        ...req.body,
      });

      return res.status(200).json({ status: "success", data: product });
    } catch (err: any) {
      next(err);
    }
  };
}

export default PrescriptionController;
