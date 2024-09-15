import { Request, Response } from "express";

//calculo del maximo comun divisor
const maximoCD = (a: number, b: number): number => {
  return b === 0 ? a : maximoCD(b, a % b);
};

//algoritmo
const waterBucket = (
  x: number,
  y: number,
  z: number
):
  | Array<{
      step: number;
      bucketX: number;
      bucketY: number;
      action: string;
      status?: string;
    }>
  | string => {
  //opciones sin solucion
  if (z > Math.max(x, y) || z % maximoCD(x, y) !== 0) return "No solution";

  let visitado: Set<string> = new Set();
  let cola: Array<
    [
      [number, number],
      {
        step: number;
        bucketX: number;
        bucketY: number;
        action: string;
        status?: string;
      }[]
    ]
  > = [[[0, 0], []]];
  let stepCounter = 0;
  //visitado.add('0,0');
  //let pasos: string[] = [];

  while (cola.length > 0) {
    let [[a, b], pasos] = cola.shift()!;

    //cuando se logra alcanzar el objetivo en alguna de las jarras, añadimos "Solved" al último paso
    if (a === z || b === z) {
      if (pasos.length > 0) {
        pasos[pasos.length - 1].status = "Solved";
      }
      return pasos;
    }

    // if (visitado.has(`${a},${b}`)) continue;
    // visitado.add(`${a},${b}`);

    //transiciones
    let posiblesMov: [[number, number], string][] = [
      [[x, b], `Llenar la jarra de ${x} galones`], // lleno jarra x
      [[a, y], `Llenar la jarra de ${y} galones`], // lleno jarra y
      [[0, b], `Vaciar la jarra de ${x} galones`], // vacio jarra x
      [[a, 0], `Vaciar la jarra de ${y} galones`], // vacio jarra y
      [
        [a - Math.min(a, y - b), b + Math.min(a, y - b)],
        `Pasar de jarra de ${x} galones a ${y} galones`,
      ], // transf jarra x a y
      [
        [a + Math.min(b, x - a), b - Math.min(b, x - a)],
        `Pasar de jarra de ${y} galones a ${x} galones`,
      ], // transf jarra y a x
    ];

    for (let [[nextA, nextB], move] of posiblesMov) {
      if (!visitado.has(`${nextA},${nextB}`)) {
        visitado.add(`${nextA},${nextB}`);
        cola.push([
          [nextA, nextB],
          [
            ...pasos,
            {
              step: pasos.length + 1,
              bucketX: nextA,
              bucketY: nextB,
              action: move,
            },
          ],
        ]);
      }
    }
  }

  return "No Solution";
};

//controlador recibe y llama a algoritmo waterBucket
export const solucion = (req: Request, res: Response): void => {
  const { x, y, z } = req.body;

  if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
    res.status(400).json({ error: "Los parametros deber ser numeros" });
    return;
  }

  if (!Number.isInteger(x) || !Number.isInteger(y) || !Number.isInteger(z)) {
    res.status(400).json({ error: "X, Y, y Z deben ser números enteros." });
    return;
  }

  if (x <= 0 || y <= 0 || z <= 0) {
    res.status(400).json({ error: "X, Y, y Z deben ser enteros positivos." });
    return;
  }

  const resultado = waterBucket(x, y, z);
  res.json({ solution: resultado });
};
