import { Router } from "express";

import { solucion } from "../controllers/jugsController";

const router = Router();

router.post('/solucion', solucion); //ruta de solucion

export default router;