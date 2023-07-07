export class ManualesDTO{

    constructor(
		public  idManual:number,
		public  idSubManual:number,
		public  valor:string,
		public  clave:string,
		public  grupo:number,
		public  orden:number,
		public  tipo:number,
		public  descripcion:string,
		public  activo:string
    ){}

}