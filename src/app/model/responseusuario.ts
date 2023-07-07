import { UsuarioDTO } from './usuario';
import { MenuDTO } from './menu';
import { Respuesta } from './respuesta';

export class ResponseUsuario extends Respuesta{
    constructor(
        public usuario: UsuarioDTO[],
        public estatus:string,
        public mensaje:string,
    ){
        super(estatus,mensaje);
    }

}