import { Player } from "../models/Players";
import { sign } from "jsonwebtoken";
import config from "../config";

class Auth {
  private firstName: string | undefined;
  private lastName: string | undefined;
  private email: string;
  private password: string;
  private date: Date | undefined;

  constructor(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    date?: Date
  ) {
    this.email = email;
    this.password = password;
    this.date = date;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  async register() {
    const player = await new Player({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: await Player.encryptPassword(this.password),
      date: this.date,
    });

    const savePlayer = await player.save();
    const jwt = sign({ id: player.id }, config.secret_key as string, {
      expiresIn: "1h",
    });

    return jwt;
  }

  async login() {
    const playerDB = await Player.findOne({ email: this.email });
    if (!playerDB) {
      return "Wrong email!!!";
    }
    const validPassword = await Player.comparePassword(
      this.password,
      playerDB.password
    );

    if (!validPassword) {
      return "Invalid password";
    }

    const jwt = sign({ id: playerDB.id }, config.secret_key as string, {
      expiresIn: "1h",
    });

    return jwt;
  }
}

export default Auth;
