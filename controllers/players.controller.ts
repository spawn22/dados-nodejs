import { Request, Response } from "express";
import GetPlayers from "../helpers/getPlayers";
import UpdatePlayerName from "../helpers/updatePlayerName";

export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const getAllPlayers = await GetPlayers.getAllPlayers();

    res.status(200).json({
      getAllPlayers,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error 500 - Internal Server Error",
    });
  }
};

export const getOnePlayer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const player = await new GetPlayers(id);
    const getPlayer = await player.getOnePlayer();

    res.status(200).json({
      getPlayer,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error 500 - Internal Server Error",
    });
  }
};

export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { firstName, lastName } = req.body;
    const updatePlayer = await new UpdatePlayerName(id, firstName, lastName);

    res.status(200).json({
      msg: "Player Updated",
      updatePlayer,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error 400 - Player doesn't Exist",
    });
  }
};

export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletePlayer = await new GetPlayers(id);

    deletePlayer.getAndDelete();

    res.status(201).json({
      msg: "Player Deleted",
      deletePlayer,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error 400 - Player doesn't Exist",
    });
  }
};
