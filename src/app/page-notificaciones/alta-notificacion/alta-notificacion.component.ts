import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotificacionesDTO } from '../../model/notificaciones';
import { ResponseLogin } from '../../model/responselogin';
import { UploadF } from '../../model/upload';
import { NotificacionesService } from '../../services/notificacion.service';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-alta-notificacion',
  templateUrl: './alta-notificacion.component.html',
  styleUrls: ['./alta-notificacion.component.scss']
})
export class AltaNotificacionComponent implements OnInit {
  @ViewChild('frameAlta', { static: true }) frameAlta: ModalDirective;
  @ViewChild('para') para!: ElementRef;
  public sexpediente:string="";
  public sorigen:string="";
  public sasunto:string="";
  public smensaje:string="";
  public spara:string="";
  public upload:UploadF;
  public retorno:number; 
  public notificaciones:NotificacionesDTO;
  public usuarioSesion:ResponseLogin;
  public isReadonly:boolean;
  public selectedPara="";
  public listaNotificaciones:NotificacionesDTO[];
  public mostrarSelect:boolean=true;

  constructor(private toastr: ToastrService, 
              private _router: Router,
              private usuarioService:SesionService,
              private notiService:NotificacionesService,
              private spinner: NgxSpinnerService,
              private serviceSesion: SesionService,) { }

  ngOnInit(): void {
    this.upload = new UploadF("","","");  
    this.notificaciones = new NotificacionesDTO(null,null,null,'','','','',null,null,'','','',"","","",null,null,"","");
    this.recuperarDatos();

    this.serviceSesion.sesionVista("notificaciones");
    sessionStorage.setItem("navVis","/notificaciones");
  }

  recuperarDatos(){
    this.usuarioSesion = this.usuarioService.obtenerSesionUsuario();
    this.sorigen = this.usuarioSesion.usuario.usuario;
    this.sexpediente =  sessionStorage.getItem("folioNavegacion");
    this.retorno = Number(sessionStorage.getItem("retornoNotificacion"));  

    console.log(this.sexpediente);
    if(this.sexpediente!=null){
      this.isReadonly =true;
    }else{
      this.isReadonly =false;
    }
    console.log(this.isReadonly);

    if((this.sexpediente ==null || this.sexpediente == "") && this.usuarioSesion.usuario.idPerfil == 1){
      this.cargaUsuarios();
    }else if((this.sexpediente != null || this.sexpediente != "") && this.usuarioSesion.usuario.idPerfil == 1){
      this.mostrarSelect = false;
      let notifica = new NotificacionesDTO(null,null,null,this.sexpediente,'','','',null,null,'','','',"","","",null,null,"","");
      this.notiService.getUsuarioPorFolio(notifica).subscribe(
        result=>
        {
          console.log("res:"+result);
          this.selectedPara= result.notificaciones[0].para;          
        }
      );

    }else{
      this.cargaAdministradores();
    }
  }

  cargaAdministradores(){
    this.listaNotificaciones = new Array();

    this.notiService.getAdministradores().subscribe(
      result=>{
            console.log(result);
            this.listaNotificaciones=result.notificaciones;

            if (this.listaNotificaciones !=null ) {                                
          
            }           
      }
    );
  }

  cargaUsuarios(){
    this.listaNotificaciones = new Array();

    this.notiService.getUsuarios().subscribe(
      result=>{
            console.log(result);
            this.listaNotificaciones=result.notificaciones;

            if (this.listaNotificaciones !=null ) {                                
          
            } 
          
      }
    );
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
    if(this.retorno==1){
      let dash = sessionStorage.getItem("dashboard");
      if(dash === 'expediente'){
        this._router.navigate(['/expedientes']);
      }else{
        this._router.navigate(['/consulta']);
      
      }     
    }else if(this.retorno ==2){
      let dash = sessionStorage.getItem("dashboard");
      if(dash === 'expediente'){
        this._router.navigate(['/expedientes']);
      }else{
        this._router.navigate(['/presentacion']);      
      }
     
    }else if(this.retorno ==3){
      let dash = sessionStorage.getItem("dashboard");
      if(dash === 'expediente'){
        this._router.navigate(['/expedientes']);
      }else{
        this._router.navigate(['/exencion']);   
      }
     
    }else if(this.retorno == 4){
      this._router.navigate(['/notificaciones']);
    }
  }

  enviarMensaje(){
    if(this.validarFormulario()){     
      this.recuperarDto();
      this.spinner.show();
      console.log(this.notificaciones);
      this.notiService.altaNotificacion(this.notificaciones).subscribe(
        result=>
        {
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
  
  recuperarDto(){
    this.notificaciones.idUsuario = this.usuarioSesion.usuario.idUsuario;
    this.notificaciones.idPerfil = this.usuarioSesion.usuario.idPerfil;
    this.notificaciones.folio = this.sexpediente;
    this.notificaciones.asunto = this.sasunto;
    this.notificaciones.mensaje = this.smensaje;      
    this.notificaciones.idEstatus = 1;

    if(this.mostrarSelect==false){
      this.notificaciones.idUsuarioPara = 1;
    }else{
      this.notificaciones.idUsuarioPara = parseInt(this.selectedPara);
    }
    
    this.notificaciones.upload = this.upload;    
    console.log(this.notificaciones);    
  }

  validarFormulario(){
    
    if(this.sexpediente === null ||this.sexpediente === ''){
      return false;
    }
   
    if(this.sorigen === ''){
      return false;
    }

    
    if(this.selectedPara === ''){
          return false;
    }
    
   
    if(this.sasunto === ''){
      return false;
    }

    if(this.smensaje === ''){
      return false;
    }

    return true;
  }

  selectOpcion(){
    this.selectedPara= this.para.nativeElement.value;
    console.log(this.selectedPara);
    
  }

}
