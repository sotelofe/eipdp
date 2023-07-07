import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Preconsulta } from '../model/preconsulta';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, RequiredValidator } from '@angular/forms';
import { jsonpFactory } from '@angular/http/src/http_module';
import { Archivo } from '../model/archivo';
import { UploadF } from '../model/upload';
import { ToastrService } from 'ngx-toastr';
import { FlujoService } from '../services/flujos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResponseUsuario } from '../model/responseusuario';
import { UsuarioDTO } from '../model/usuario';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { SesionService } from '../services/sesion.service';
import { ResponseLogin } from '../model/responselogin';
import { RecuperarUsuario } from '../model/recupera';
import { CuestionarioDTO } from '../model/cuestionario.dto';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DescargaService } from '../services/descarga.service';
import { AceptarFUno } from '../model/aceptarf1';
import { RutaUtilService } from '../services/ruta.util.service';

@Component({
  selector: 'app-cuestionariorevisorfuno',
  templateUrl: './cuestionariorevisorfuno.component.html',
  styleUrls: ['./cuestionariorevisorfuno.component.scss']
})
export class CuestionariorevisorfunoComponent implements OnInit, AfterViewInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  @ViewChild('frameria', { static: true }) frameria: ModalDirective;

  public formPreconsulta:CuestionarioDTO[];
  public form:Preconsulta;
  public formAprobar: FormGroup;
  public formRIA: FormGroup;
  public faDownload = faDownload;
  public up1:string;
  public up2:string;
  public up3:string;
  public folioConsultafUno:string;
  public acceptarFuno:AceptarFUno;
  public upload1:UploadF;
  public responseAceptar:ResponseUsuario;
  public user:UsuarioDTO[];
  public usuario:ResponseLogin;
  public acceptarFdos:AceptarFUno;
  public upload2:UploadF;
  public botones:boolean=false;

  cuu = false;
  cud = false;
  cut = false;
  template = true;

  cdu = false;
  cdd = false;
  cdt = false;
  templated = true;

  ctu = false;
  ctd = false;
  ctt = false;
  ctc = false;
  ctci = false;
  cts = false;
  templatet = true;

  ccu = false;
  ccd = false;
  cct = false;


  cciu = false;
  ccid = false;
  ccit = false;

  ccic = false;
  ccici = false;
  ccis = false;

  ccisi = false;
  ccio = false;
  ccin = false;

  csu = false;
  csd = false;
  cst = false;

  public barchivoUno:boolean;
  public barchivoDos:boolean;
 
  
  constructor(
    private _router: Router,
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private flujoService: FlujoService,
    private spinner: NgxSpinnerService,
    private serviceSesion:SesionService,
    private serviceDescarga:DescargaService,
    private rutaService:RutaUtilService
  ) { 
    this.formPreconsulta = new Array();
    this.form = new Preconsulta("","","","","",null,"","","","","","","","","","","",null,"","","","","","",null,"","",0);
    this.up1="";
    this.up2="";
    this.up3="";
    this.createForm();
    this.upload1 = new UploadF("","","");
    this.acceptarFuno = new AceptarFUno("","",this.upload1);
    this.upload2 = new UploadF("","","");
    this.acceptarFdos = new AceptarFUno("","",this.upload2);
    this.user = new Array();
    this.responseAceptar = new ResponseUsuario(this.user,"","");
    this.barchivoUno = false;
    this.barchivoDos = false;
    this.usuarioLogueado()
    let origen = sessionStorage.getItem("origenhistorico");
    if(origen!=null){
      this.botones = true;
    }
  }
  ngAfterViewInit(): void {
    this.folioConsultafUno = sessionStorage.getItem("folioConsultafUno");
    this.precargaCuestionario(this.folioConsultafUno);
  }

  ngOnInit(): void {
   
  }

  usuarioLogueado(){
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
  }

  precargaCuestionario(folio:string){
    var obj = new RecuperarUsuario(folio);

    this.spinner.show();
    
          this.flujoService.obtenerDetalleCuestionarioFlujo1(obj).subscribe(
            result => {
              this.formPreconsulta = result;
              console.log(this.formPreconsulta);
              if (this.formPreconsulta !=null ) {
                this.iniciaPrecarga( this.formPreconsulta);
              
            } else {
              this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }

              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            },(error:any)=>{

            }
          );
  }

  iniciaPrecarga(con:CuestionarioDTO[]){
    con.forEach((c)=>{
     
      if(c.pregunta!=null){
          if(c.pregunta == 1 && c.subpregunta == null){
            this.form.radioPreconsulta = c.respuesta;
          }

          if(c.pregunta == 1 && c.subpregunta == 1){
            this.form.radioPreconsultab = c.respuesta;
          }
          
          if(c.pregunta == 1 && c.subpregunta == 2){
            this.form.radioPreconsultaeg1 = c.respuesta;
          }
          
          if(c.pregunta == 1 && c.subpregunta == 3){
            this.form.radioPreconsultaeg2 = c.respuesta;
          }

          if(c.pregunta == 1 && c.subpregunta == 4){
            this.form.radioPreconsultaf = c.respuesta;
          }

          if(c.pregunta == 1 && c.subpregunta == 5){
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.up1 = nombreArchivo;
            let upu = new UploadF(nombreArchivo ,"","");
            this.form.upload1 = upu;
          }

          if(c.pregunta == 2 && c.subpregunta == null){
            console.log("entra");
            console.log("c.respuesta: "+ c.respuesta);
            this.cuu = false;
            if(c.respuesta === "Si" ){
              this.cuu = true;
            }else if(c.respuesta === "No" ){
              this.cud = true;
            }else if(c.respuesta === "No aplica" ){
              this.cut = true;
            }
          }

          if(c.pregunta == 2 && c.subpregunta == 2){
            this.form.hipervinculo = c.respuesta;
          }

          if(c.pregunta == 2 && c.subpregunta == 3){
            if(c.respuesta === "Principales"){
              this.cdu = true;
            }else if(c.respuesta === "Secundarias"){
              this.cdd = true;
            }else if(c.respuesta === "Ambas"){
              this.cdt = true;
            }
          }

          if(c.pregunta == 2 && c.subpregunta == 4){
            if(c.respuesta === "Por categoría"){
              this.ctu = true;
            }else if(c.respuesta === "Por dato"){
              this.ctd = true;
            }else if(c.respuesta === "Ambas"){
              this.ctt = true;
            }
          }

          if(c.pregunta == 2 && c.subpregunta == 5){
            if(c.respuesta === "Si"){
              this.ctc = true;
            }else if(c.respuesta === "No"){
              this.ctci = true;
            }else if(c.respuesta === "No aplica"){
              this.cts = true;
            }
          }

          if(c.pregunta == 2 && c.subpregunta == 6){
            if(c.respuesta === "Si"){
              this.ccu = true;
            }else if(c.respuesta === "No"){
              this.ccd = true;
            }else if(c.respuesta === "No aplica"){
              this.cct = true;
            }
          }

          if(c.pregunta == 2 && c.subpregunta == 7){
            if(c.respuesta === "Si"){
              this.cciu = true;
            }else if(c.respuesta === "No"){
              this.ccid = true;
            }else if(c.respuesta === "No aplica"){
              this.ccit = true;
            }
          }

          if(c.pregunta == 2 && c.subpregunta == 8){
            if(c.respuesta === "Nacionales"){
              this.ccic = true;
            }else if(c.respuesta === "Internacionales"){
              this.ccici = true;
            }else if(c.respuesta === "Ambas"){
              this.ccis = true;
            }
          }

          if(c.pregunta == 2 && c.subpregunta == 9){
            if(c.respuesta === "Sector público"){
              this.ccisi = true;
            }else if(c.respuesta === "Sector privado"){
              this.ccio = true;
            }else if(c.respuesta === "Ambos"){
              this.ccin = true;
            }
          }

          if(c.pregunta == 2 && c.subpregunta == 10){
            if(c.respuesta === "Si"){
              this.csu = true;
            }else if(c.respuesta === "No"){
              this.csd = true;
            }else if(c.respuesta === "No aplica"){
              this.cst = true;
            }
          }

          if(c.pregunta == 2 && c.subpregunta == 11){
            this.form.informacionAdicional = c.respuesta;
          }

          if(c.pregunta == 3 && c.subpregunta == 1){
            this.form.nombre = c.respuesta;
          }

          if(c.pregunta == 3 && c.subpregunta == 2){
            this.form.cargo = c.respuesta;
          }

          if(c.pregunta == 3 && c.subpregunta == 3){
            this.form.unidad = c.respuesta;
          }

          if(c.pregunta == 3 && c.subpregunta == 4){
            this.form.correo = c.respuesta;
          }

          if(c.pregunta == 3 && c.subpregunta == 5){
            this.form.telefono = c.respuesta;
          }

          if(c.pregunta == 4 && c.subpregunta == 1){
            this.form.desGenAdi = c.respuesta;
          }

          if(c.pregunta == 4 && c.subpregunta == 2){
            this.form.desGenAne = c.respuesta;
          }

          if(c.pregunta == 2 && c.subpregunta == 12){
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.up2 = nombreArchivo;
            
          }

          if(c.pregunta == 4 && c.subpregunta == 3){
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.up3 = nombreArchivo;
            
          }
      }
    });
  }

  descargaAutoevaluacion(pregunta){
    this.serviceDescarga.descargaDocumento(this.up1,1, this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }

  descargaCueUno(pregunta){
    this.serviceDescarga.descargaDocumento(this.up2,1,this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }

  descargaCueDos(pregunta){
    this.serviceDescarga.descargaDocumento(this.up3,1, this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }

  
  navegaBandeja(){
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/'+dash]);
    
    }
  }

  descargaCuestionarioF1(){
    this.serviceDescarga.descargaCuestionarioF1(this.folioConsultafUno);
  }

  
  createForm() {
    this.formAprobar = this.fb.group({
      aprobar:['', Validators.required],
    });

    this.formRIA = this.fb.group({
      docria:['', Validators.required],
    });

  }
  
  
  onFileChange(event) {
    let reader = new FileReader();
    this.acceptarFuno.upload.filename="";
    

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoUno = false;
      return;
    }

    const size = event.srcElement.files[0].size;
   
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.acceptarFuno.upload.filename = file.name;
      this.acceptarFuno.upload.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formAprobar.get('aprobar').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

   

    if(size == 0 || size > 2097152){
      this.toastr.warning('El archivo no puede exceder los 2 megas', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoUno = false;
      this.acceptarFuno.upload.filename="";
     
    }else if(this.acceptarFuno.upload.filetype != 'application/pdf'){
      this.toastr.warning('La extensión permitida para los archivos es .pdf, favor de revisar', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoUno = false;
      this.acceptarFuno.upload.filename="";
    }else{
      this.barchivoUno = true;
    }

  }

  onFileChange2(event) {
    let reader = new FileReader();
    this.acceptarFdos.upload.filename="";
    

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoDos = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.acceptarFdos.upload.filename = file.name;
      this.acceptarFdos.upload.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formRIA.get('docria').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoDos = false;
      this.acceptarFdos.upload.filename="";
     
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoDos = false;
      this.acceptarFdos.upload.filename="";
    }else{
      this.barchivoDos = true;
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
                              
  aceptarCuestionario(){
    this.frameOk.show();
  }
  
  aceptar(){
    
    //this.acceptarFuno.upload = this.formAprobar.value.aprobar;
    this.acceptarFuno.folio = this.folioConsultafUno;
    this.acceptarFuno.email = this.usuario.usuario.emailInstitucional;

    if(this.barchivoUno){
      this.acceptarFuno.upload = this.formAprobar.value.aprobar;
    }else{
      this.acceptarFuno.upload = new UploadF("","","");
    }

    this.spinner.show();
        this.flujoService.aceptarCuestionarioUno( this.acceptarFuno).subscribe(
          result => {

            this.responseAceptar = result;
                if (this.responseAceptar !=null ) {
                    if(this.responseAceptar.estatus === "ok"){
                      this.toastr.success('El cuestionario con folio: '+ this.folioConsultafUno +', se ha aceptado de forma correcta', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
                    }else if(this.responseAceptar.estatus === "fail"){
                      this.frameFail.show();
                    }else{
                      this.toastr.warning('No se pudo aceptar el cuestionario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                    }
                  } else {
                  this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }

                setTimeout(() => {
                  this.spinner.hide();
                  this.navegaBandeja();
                }, 1000);
            
          },(error: any) => {
            var errorMensaje = <any>error;
            this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
          }
        );
      
  }
  
  riaCuestionario(){
    this.frameria.show();
  }

  ria(){
    //this.acceptarFdos.upload = this.formRIA.value.docria;
    this.acceptarFdos.folio = this.folioConsultafUno;
    this.acceptarFdos.email = this.usuario.usuario.emailInstitucional;
  
    if(this.barchivoDos){
      this.acceptarFdos.upload = this.formRIA.value.docria;
    }else{
      this.acceptarFdos.upload = new UploadF("","","");
    }

    this.spinner.show();
    this.flujoService.riaCuestionarioUno( this.acceptarFdos).subscribe(
      result => {

        this.responseAceptar = result;
            if (this.responseAceptar !=null ) {
                if(this.responseAceptar.estatus === "ok"){
                  this.toastr.success('Se ha solicitado información adicional al folio: '+ this.folioConsultafUno , '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
                }else if(this.responseAceptar.estatus === "fail"){
                  this.frameFail.show();
                }else{
                  this.toastr.warning('No se pudo solicitar información al cuestionario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }
              } else {
              this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }

            setTimeout(() => {
              this.spinner.hide();
              this.navegaBandeja();
            }, 1000);
        
      },(error: any) => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );
    
  }

  navegaHistorico(){
    this._router.navigate(['/historico']); 
  }

  regresar(){
    let retorno = sessionStorage.getItem("dashboard");
    this._router.navigate(['/'+retorno]); 
  }

}
