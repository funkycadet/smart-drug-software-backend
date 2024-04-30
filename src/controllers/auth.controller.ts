import { AuthService } from "../services";
import { Request, Response, NextFunction, RequestHandler } from "express";

class AuthController {
  service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  signupPharmacy = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { businessName, email_address, address, password } = req.body;

      const pharmacy = await this.service.signupPharmacy(
        businessName,
        email_address,
        address,
        password
      );

      return res.status(201).json({ status: "success", data: pharmacy });
    } catch (err: any) {
      next(err);
    }
  };

  signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { firstName, lastName, age, email_address, password } = req.body;

      const user = await this.service.signup(
        firstName,
        lastName,
        age,
        email_address,
        password
      );

      return res.status(201).json({ status: "success", data: user });
    } catch (err: any) {
      next(err);
    }
  };

  login = (resourceType: "pharmacy" | "user"): RequestHandler => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response> => {
      try {
        const { email, password } = req.body;

        const data = await this.service.login(email, password, resourceType);

        return res
          .cookie("jwt", data.refreshToken, {
            httpOnly: true,
            // maxAge:
          })
          .status(200)
          .json({
            status: "success",
            data,
          });
      } catch (err: any) {
        next(err);
      }
    };
  };

  refreshTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const refreshToken = req.cookies.jwt;
      const accessToken = await this.service.refreshToken(refreshToken);
      res.json(accessToken);
    } catch (err: any) {
      next(err);
    }
  };
}

export default AuthController;
