import { Router } from "express";
import { Identificador, Hola } from "../controller/identificador.js";

const router = Router();

router.get("/identificado", Identificador);
router.post("/api/agregar", Hola);
export default router;
