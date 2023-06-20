import { Model } from "mongoose";
import IPlayers from "./iPlayers";

export interface IPlayerModel extends Model<IPlayers>{
    encryptPassword(password: string): Promise<string>;
    comparePassword(password: string, receivedPassword: string): Promise<boolean>;
}