export class UsuarioAlta  {
    
    constructor(
        public  sujetoObligado:string,
        public  nombreServidorPublico:string,
        public  cargoServidorPublico:string,
        public  usuario:string,
        public  contrasena:string,
        public  repetirContrasena:string,
        public  emailInstitucional:string,
        public  telefono:string,
        public  extensionTelefono:string,
        public  celular:string,
    ){}
}