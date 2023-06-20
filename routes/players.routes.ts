import Router from "express";
import {
  getAllPlayers,
  getOnePlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/players.controller";
import { validateToken } from "../middlewares/validateJWT";
const router = Router();

router.get("/get-all-players", validateToken, getAllPlayers);
router.get("/get-player/:id", validateToken, getOnePlayer);
router.put("/update-player/:id", validateToken, updatePlayer);
router.delete("/delete-player/:id", validateToken, deletePlayer);

export default router;
