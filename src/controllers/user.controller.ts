import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { BadRequestError, UnauthorizedError } from "../exceptions";
import { ProtectedRequest } from "../types";
import { stripUser } from "../utils";

class UserController {
  service: UserService;

  constructor() {
    this.service = new UserService();
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

      const users = await this.service.getAllUsers(offsetValue, limitValue);

      const processedUsers = [];
      for (const user of users) {
        const foundUser = stripUser(user, "user");
        processedUsers.push(foundUser);
      }

      return res.status(200).json({ status: "success", data: processedUsers });
    } catch (err: any) {
      next(err);
    }
  };

  // getMe = async (
  //   req: ProtectedRequest,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> => {
  //   try {
  //     const userId = req.user?.id;
  //     if (!userId)
  //       throw new UnauthorizedError(
  //         `Unauthorized! Please log in as user to continue`
  //       );

  //     // const id = req.params.id;
  //     const foundUser = await this.service.getUserById(userId);
  //     return res.status(200).json({ status: "success", data: foundUser });
  //   } catch (err: any) {
  //     next(err);
  //   }
  // };

  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const id = req.params.id;
      if (!id) throw new BadRequestError(`No id provided`);

      const user = await this.service.getUserById(id);
      const foundUser = stripUser(user, "user");

      return res.status(200).json({ status: "success", data: foundUser });
    } catch (err: any) {
      next(err);
    }
  };

  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { email } = req.params;
      if (!email) throw new BadRequestError(`No email address provided`);

      const user = await this.service.getUser({ email });
      const foundUser = stripUser(user, "user");

      return res.status(200).json({ status: "success", data: foundUser });
    } catch (err: any) {
      next(err);
    }
  };
}

export default UserController;
