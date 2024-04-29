import * as argon from "argon2";
import { User, Pharmacy } from "@prisma/client";

import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../config";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../exceptions";
import PharmacyService from "./pharmacy.service";
import UserService from "./user.service";
import { signJWT, stripUser, verifyJWT } from "../utils";

class AuthService {
  user: UserService;
  pharmacy: PharmacyService;

  constructor() {
    this.user = new UserService();
    this.pharmacy = new PharmacyService();
  }

  public signTokens(
    resource: User | Pharmacy,
    resourceType: "user" | "pharmacy"
  ): {
    refreshToken: string;
    accessToken: string;
  } {
    const dataToSign = { id: resource.id, resourceType };

    const accessToken = signJWT(
      dataToSign,
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_EXPIRY
    );
    const refreshToken = signJWT(
      dataToSign,
      REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_EXPIRY
    );

    return { refreshToken, accessToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    if (!refreshToken) throw new UnauthorizedError(`No token provided`);

    const token: any = verifyJWT(refreshToken, REFRESH_TOKEN_SECRET);

    let resource: any;
    if (token.resourceType === "buyer") {
      resource = await this.user.getUserById(token.id);
    } else {
      resource = await this.pharmacy.getPharmacyById(token.id);
    }
    if (!resource) throw new NotFoundError(`No user found`);

    const accessToken = signJWT(
      {
        id: resource.id,
        resourceType: resource.resourceType,
      },
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_EXPIRY
    );
    return { accessToken };
  }

  public async login(
    email: string,
    password: string,
    resourceType: "user" | "pharmacy"
  ): Promise<{
    user?: any;
    pharmacy?: any;
    accessToken: string;
    refreshToken: string;
  }> {
    let resource: any;

    if (resourceType === "user") {
      resource = await this.user.getUser({ email });
    } else if (resourceType === "pharmacy") {
      resource = await this.pharmacy.getPharmacy({ email });
    }

    if (!resource || !(await argon.verify(resource.password, password)))
      throw new UnauthorizedError(
        `No ${resourceType} found with email or password!`
      );

    const { refreshToken, accessToken } = this.signTokens(
      resource,
      resourceType
    );

    resource.refreshTokens = resource.refreshTokens || [];
    resource.refreshTokens.push(refreshToken);

    // Update the resource with the new refresh token array
    if (resourceType === "user") {
      await this.user.updateUser(resource.id, {
        refreshTokens: resource.refreshTokens,
      });
    } else {
      await this.pharmacy.updatePharmacy(resource.id, {
        refreshTokens: resource.refreshTokens,
      });
    }

    const resourceToReturn = stripUser(resource, resourceType);
    const dataToReturn: {
      user?: any;
      pharmacy?: any;
      accessToken: string;
      refreshToken: string;
    } = { accessToken, refreshToken };

    if (resourceType === "user") {
      dataToReturn.user = resourceToReturn;
    } else {
      dataToReturn.pharmacy = resourceToReturn;
    }

    return dataToReturn;
  }

  public async signup(
    firstName: string,
    lastName: string,
    age: string,
    email_address: string,
    password: string
  ): Promise<any> {
    const hashedPassword = await argon.hash(password);

    const existingUser = await this.user.getUser({ email_address });
    if (existingUser)
      throw new ForbiddenError(
        `User with email ${email_address} already exists`
      );

    const user = await this.user.createUser({
      firstName,
      lastName,
      age,
      email_address,
      password: hashedPassword,
    });
    return stripUser(user, "user");
  }

  public async signupPharmacy(
    businessName: string,
    email_address: string,
    address: string,
    password: string
  ): Promise<any> {
    const hashedPassword = await argon.hash(password);

    const existingPharmacy = await this.pharmacy.getPharmacy({ email_address });
    if (existingPharmacy)
      throw new ForbiddenError(
        `Pharmacy with email ${email_address} already exists`
      );

    const pharmacy = await this.pharmacy.createPharmacy({
      businessName,
      email_address,
      address,
      password: hashedPassword,
    });
    return stripUser(pharmacy, "pharmacy");
  }
}

export default AuthService;
