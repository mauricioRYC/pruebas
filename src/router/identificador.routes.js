import { Router } from "express";
import { Identificador } from "../controller/identificador.js";

const router = Router();

router.get("/identificado", Identificador);
export default router;
