import { Request, Response } from "express";
import RollGame from "../helpers/diceGame";

export const playerRollDice = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const game = await new RollGame(id);
    const playerRollDices = await game.playerRollDice();

    res.status(200).json({
      msg: "Roll dice",
      playerRollDices,
    });
  } catch (error) {
    res.status(400).json({
      msg: "The Id enteres isnt valid",
    });
  }
};

export const generalRanking = async (req: Request, res: Response) => {
  try {
    const ranking = await RollGame.generalRanking();

    res.status(200).json({
      msg: "Ranking",
      ranking,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error 500 - Internal Server Error",
    });
  }
};

export const getBetterPlayer = async (req: Request, res: Response) => {
  try {
    const betterPlayer = await RollGame.getBetterPlayer();
    res.status(200).json({
      msg: "Better Player",
      betterPlayer,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error 500 - Internal Server Error",
    });
  }
};

export const getWorstPlayer = async (req: Request, res: Response) => {
  try {
    const worstPlayer = await RollGame.getWorstPlayer();
    res.status(200).json({
      msg: "Worst Player",
      worstPlayer,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error 500 - Internal Server Error",
    });
  }
};

export const deleteGames = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const player = await new RollGame(id);
    const deletedPlayer = await player.deletePlayerGames();
    res.status(200).json({
      msg: "Player deleted",
      deletedPlayer,
    });
  } catch (error) {
    res.status(400).json({
      msg: "The ID entered is not valid",
    });
  }
};
