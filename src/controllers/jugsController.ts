import { Request, Response } from "express";

//calculo del maximo comun divisor
const maximoCD = (a: number, b: number) : number => {
    return b === 0 ? a : maximoCD(b, a % b);
};

//algoritmo
const waterBucket = (x: number, y:number, z:number) : string[] | string  => {

    //opciones sin solucion
    if (z > Math.max(x, y)) return 'No solution z mayor'
    if (z % maximoCD(x, y) !== 0) return 'No solution no divisor'

    let visitado: Set<string> = new Set();
    let cola : Array<[[number, number], string[]]> = [[[0, 0], []]]; 
    //visitado.add('0,0');
    //let pasos: string[] = [];


    while (cola.length > 0) {
        let [[a, b], pasos] = cola.shift()!;

        //cuando se logra alcanzar el objetivo en alguna de las jarras
        if (a === z || b === z) {
            pasos.push('se logró el objetivo')
            return pasos;
        }

        // if (visitado.has(`${a},${b}`)) continue;
        // visitado.add(`${a},${b}`);
    
        //transiciones
        let posiblesMov: [[number, number], string][] = [
            [[x, b], ` [${x}, ${b}]: Llenar la jarra de ${x} galones`], // lleno jarra x
            [[a, y], ` [${a}, ${y}]: Llenar la jarra de ${y} galones`], // lleno jarra y
            [[0, b], ` [${0}, ${b}]: Vaciar la jarra de ${x} galones`], // vacio jarra x
            [[a, 0], ` [${a}, ${0}]: Vaciar la jarra de ${y} galones`], // vacio jarra y
            [[a - Math.min(a, y - b), b + Math.min(a, y - b)], ` [${a - Math.min(a, y - b)}, ${b + Math.min(a, y - b)}]: Transferir de jarra de ${x} galores a ${y} galones`], // transf jarra x a y
            [[a + Math.min(b, x - a), b - Math.min(b, x - a)], ` [${a + Math.min(b, x - a)}, ${b - Math.min(b, x - a)}]: Transferir de jarra de ${y} galores a ${x} galones`] // transf jarra y a x
        ];

        for (let [[nextA, nextB], move] of posiblesMov) {
            if (!visitado.has(`${nextA},${nextB}`)) {
                visitado.add(`${nextA},${nextB}`);
                cola.push([[nextA, nextB], [...pasos, move]]);
            }
        }
    }

    return 'No Solution';
};

//controlador recibe y llama a algoritmo waterBucket
export const solucion = (req: Request, res: Response): void => {
    const {x, y, z} = req.body;

    if( typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
        res.status(400).json( {error: 'Los parametros deber ser numeros'} );
        return;
    }

    const resultado = waterBucket(x, y, z);
    res.json( { pasos: resultado} )
};
