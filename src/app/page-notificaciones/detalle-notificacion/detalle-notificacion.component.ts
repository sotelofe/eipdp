import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificacionesDTO } from '../../model/notificaciones';
import { ResponseLogin } from '../../model/responselogin';
import { UploadF } from '../../model/upload';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { Propagar } from '../../model/propagar';
import { Router } from '@angular/router';
import { NotificacionesService } from '../../services/notificacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-detalle-notificacion',
  templateUrl: './detalle-notificacion.component.html',
  styleUrls: ['./detalle-notificacion.component.scss']
})
export class DetalleNotificacionComponent implements OnInit {
  @ViewChild('frameDetalle', { static: true }) frameDetalle: ModalDirective;
  @Output() propagar = new EventEmitter<Propagar>();
  @Output() bpropagar = new EventEmitter<Boolean>();
  @ViewChild('frameAlta', { static: true }) frameAlta: ModalDirective;
  public sexpediente:string="";
  public sorigen:string="";
  public sasunto:string="";
  public smensaje:string="";
  public srespuesta:string="";
  public spara:string="";
  public upload:UploadF;
  public retorno:number; 
  public notificaciones:NotificacionesDTO;
  public usuarioSesion:ResponseLogin;
  public isReadonly:boolean;
  public faFileDownload = faFileDownload;
  public barchivosolicitud = false;
  public barchivoRespuesta = false;
  public brespuesta = false;
  public noPermitido:boolean=false;
  
  

  constructor(
    private toastr: ToastrService,
    private _router: Router,
    private notiService:NotificacionesService,
    private spinner: NgxSpinnerService,
    private usuarioService:SesionService,
  ) {    
    this.usuarioSesion = this.usuarioService.obtenerSesionUsuario();
    this.iniciaDatos();
  }

  iniciaDatos(){
    this.notificaciones = JSON.parse(sessionStorage.getItem("detalleNoti"));
    console.log(this.notificaciones);
    this.upload = new UploadF("","","");      
    this.isReadonly = true;   
    this.srespuesta = this.notificaciones.respuesta;
    

    if(this.usuarioSesion.usuario.idUsuario == this.notificaciones.idUsuario && this.usuarioSesion.usuario.idUsuario == this.notificaciones.idUsuarioPara){
      this.noPermitido = false;
    }else if(this.usuarioSesion.usuario.idUsuario == this.notificaciones.idUsuario){
      this.noPermitido = true;
    }else{
      this.noPermitido = false;
    }

    this.sorigen = this.notificaciones.de;
    this.spara = this.notificaciones.para;
    

    if(this.notificaciones.rutaSolicitud === ''){
      this.barchivosolicitud = true;
    }else{
      this.barchivosolicitud = false;
    }

    if(this.notificaciones.rutaRespuesta === ''){
      this.barchivoRespuesta = true;
    }else{
      this.barchivoRespuesta = false;
    }

    if(this.srespuesta != ''){
      this.brespuesta = true;
    }else{
      this.brespuesta = false;
    }

    
  }

  
  
  ngOnInit(): void {
    
   
  }
  
  ngAfterViewInit(): void {
    
  }


  onFileSelected(event) {
   


    if (event.target.value.length == 0) {
      event.target.value = "";
      this.upload = new UploadF("","",""); 
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name;    
     
        if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
         

          if(size == 0 || size > 10485760){
            this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
            event.target.value = ""; 
            this.upload = new UploadF("","","");                
          }else if(this.validarExtension(name)){
            this.toastr.warning('La extensión permitida para los archivos es .zip y .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
            event.target.value = "";         
            this.upload = new UploadF("","","");
          }else{
            this.recuperarDatosArchivo(file);
          }
        }                        
  }

  validarExtension(nombre:string){
    let indice = nombre.indexOf(".");
    let extension = nombre.substring(indice+1);   
    console.log(extension);
    if(extension === 'pdf' || extension ==='zip'){
      return false;
    }else{
      return true;
    }
  }

  recuperarDatosArchivo(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(file.type);
      this.upload.filename = file.name;
      this.upload.filetype = file.type;
      this.upload.value = (<string>reader.result).split(',')[1];
    };
    console.log(this.upload.filename);
    console.log(this.upload.filetype);
    console.log(this.upload.value);
  }


  
  regresar(){
    this._router.navigate(['/notificaciones']);
  }

  enviarMensaje(){
    this.notificaciones.respuesta = this.srespuesta;
    this.notificaciones.upload = this.upload;
    console.log(this.srespuesta);
    if(this.srespuesta != ''){
      this.spinner.show();
      this.notiService.respondeNotificaciones(this.notificaciones).subscribe(
        result=>{
          setTimeout(() => {
            this.spinner.hide();
            this.frameAlta.show();
            this._router.navigate(['/notificaciones']);
          }, 1000);
        }
      );
    }else{
      this.toastr.warning('Favor de introducir todos los campos obligatorios marcados con *', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
    }
  }
 

  descargarNotificacion(ruta:string){
    while(ruta.indexOf("/") != -1){
      ruta = ruta.replace("/","-");
    }
    
    this.notiService.descargaNotificacion(ruta);
  }



}
