import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponseLogin } from '../model/responselogin';
import { DescargaService } from '../services/descarga.service';
import { SesionService } from '../services/sesion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlujoService } from '../services/flujos.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecuperarUsuario } from '../model/recupera';
import { CuestionarioDTO } from '../model/cuestionario.dto';
import { Presentacion } from '../model/presentacion';
import { Servidor } from '../model/servidor';
import { TipoTratamiento } from '../model/tipo.tratamiento';
import { FormaRecaban } from '../model/forma.recaban';
import { UploadF } from '../model/upload';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AceptarFUno } from '../model/aceptarf1';
import { ResponseUsuario } from '../model/responseusuario';
import { UsuarioDTO } from '../model/usuario';
import { RutaUtilService } from '../services/ruta.util.service';
import { Tratamiento } from '../model/tratamientos';
import { TratamientoGeneral } from '../model/tratamiento.general';
import { ListaParticular } from '../model/lista.particular';
import { TratamientoParticular } from '../model/tratamiento.particular';
import { ModalsComponent } from '../modals/modals.component';
import { Constantes } from '../global/constantes';

@Component({
  selector: 'app-cuestionariorevisorfdos',
  templateUrl: './cuestionariorevisorfdos.component.html',
  styleUrls: ['./cuestionariorevisorfdos.component.scss']
})
export class CuestionariorevisorfdosComponent implements OnInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  @ViewChild('frameria', { static: true }) frameria: ModalDirective;
  @ViewChild('frameModalAviso', { static: true }) frameModalAviso: ModalDirective;  

  faDownload = faDownload;
  public formPreconsulta:CuestionarioDTO[];
  public formAprobar: FormGroup;
  public formRIA: FormGroup;
  public folioConsultafUno:string;
  public usuario:ResponseLogin;
  public formPresentacion:Presentacion;
  public listaServidor:Servidor[];
  public tipoTratamiento:TipoTratamiento;
  public formaRecaban:FormaRecaban;
  public archivo1:UploadF;
  public archivo2:UploadF;
  public archivo3:UploadF;
  public archivo4:UploadF;
  public archivo5:UploadF;
  public archivo6:UploadF;
  public archivo7:UploadF;
  public archivo8:UploadF;
  public up1:string;
  public up2:string;
  public up3:string;
  public up4:string;
  public up5:string;
  public up6:string;
  public up7:string;
  public up8:string;
  public acceptarFuno:AceptarFUno;
  public acceptarFdos:AceptarFUno;
  public upload1:UploadF;
  public upload2:UploadF;
  public barchivoUno:boolean;
  public barchivoDos:boolean;
  public responseAceptar:ResponseUsuario;
  public user:UsuarioDTO[];
  public general:TratamientoGeneral={checkGeneral:false,valGeneral:''};
  public listaPar:ListaParticular[]=[];
  public particular:TratamientoParticular={checkParticular:false,lista:this.listaPar};
  public tratamiento:Tratamiento={general:this.general,particular:this.particular};
  public mensaje = '';
  public botones:boolean=false;

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
    this.listaServidor = new Array();
    this.tipoTratamiento = new TipoTratamiento("","","","","","","");
    this.formaRecaban = new FormaRecaban("","","");
    this.archivo1 = new UploadF("","","");
    this.archivo2 = new UploadF("","","");
    this.archivo3 = new UploadF("","","");
    this.archivo4 = new UploadF("","","");
    this.archivo5 = new UploadF("","","");
    this.archivo6 = new UploadF("","","");
    this.archivo7 = new UploadF("","","");
    this.archivo8 = new UploadF("","","");
    this.formPresentacion = new Presentacion("","","", "",this.listaServidor,"","","","","","","","","","",this.formaRecaban,"","","","","","","","","","","","",this.tipoTratamiento,"","","","","","","","","","","","","","","","","","","","","","","","",this.archivo1,this.archivo2,this.archivo3,this.archivo4,this.archivo5,this.archivo6,this.archivo7,this.archivo8,0,this.tratamiento);
    this.up1="";
    this.up2="";
    this.up3="";
    this.up4="";
    this.up5="";
    this.up6="";
    this.up7="";
    this.up8="";
    this.createForm();
    this.upload1 = new UploadF("","","");
    this.acceptarFuno = new AceptarFUno("","",this.upload1);
    this.upload2 = new UploadF("","","");
    this.acceptarFdos = new AceptarFUno("","",this.upload2);
    this.barchivoUno = false;
    this.barchivoDos = false;
    this.user = new Array();
    this.responseAceptar = new ResponseUsuario(this.user,"","");
    this.usuarioLogueado()
    let origen = sessionStorage.getItem("origenhistorico");
    if(origen!=null){
      this.botones = true;
    }
   }

   createForm() {
    this.formAprobar = this.fb.group({
      aprobar:['', Validators.required],
    });

    this.formRIA = this.fb.group({
      docria:['', Validators.required],
    });

  }

  ngAfterViewInit(): void {
    this.folioConsultafUno = sessionStorage.getItem("folioConsultafDos");
    this.precargaCuestionario(this.folioConsultafUno);
    
  }

  ngOnInit(): void {
    this.serviceSesion.validarInicioSesion();
  }

  usuarioLogueado(){
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
  }

  precargaCuestionario(folio:string){
    console.log("comienza la precarga");
    console.log("comienza" + folio);

    var obj = new RecuperarUsuario(folio);

    this.spinner.show();
    
          this.flujoService.obtenerDetalleCuestionarioFlujo2(obj).subscribe(
            result => {
              this.formPreconsulta = result;
             
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
    var ind = 0;
    var servidor= new Servidor("","");
    con.forEach((c)=>{
      if(c.pregunta!=null){

        if(c.pregunta == 1 && c.subpregunta == null){
          this.formPresentacion.denominacion = c.respuesta;
        }

        if(c.pregunta == 2 && c.subpregunta == 1){
          this.formPresentacion.nomPolPub = c.respuesta;
        }

        if(c.pregunta == 3 && c.subpregunta == 1){
          this.formPresentacion.objGen = c.respuesta;
        }

        if(c.pregunta == 4 && c.subpregunta == 1){
          this.formPresentacion.objEsp = c.respuesta;
        }

        
        if(c.pregunta == 5 ){
          
          if(c.rutaArchivo === 'nombre'){
            servidor.nombre = c.respuesta;
            ind = ind + 1;
          }

          if(c.rutaArchivo === 'cargo'){
            servidor.cargo = c.respuesta;
            ind = ind +1;
          }
        

          if(ind==2){
            this.formPresentacion.listaServidor.push(servidor);
            ind=0;
            servidor= new Servidor("","");
          }
        }

        if(c.pregunta == 6 && c.subpregunta == 1){
          this.formPresentacion.objetivosGenerales = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 2){
          this.formPresentacion.objetivosEspecificos = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 3){
          this.formPresentacion.objetivosLegal = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 4){
          this.formPresentacion.hipervinculo = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 5){
          this.formPresentacion.categorias = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 6){
          this.formPresentacion.grupVul = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 7){
          this.formPresentacion.datPerTra = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 8){
          this.formPresentacion.datPerSen = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 9){
          this.formPresentacion.finTra = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 10){
          this.formPresentacion.nuProTra = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 11){
          this.formPresentacion.viDePro = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 12){
          this.formPresentacion.formaRecaban.personal = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 13){
          this.formPresentacion.formaRecaban.directa = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 14){
          this.formPresentacion.formaRecaban.indirecta = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 15){
          this.formPresentacion.fuProDat = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 16){
          this.formPresentacion.traDatPer = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 17){
          this.formPresentacion.tipTraDatPer = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 18){
          this.formPresentacion.secTraDatPer = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 19){
          this.formPresentacion.tieDurTra = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 20){
          this.formPresentacion.intRel = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 21){
          this.formPresentacion.medSeg = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 22){
          this.formPresentacion.infoAdi = c.respuesta;
        }

        if(c.pregunta == 7 && c.subpregunta == 1){
          this.formPresentacion.susIdo = c.respuesta;
        }

        if(c.pregunta == 7 && c.subpregunta == 2){
          this.formPresentacion.proEst = c.respuesta;
        }

        if(c.pregunta == 7 && c.subpregunta == 3){
          this.formPresentacion.equFun = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 1){
          this.formPresentacion.checkTipoTratamiento.obtencion = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 2){
          this.formPresentacion.checkTipoTratamiento.aprovechamiento = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 3){
          this.formPresentacion.checkTipoTratamiento.explotacion = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 4){
          this.formPresentacion.checkTipoTratamiento.almacenamiento = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 5){
          this.formPresentacion.checkTipoTratamiento.conservacion = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 6){
          this.formPresentacion.checkTipoTratamiento.supresion = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 7){
          this.formPresentacion.checkTipoTratamiento.otra = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 8){
          this.formPresentacion.otroTratamiento = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 9){
          this.formPresentacion.fueInt = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 10){
          this.formPresentacion.areGruPer = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 11){
          this.formPresentacion.traEnc = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 12){
          this.formPresentacion.serNub = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 13){
          this.formPresentacion.traResp = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 14){
          this.formPresentacion.traRespSec = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 15){
          this.formPresentacion.plaConAlm = c.respuesta;
        }

        if(c.pregunta == 8 && c.subpregunta == 16){
          this.formPresentacion.tecUti = c.respuesta;
        }

        if(c.pregunta == 9 && c.subpregunta == 1){
          this.formPresentacion.ideDes = c.respuesta;
        }

        if(c.pregunta == 9 && c.subpregunta == 2){
          this.formPresentacion.ponCuan = c.respuesta;
        }

        if(c.pregunta == 9 && c.subpregunta == 3){
          this.formPresentacion.medCon = c.respuesta;
        }

        if(c.pregunta == 10 && c.subpregunta == 1){
          this.formPresentacion.cumPri = c.respuesta;
        }

        if(c.pregunta == 10 && c.subpregunta == 2){
          this.formPresentacion.cumDeb = c.respuesta;
        }

        if(c.pregunta == 10 && c.subpregunta == 3){
          this.formPresentacion.cumEsp = c.respuesta;
        }

        if(c.pregunta == 10 && c.subpregunta == 4){
          this.formPresentacion.vinEje = c.respuesta;
        }

        if(c.pregunta == 11 && c.subpregunta == 1){
          this.formPresentacion.conExt = c.respuesta;
        }

        if(c.pregunta == 12 && c.subpregunta == 1){
          this.formPresentacion.reaOpi = c.respuesta;
        }

        if(c.pregunta == 13 && c.subpregunta == 1){
          this.formPresentacion.descGen = c.respuesta;
        }

        if(c.pregunta == 13 && c.subpregunta == 2){
          this.formPresentacion.descAne = c.respuesta;
        }

        if(c.pregunta == 6 && c.subpregunta == 23){
          var rutaArchivo = c.rutaArchivo.split("/");
          var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
          this.up1 = nombreArchivo;
        }

        if(c.pregunta == 7 && c.subpregunta == 4){
          var rutaArchivo = c.rutaArchivo.split("/");
          var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
          this.up2 = nombreArchivo;
        }

        if(c.pregunta == 8 && c.subpregunta == 17){
          var rutaArchivo = c.rutaArchivo.split("/");
          var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
          this.up3 = nombreArchivo;
        }

        if(c.pregunta == 9 && c.subpregunta == 4){
          var rutaArchivo = c.rutaArchivo.split("/");
          var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
          this.up4 = nombreArchivo;
        }

        if(c.pregunta == 10 && c.subpregunta == 5){
          var rutaArchivo = c.rutaArchivo.split("/");
          var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
          this.up5 = nombreArchivo;
        }

        if(c.pregunta == 11 && c.subpregunta == 2){
          var rutaArchivo = c.rutaArchivo.split("/");
          var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
          this.up6 = nombreArchivo;
        }

        if(c.pregunta == 12 && c.subpregunta == 2){
          var rutaArchivo = c.rutaArchivo.split("/");
          var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
          this.up7 = nombreArchivo;
        }

        if(c.pregunta == 13 && c.subpregunta == 3){
          var rutaArchivo = c.rutaArchivo.split("/");
          var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
          this.up8 = nombreArchivo;
        }

        if(c.pregunta == 14 && c.subpregunta == null){
          this.formPresentacion.radioEvaluacionImpacto = c.respuesta;
        }

        if(c.pregunta == 14 && c.subpregunta == 1){
          this.formPresentacion.evaUno = c.respuesta;
        }

        if(c.pregunta == 14 && c.subpregunta == 2){
          this.formPresentacion.evaDos = c.respuesta;
        }

        if(c.pregunta == 14 && c.subpregunta == 3){
          this.formPresentacion.evaTres = c.respuesta;
        }

        if(c.pregunta == 22 && c.subpregunta == 1){
          let check:Boolean = c.respuesta === 'true'?true:false;
          this.formPresentacion.tratamiento.general.checkGeneral = check;
        }

        if(c.pregunta == 22 && c.subpregunta == 2){
          this.formPresentacion.tratamiento.general.valGeneral = c.respuesta;
        }

        if(c.pregunta == 22 && c.subpregunta == 3){
          let check:Boolean = c.respuesta === 'true'?true:false;
          this.formPresentacion.tratamiento.particular.checkParticular = check;
        }

        if(c.pregunta == 22 && c.subpregunta > 3){
          let index = c.rutaArchivo.indexOf("<->");
          let valTi = c.rutaArchivo.substring(0,index);
          let valAyu = c.rutaArchivo.substring(index+3);         
          let objeto:ListaParticular={valCheck:true,valTitulo:valTi,valText:c.respuesta,valHelp:valAyu};
          this.formPresentacion.tratamiento.particular.lista.push(objeto);
        }
      }

    });    
  }

  descargaCueUno(up:string, pregunta){
    this.serviceDescarga.descargaDocumento(up,2, this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }

  descargaCuestionarioF1(){
    this.spinner.show();
    
    setTimeout(() => {
      this.serviceDescarga.descargaCuestionarioF2(this.folioConsultafUno);
      this.spinner.hide();      
    }, 1000);
  }
 
  aceptarCuestionario(){
    this.frameOk.show();
  }

  aceptar(){
    this.acceptarFuno.folio = this.folioConsultafUno;
    this.acceptarFuno.email = this.usuario.usuario.emailInstitucional;

    if(this.barchivoUno){
      this.acceptarFuno.upload = this.formAprobar.value.aprobar;
    }else{
      this.acceptarFuno.upload = new UploadF("","","");
    }

    this.spinner.show();
        this.flujoService.aceptarCuestionarioDos( this.acceptarFuno).subscribe(
          result => {

            this.responseAceptar = result;
                if (this.responseAceptar !=null ) {
                    if(this.responseAceptar.estatus === "ok"){
                      this.toastr.success('El cuestionario con folio: '+ this.folioConsultafUno +', se ha aceptado de forma correcta', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
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

  navegaBandeja(){
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/'+dash]);    
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

  onFileChange(event) {
    let reader = new FileReader();
    this.acceptarFuno.upload.filename="";
    

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoUno = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 
   
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

   

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoUno = false;
      this.acceptarFuno.upload.filename="";
     
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
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
      this.toastr.warning('El archivo no puede exceder los 10 megas', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoDos = false;
      this.acceptarFdos.upload.filename="";
     
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoDos = false;
      this.acceptarFdos.upload.filename="";
    }else{
      this.barchivoDos = true;
    }
  }

  riaCuestionario(){
    this.frameria.show();
  }

  ria(){
   
    this.acceptarFdos.folio = this.folioConsultafUno;
    this.acceptarFdos.email = this.usuario.usuario.emailInstitucional;
  
    if(this.barchivoDos){
      this.acceptarFdos.upload = this.formRIA.value.docria;
    }else{
      this.acceptarFdos.upload = new UploadF("","","");
    }

    this.spinner.show();
    this.flujoService.riaCuestionarioDos( this.acceptarFdos).subscribe(
      result => {

        this.responseAceptar = result;
            if (this.responseAceptar !=null ) {
                if(this.responseAceptar.estatus === "ok"){
                  this.toastr.success('Se ha solicitado información adicional al folio: '+ this.folioConsultafUno , 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
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

  mostrarAyuda(tipo:number,msg:string){
    
    if(tipo==1){
      this.mensaje = Constantes.AyudaTitulo;      
    }else if(tipo==2){
      this.mensaje = Constantes.AyudaGeneral;
    }else if(tipo==3){  
      this.mensaje = Constantes.AyudaParticular;
    }else{
      this.mensaje = msg;
    }
    this.frameModalAviso.show();
  }

  navegaHistorico(){
    this._router.navigate(['/historico']); 
  }

  regresar(){
    let retorno = sessionStorage.getItem("dashboard");
    this._router.navigate(['/'+retorno]); 
  }

}
