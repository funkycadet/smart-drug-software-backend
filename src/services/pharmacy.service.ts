import { IPharmacy } from "../interfaces";
import { prisma } from "../database";

class PharmacyService {
  public async getAllPharmacies(
    skip: number,
    limit: number
  ): Promise<IPharmacy[]> {
    return await prisma.pharmacy.findMany({
      skip,
      take: limit,
    });
  }

  public async getPharmacyById(id: string): Promise<IPharmacy | null> {
    const pharmacy = await prisma.pharmacy.findUnique({
      where: {
        id,
      },
    });
    return pharmacy;
  }

  public async wherePharmacy(filter: object): Promise<IPharmacy[]> {
    const pharmacy = await prisma.pharmacy.findMany({
      where: filter,
    });
    return pharmacy;
  }

  public async getPharmacy(filter: object): Promise<IPharmacy | null> {
    const pharmacy = await prisma.pharmacy.findFirst({
      where: filter,
    });
    return pharmacy;
  }

  public async createPharmacy(data: IPharmacy): Promise<IPharmacy> {
    return await prisma.pharmacy.create({
      data,
    });
  }

  public async updatePharmacy(id: string, data: object): Promise<IPharmacy | null> {
    const pharmacy = await prisma.pharmacy.update({
      where: {
        id,
      },
      data,
    });
    return pharmacy;
  }
}

export default PharmacyService;
