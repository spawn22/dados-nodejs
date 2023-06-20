import express, { Application } from "express";
import config from "../config";
import routerGames from "../routes/diceGame.routes";
import { connectDB } from "../db/config";
import routerError from "../routes/error404.routes";
import cors from "cors";
import routerAuth from '../routes/auth.routes'
import routerPlayers from '../routes/players.routes'

class Server {
  private app: Application;
  private port: string;
  private path = {
    games: "/games",
    auth: "/auth",
    players: "/players",
   
  };

  constructor() {
    this.app = express();
    this.port = config.port as string;

    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  async dbConnect() {
    await connectDB();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.path.games, routerGames);
    this.app.use(this.path.auth, routerAuth)
    // this.app.use(this.path.error404, routerError);
    this.app.use(this.path.players, routerPlayers)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
