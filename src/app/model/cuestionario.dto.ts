export class CuestionarioDTO{

    constructor(
        public idCuestionario:number,
	    public folio:string,
	    public pregunta:number,
	    public subpregunta:number,
	    public respuesta:string,
	    public rutaArchivo:string,
	    public activo:string,
    ){}

}