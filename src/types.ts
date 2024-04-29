import { Request } from "express";
import { IPharmacy, IUser } from "./interfaces";

export type TokenData = { id: string; resourceType: string, role?: string };

export interface ProtectedRequest extends Request {
  user?: IUser;
  pharmacy?: IPharmacy;
}

export type PublicUserData = Omit<IUser, "password" | "refreshTokens">;
export type PublicPharmacyData = Omit<IPharmacy, "password" | "refreshTokens">;
