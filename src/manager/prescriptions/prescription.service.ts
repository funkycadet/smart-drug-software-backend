import { IPrescription } from "../../interfaces";
import { prisma } from "../../database";

class PrescriptionService {
  public async getAllPrescriptions(
    skip: number,
    limit: number,
    filter?: object
  ): Promise<IPrescription[]> {
    const data = await prisma.prescription.findMany({
      skip,
      take: limit,
      where: filter,
    });
    return data;
  }

  public async getPrescriptionById(id: string): Promise<IPrescription | null> {
    const data = await prisma.prescription.findUnique({
      where: {
        id,
      },
    });
    return data;
  }

  public async getPrescriptions(filter: object): Promise<IPrescription[]> {
    const data = await prisma.prescription.findMany({
      where: filter,
    });
    return data;
  }

  public async getPrescription(filter: object): Promise<IPrescription | null> {
    const data = await prisma.prescription.findFirst({
      where: filter,
    });
    return data;
  }

  public async addPrescription(data: IPrescription): Promise<IPrescription> {
    return await prisma.prescription.create({
      data,
    });
  }

  public async updatePrescription(
    id: string,
    data: object
  ): Promise<IPrescription> {
    return await prisma.prescription.update({ where: { id }, data });
  }

  public checkPrescription(): void {
    // Check prescription
  }

  public checkAvailability(): void {
    // Check availability
  }
}

export default PrescriptionService;
