import { prisma } from "../../database";
import { IDrug } from "../../interfaces";

class DrugService {
  public async getAllDrugs(
    skip: number,
    limit: number,
    filter?: object
  ): Promise<IDrug[]> {
    return await prisma.drug.findMany({
      skip,
      take: limit,
      where: filter,
    });
  }

  public async getDrugById(id: string): Promise<IDrug | null> {
    const drug = await prisma.drug.findUnique({
      where: {
        id,
      },
    });

    return drug;
  }

  public async getDrugs(filter: object): Promise<IDrug[]> {
    return await prisma.drug.findMany({
      where: filter,
    });
  }

  public async getDrug(filter: object): Promise<IDrug | null> {
    return await prisma.drug.findFirst({
      where: filter,
    });
  }

  public async createDrug(data: IDrug): Promise<IDrug> {
    return await prisma.drug.create({
      data,
    });
  }

  public async updateDrug(
    pharmacyId: string,
    id: string,
    data: object
  ): Promise<IDrug> {
    return await prisma.drug.update({ where: { pharmacyId, id }, data });
  }

  public async deleteDrug(pharmacyId: string, id: string): Promise<IDrug> {
    return await prisma.drug.delete({ where: { pharmacyId, id } });
  }
}

export default DrugService;
