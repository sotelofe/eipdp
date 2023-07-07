import { UploadF } from './upload';

export class Preconsulta{
    constructor(
        public radioPreconsulta:string,
        public radioPreconsultab:string,
        public radioPreconsultaeg1:string,
        public radioPreconsultaeg2:string,
        public radioPreconsultaf:string,
        public upload1:UploadF,
        public radioConsulta1:string,
        public radioConsulta2:string,
        public radioConsulta31:string,
        public radioConsulta32:string,
        public radioConsulta4:string,
        public radioConsulta51:string,
        public radioConsulta52:string,
        public radioConsulta53:string,
        public radioConsulta6:string,
        public informacionAdicional:string,
        public hipervinculo:string,
        public upload2:UploadF,
        public relevante:string,
        public nombre:string,
        public cargo:string,
        public unidad:string,
        public correo:string,
        public telefono:string,
        public upload3:UploadF,
        public desGenAdi:string,
        public desGenAne:string,
        public idUsuario:number,
    ){}
}