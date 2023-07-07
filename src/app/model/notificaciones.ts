import { UploadF } from "./upload";

export class NotificacionesDTO  {
    
    constructor(
        public  idNotificacion:number,
        public  idUsuario:number,
        public  idPerfil:number,
        public  folio:string,
        public  asunto:string,
        public  mensaje:string,
        public  respuesta:string,
        public  idEstatus:number,
        public  idUsuarioPara:number,
        public  rutaSolicitud:string,
        public  rutaRespuesta:string,
        public  activo:string,
        public  fecha:string,
        public  hora:string,
        public  para:string,
        public  upload:UploadF,
        public  ipara:number,
        public  de:string,
        public  tipoMensaje:string,
    ){}
}