import { UsuarioDTO } from './usuario';
import { MenuDTO } from './menu';
import { Respuesta } from './respuesta';

export class ResponseLogin extends Respuesta{
    constructor(
        public usuario:UsuarioDTO,
        public descPerfil:string,
        public listaMenus:MenuDTO[],
        public estatus:string,
        public mensaje:string,
    ){
        super(estatus,mensaje);
    }

}