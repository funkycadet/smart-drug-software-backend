import { prisma } from "../database";
import { IUser } from "../interfaces";

class UserService {
  public async getAllUsers(skip: number, limit: number): Promise<IUser[]> {
    return await prisma.user.findMany({
      skip,
      take: limit,
    });
  }

  public async getUserById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
    });
    return user;
  }

  public async whereUser(filter: object): Promise<IUser[]> {
    const user = await prisma.user.findMany({
      where: filter,
    });
    return user;
  }

  public async getUser(filter: object): Promise<IUser | null> {
    const user = await prisma.user.findFirst({
      where: filter,
    });
    return user;
  }

  public async createUser(data: IUser): Promise<IUser> {
    return await prisma.user.create({
      data,
    });
  }

  public async updateUser(id: string, data: object): Promise<IUser | null> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return user;
  }
}

export default UserService;
