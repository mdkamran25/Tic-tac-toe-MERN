import user from "./user.js"
import authRouter from './authRoutes.js';
import gameRouter from "./game.js";
const CombinedRouter = [
    authRouter,
    user,
    gameRouter,
]

export default CombinedRouter;