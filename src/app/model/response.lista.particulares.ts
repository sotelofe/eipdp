import { ListaParticular } from "./lista.particular"

export class ResponseListaParticulares{
    constructor(
        public estatus:string,
	    public mensaje:string,
        public listaParticular:ListaParticular[],
    ){}
}