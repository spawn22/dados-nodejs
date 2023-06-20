import Router from "express"
import { playerRollDice, generalRanking, getBetterPlayer, getWorstPlayer, deleteGames } from "../controllers/diceGame.controller";
import { validateToken } from "../middlewares/validateJWT";


const router = Router();

router.post('/player/:id',validateToken, playerRollDice)
router.get('/ranking', validateToken, generalRanking)
router.get('/better-player', validateToken, getBetterPlayer)
router.get('/worst-player', validateToken, getWorstPlayer)
router.delete('/delete/:id', validateToken, deleteGames)


export default router;