export class MenuDTO{
    constructor(
        public  idMenu:number,
        public  idPerfil:number,
        public  menu:string,
        public  menuNav:string,
        public  descMenu:string,
        public  estatus:string
    ){ }
}