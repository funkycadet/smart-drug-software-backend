import { TokenData } from "../types";
import jwt from "jsonwebtoken";
import moment from "moment";

import { IUser, IPharmacy } from "src/interfaces";
import { PublicPharmacyData, PublicUserData } from "../types";

export const signJWT = (
  data: TokenData,
  secret: string,
  expiry: string
): string => {
  const token = jwt.sign(data, secret, {
    expiresIn: expiry,
  });
  return token;
};

export const verifyJWT = (token: string, secret: string): TokenData => {
  const decoded = jwt.verify(token, secret) as TokenData;
  return decoded;
};

export function generateVerificationCode(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const stripUser = (
  resource: IUser | IPharmacy,
  resourceType: "user" | "pharmacy"
): PublicPharmacyData | PublicUserData => {
  if (resourceType === "user") {
    const {
      password,
      // verificationCode,
      // verificationCodeExpiry,
      ...restOfUser
    } = resource;
    return restOfUser as PublicUserData;
  } else if (resourceType === "pharmacy") {
    const {
      password,
      // verificationCode,
      // verificationCodeExpiry,
      ...restOfPharmacy
    } = resource;
    return restOfPharmacy as PublicPharmacyData;
  }
};
