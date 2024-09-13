import { Request, Response } from "express";

//calculo del maximo comun divisor
const maximoCD = (a: number, b: number) : number => {
    return b === 0 ? a : maximoCD(b, a % b);
};

//algoritmo
const waterBucket = (x: number, y:number, z:number) : string[] | string  => {

    //opciones sin solucion
    if (z > Math.max(x, y)) return 'No solution'
    if (z % maximoCD(x, y) !== 0) return 'No solution'

    let visitado = new Set<string>();
    let cola : [number, number][] = [[0, 0]]; 
    let pasos: string[] = [];

    while (cola.length > 0) {
        let [a, b] = cola.shift()!;

        //cuando se logra alcanzar el objetivo en alguna de las jarras
        if (a === z || b === z) {
            return pasos;
        }

        if (visitado.has(`${a}, ${b}`)) continue;
        visitado.add(`${a}, ${b}`);
    
        //transiciones
        let posiblesMov: [number, number][] = [
            [x, b], // lleno jarra x
            [a, y], // lleno jarra y
            [0, b], // vacio jarra x
            [a, 0], // vacio jarra y
            [a + Math.min(b, x - a), b - Math.min(b, x - a)], // transf jarra y a x
            [a - Math.min(a, y - b), b + Math.min(a, y - b)], // transf jarra x a y
        ];

    }

    return 'No Solution';
}

//controlador recibe y llama a waterBucket
export const solucion = (req: Request, res: Response): void => {
    const {x, y, z} = req.body;

    if( typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
        res.status(400).json( {error: 'Los parametros deber ser numeros'} );
        return;
    }

    const resultado = waterBucket(x, y, z);
    res.json( { pasos: resultado} )
};
