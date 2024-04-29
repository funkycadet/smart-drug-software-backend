import { prisma } from "../../database";
import { IInventory } from "../../interfaces";

class InventoryService {
  public async getAllProducts(
    skip: number,
    limit: number,
    filter?: object
  ): Promise<IInventory[]> {
    return await prisma.inventory.findMany({
      skip,
      take: limit,
      where: filter,
    });
  }

  public async getProductById(
    // pharmacyId: string,
    id: string
  ): Promise<IInventory | null> {
    const product = await prisma.inventory.findUnique({
      where: {
        // pharmacyId,
        id,
      },
    });

    return product;
  }

  public async getProducts(filter: object): Promise<IInventory[]> {
    return await prisma.inventory.findMany({
      where: filter,
    });
  }

  public async getProduct(filter: object): Promise<IInventory | null> {
    return await prisma.inventory.findFirst({
      where: filter,
    });
  }

  public async createProduct(data: IInventory): Promise<IInventory> {
    return await prisma.inventory.create({
      data,
    });
  }

  public async updateProduct(
    pharmacyId: string,
    id: string,
    data: object
  ): Promise<IInventory> {
    const product = await prisma.inventory.update({
      where: {
        pharmacyId,
        id,
      },
      data,
    });

    return product;
  }

  public async deleteProduct(pharmacyId: string, id: string): Promise<void> {
    await prisma.inventory.delete({
      where: { pharmacyId, id },
    });
  }

  public async deleteManyProducts(
    pharmacyId: string,
    filter: object
  ): Promise<void> {
    await prisma.inventory.deleteMany({
      where: {
        pharmacyId: pharmacyId,
        ...filter,
      },
    });
  }
}

export default InventoryService;
