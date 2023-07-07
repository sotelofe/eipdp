export class UsuarioDTO  {
    
    constructor(
        public  idUsuario:number,
        public  idPerfil:number,
        public  sujetoObligado:string,
        public  nombreServidorPublico:string,
        public  cargoServidorPublico:string,
        public  usuario:string,
        public  contrasena:string,
        public  emailInstitucional:string,
        public  telefono:string,
        public  extensionTelefono:string,
        public  celular:string,
        public  activo:string,
    ){}
}