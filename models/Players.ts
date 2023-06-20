import { Schema, model } from "mongoose";
import IPlayers from "../interfaces/iPlayers";
import { IPlayerModel } from "../interfaces/iPlayersMethod";
import bcrypt from "bcryptjs";

const PlayerSchema: Schema<IPlayers> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already in use"],
      match: [/\S+@\S+\.\S+/, "Email is not valid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    date: {
      type: String,
    },
    totalGames: {
      type: Number,
      default: 0,
    },
    gamesWon: {
      type: Number,
      default: 0,
    },
    winRate: {
      type: Number,
      default: 0,
    },
    playHistory: [Object],
  },
  {
    versionKey: false,
  }
);

PlayerSchema.static("encryptPassword", async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
});

PlayerSchema.static(
  "comparePassword",
  async (password: string, receivedPassword: string) => {
    return await bcrypt.compare(password, receivedPassword);
  }
);

export const Player = model<IPlayers, IPlayerModel>("Player", PlayerSchema);
