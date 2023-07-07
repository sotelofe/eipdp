export class ListaFlujoUno{
    constructor(
        public  idFlujo:number,
        public  idUsuario:number,
        public  flujo:number,
        public  folio:string,
        public  etapa:string,
        public  fecha:string,
        public  activo:string,
        public  usuario:string,
        public  idColor:number,
        public  tuvoRia:boolean,
        public  tuvoRiaNoPresentada:boolean,
        public  tieneRiesgos:boolean,
        public  tieneRecomendaciones:boolean,
        public  idEtapa:number,
        public  tieneRiaNoPresentada:boolean,
        public  tramite:string,
        public  permiteAcuerdo:number,
        public  idColorRia:number,
    ){ }
}