import { TratamientoGeneral } from "./tratamiento.general";
import { TratamientoParticular } from "./tratamiento.particular";

export class Tratamiento{

    constructor(
        public general:TratamientoGeneral,
        public particular:TratamientoParticular
    ){}
}