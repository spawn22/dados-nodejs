import { Response, Request } from "express";
import Auth from "../helpers/auth";

/**
 * Registers a new user
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export const Register = async (req: Request, res: Response) => {
  try {
    // Extract relevant fields from request body
    const { firstName, lastName, email, password } = req.body;

    // Get current date
    const date = new Date();

    // Create new user object
    const player = new Auth(email, password, firstName, lastName, date);

    // Register user and get JWT token
    const register = await player.register();

    // Return successful response with user information and JWT token
    res.status(201).json({
      firstName,
      lastName,
      email,
      date,
      jwt: register,
    });
  } catch (error) {
    // Log error and return error response
    console.error(error);
    res.status(500).json({
      msg: "Error 500 - Internal server Error",
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const player = new Auth(email, password);
    const login = await player.login();

    if (login === "Wrong email!!!") {
      return res.status(400).json({
        msg: "The email address entered is not register",
      });
    }

    if (login === "Invalid password") {
      return res.status(400).json({
        msg: "The password entered is incorrect",
      });
    }

    res.status(201).json({
      msg: "Login successful",
      jwt: login,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error 500 - Internal server Error",
    });
  }
};
