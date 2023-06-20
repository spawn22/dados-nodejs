import { rollDices } from "./dices";
import { Player } from "../models/Players";
import IPlayers from "../interfaces/iPlayers";
import { deletePlayer } from "../controllers/players.controller";

class RollGame {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  async playerRollDice() {
    const game = rollDices();

    const player = (await Player.findById({ _id: this.id })) as IPlayers;

    player.totalGames++;

    if (game.veredict === "win") {
      player.gamesWon++;
    }

    player.playHistory.push(game);
    player.winRate = parseFloat(
      ((player.gamesWon / player.totalGames) * 100).toFixed(2)
    );

    await player.save();

    return {
      id: player._id,
      firstName: player.firstName,
      lastName: player.lastName,
      email: player.email,
      totalGames: player.totalGames,
      winRate: player.winRate,
      gamesWon: player.gamesWon,
      playHistory: player.playHistory,
    };
  }

  static async generalRanking() {
    const player = await Player.find({}).sort({ wonRate: -1 });
    return player;
  }

  static async getBetterPlayer() {
    const players = await Player.find({});
    let max = 0;
    players.forEach((player) => {
      player.winRate > max ? (max = player.winRate) : null;
    });

    const betterPlayer = await Player.findOne({ winRate: max });

    return betterPlayer;
  }

  static async getWorstPlayer() {
    const players = await Player.find({});
    let min = 100;
    players.forEach((player) => {
      player.winRate < min ? (min = player.winRate) : null;
    });
    const worstPlayer = await Player.findOne({ winRate: min });
    return worstPlayer;
  }

  async deletePlayerGames() {
    const player = (await Player.findById({ _id: this.id })) as IPlayers;
    player.totalGames = 0;
    player.winRate = 0;
    player.gamesWon = 0;
    player.playHistory = [];

    await player.save();

    return {
      id: player._id,
      firstName: player.firstName,
      lastName: player.lastName,
      email: player.email,
      totalGames: player.totalGames,
      winRate: player.winRate,
      gamesWon: player.gamesWon,
      playHistory: player.playHistory,
    };
  }
}

export default RollGame;
