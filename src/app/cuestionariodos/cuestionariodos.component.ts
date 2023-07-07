import { Component, OnInit, ElementRef, ViewChild, ContentChildren, QueryList } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Servidor } from '../model/servidor';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Presentacion } from '../model/presentacion';
import { TipoTratamiento } from '../model/tipo.tratamiento';
import { Check } from '../model/check';
import { FormaRecaban } from '../model/forma.recaban';
import { ToastrService } from 'ngx-toastr';
import { UploadF } from '../model/upload';
import { ResponseUsuario } from '../model/responseusuario';
import { UsuarioDTO } from '../model/usuario';
import { SesionService } from '../services/sesion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlujoService } from '../services/flujos.service';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { ResponseLogin } from '../model/responselogin';
import { Router } from '@angular/router';
import { ModalsComponent } from '../modals/modals.component';
import { Constantes } from '../global/constantes';
import { Tratamiento } from '../model/tratamientos';
import { TratamientoGeneral } from '../model/tratamiento.general';
import { TratamientoParticular } from '../model/tratamiento.particular';
import { ListaParticular } from '../model/lista.particular';
import { TratamientoService } from '../services/tratamiento.service';
import { ResponseListaParticulares } from '../model/response.lista.particulares';

@Component({
  selector: 'app-cuestionariodos',
  templateUrl: './cuestionariodos.component.html',
  styleUrls: ['./cuestionariodos.component.scss']
})
export class CuestionariodosComponent implements OnInit {
  @ViewChild('fileInput') myFileInput: ElementRef;
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  @ViewChild(ModalsComponent) public modalAyuda:ModalsComponent;

  public form: FormGroup;
  public listaServidor:Servidor[];
  public formPresentacion:Presentacion;
  public tipoTratamiento:TipoTratamiento;
  public formaRecaban:FormaRecaban;
  public obtencion:Check;
  faEraser = faTimes;
  public barchivoUno:boolean;
  public barchivoDos:boolean;
  public barchivoTres:boolean;
  public barchivoCuatro:boolean;
  public barchivoCinco:boolean;
  public barchivoSeis:boolean;
  public barchivoSiete:boolean;
  public barchivoOcho:boolean;
  public archivo1:UploadF;
  public archivo2:UploadF;
  public archivo3:UploadF;
  public archivo4:UploadF;
  public archivo5:UploadF;
  public archivo6:UploadF;
  public archivo7:UploadF;
  public archivo8:UploadF;
  public user:UsuarioDTO[];
  public responseUsuario:ResponseUsuario;
  public usuario:ResponseLogin;
  public fGeneral:boolean = false;
  public fParticular:boolean = false;  
  public general:TratamientoGeneral={checkGeneral:false,valGeneral:''};
  public listaPar:ListaParticular[]=[];
  public particular:TratamientoParticular={checkParticular:false,lista:this.listaPar};
  public tratamiento:Tratamiento={general:this.general,particular:this.particular};
  public response:ResponseListaParticulares={estatus:'',mensaje:'',listaParticular:this.listaPar}

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private flujoService: FlujoService,
    private spinner: NgxSpinnerService,
    private serviceSesion:SesionService,
    private _router: Router,
    private _service: TratamientoService,
  ) { 
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
    this.obtencion = new Check("",false);
    this.barchivoUno = false;
    this.barchivoDos = false;
    this.barchivoTres = false;
    this.barchivoCuatro = false;
    this.barchivoCinco = false;
    this.barchivoSeis = false;
    this.barchivoSiete = false;
    this.barchivoOcho = false;
    this.user = new Array();
    this.responseUsuario = new ResponseUsuario(this.user,"","");
    this.createForm();
    this.setListaParticular();
  }

  ngOnInit(): void {
    this.serviceSesion.validarInicioSesion();
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
  }

  createForm() {
    this.form = this.fb.group({
      denominacion:['', Validators.required],
      nomPolPub:['', Validators.required],
      objGen:['', Validators.required],
      objEsp:['', Validators.required],
      nombreServidor:['', ],
      cargoServidor:['', ],
      
      archivo1:['', Validators.required],
      hipervinculo:['',],

      
      nuProTra:['', Validators.required],
      
      personal:[false, ],
      directa:[false, ],
      indirecta:[false, ],

      infoAdi:['',Validators.required],
      
      archivo2:['', Validators.required],
      
      archivo3:['', Validators.required],
      
      archivo4:['', Validators.required],
      
      archivo5:['', Validators.required],
      archivo6:['', Validators.required],
      archivo7:['', Validators.required],
      archivo8:['', Validators.required],
      
      obtencion:[false, ],
      aprovechamiento:[false, ],
      explotacion:[false, ],
      almacenamiento:[false, ],
      conservacion:[false, ],
      supresion:[false, ],
      otra:[false, ],
      otroTratamiento:['',],
      
      descGen:['', Validators.required],
      descAne:['', Validators.required],
      
      evaUno:['', ],
      evaDos:['', ],
      evaTres:['', ],

      general:[false, ],
      particular:[false, ],
      txtgeneral:['', ],
      listaParticular: this.fb.array([])

    });
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

  onFileChange1(event) {
    let reader = new FileReader();

    this.formPresentacion.archivo1.filename="";
    
    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoUno = false;
      return;
    }
    
    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name;  
    
     
        if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          this.formPresentacion.archivo1.filename = file.name;
          this.formPresentacion.archivo1.filetype = file.type;
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.form.get('archivo1').setValue({
              filename: file.name,
              filetype: file.type,
              value: (<string>reader.result).split(',')[1]
            })
          };
        }
    
        if(size == 0 || size > 10485760){
          this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
          event.target.value = "";
          this.barchivoUno = false;
          this.formPresentacion.archivo1.filename="";
         
        }else if(this.validarExtension(name)){
          this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
          event.target.value = "";
          this.barchivoUno = false;
          this.formPresentacion.archivo1.filename="";
        }else{
          this.barchivoUno = true;
        }
  }

  onFileChange2(event) {
    let reader = new FileReader();
    this.formPresentacion.archivo2.filename="";

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoDos = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 
    
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.formPresentacion.archivo2.filename = file.name;
      this.formPresentacion.archivo2.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('archivo2').setValue({
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
      this.formPresentacion.archivo2.filename="";
    }else if(this.validarExtension(name)){
          this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
          event.target.value = "";
          this.barchivoDos = false;
          this.formPresentacion.archivo2.filename="";
    }else{
          this.barchivoDos = true;
    }
  }

  onFileChange3(event) {
    let reader = new FileReader();
    this.formPresentacion.archivo3.filename="";

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoTres = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.formPresentacion.archivo3.filename = file.name;
      this.formPresentacion.archivo3.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('archivo3').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoTres = false;
      this.formPresentacion.archivo3.filename="";
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoTres = false;
      this.formPresentacion.archivo3.filename="";
    }else{
      this.barchivoTres = true;
    }
  }

  onFileChange4(event) {
    let reader = new FileReader();
    this.formPresentacion.archivo4.filename="";

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoCuatro = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.formPresentacion.archivo4.filename = file.name;
      this.formPresentacion.archivo4.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('archivo4').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoCuatro = false;
      this.formPresentacion.archivo4.filename="";
         
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoCuatro = false;
      this.formPresentacion.archivo4.filename="";
    }else{
      this.barchivoCuatro = true;
    }
  }

  onFileChange5(event) {
    let reader = new FileReader();
    this.formPresentacion.archivo5.filename="";

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoCinco = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.formPresentacion.archivo5.filename = file.name;
      this.formPresentacion.archivo5.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('archivo5').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoCinco = false;
      this.formPresentacion.archivo5.filename="";
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoCinco = false;
      this.formPresentacion.archivo5.filename="";
    }else{
      this.barchivoCinco = true;
    }
  }

  onFileChange6(event) {
    let reader = new FileReader();
    this.formPresentacion.archivo6.filename="";

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoSeis = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.formPresentacion.archivo6.filename = file.name;
      this.formPresentacion.archivo6.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('archivo6').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoSeis = false;
      this.formPresentacion.archivo6.filename="";    
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoSeis = false;
      this.formPresentacion.archivo6.filename="";
    }else{
      this.barchivoSeis = true;
    }
  }

  onFileChange7(event) {
    let reader = new FileReader();
    this.formPresentacion.archivo7.filename="";

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoSiete = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.formPresentacion.archivo7.filename = file.name;
      this.formPresentacion.archivo7.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('archivo7').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoSiete = false;
      this.formPresentacion.archivo7.filename="";    
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoSiete = false;
      this.formPresentacion.archivo7.filename="";
    }else{
      this.barchivoSiete = true;
    }
  }

  onFileChange8(event) {
    let reader = new FileReader();
    this.formPresentacion.archivo8.filename="";

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoOcho = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.formPresentacion.archivo8.filename = file.name;
      this.formPresentacion.archivo8.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('archivo8').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoOcho = false;
      this.formPresentacion.archivo8.filename="";
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoOcho = false;
      this.formPresentacion.archivo8.filename="";
    }else{
      this.barchivoOcho = true;
    }
  }

  agregarServidor(){
    let objServidor = new Servidor( this.form.value.nombreServidor, this.form.value.cargoServidor);
    this.listaServidor.push(objServidor);    
  }
  
  eliminarRegistro(s:Servidor){
    this.listaServidor = this.listaServidor.filter(obj => obj !== s);
  }

  setCheckboxesValue1(valorRadio:string) {
    this.formPresentacion.objetivosGenerales = valorRadio;
  }

  setCheckboxesValue2(valorRadio:string) {
    this.formPresentacion.objetivosEspecificos = valorRadio;
  }

  setCheckboxesValue3(valorRadio:string) {
    this.formPresentacion.objetivosLegal = valorRadio;
    console.log("valorRadio3: " + valorRadio);
    if(valorRadio != 'Si'){
      this.form.value.hipervinculo = "";
    }
  }

  setCheckboxesValue4(valorRadio:string) {
    this.formPresentacion.categorias = valorRadio;
  }

  setCheckboxesValue5(valorRadio:string) {
    this.formPresentacion.grupVul = valorRadio;
  }

  setCheckboxesValue6(valorRadio:string) {
    this.formPresentacion.datPerTra = valorRadio;
  }
  
  setCheckboxesValue7(valorRadio:string) {
    this.formPresentacion.datPerSen = valorRadio;
  }

  setCheckboxesValue8(valorRadio:string) {
    this.formPresentacion.finTra = valorRadio;
  }

  
  setCheckboxesValue9(valorRadio:string) {
    this.formPresentacion.viDePro = valorRadio;
  }
  
  
  setCheckboxesValuePersonal(valorCheck:string){
    let check = !this.form.value.personal;
    if(check){
      this.formPresentacion.formaRecaban.personal = valorCheck;
    }else{
      this.formPresentacion.formaRecaban.personal = '';
    }
    
  }
  
  setCheckboxesValueDirecta(valorCheck:string){
    let check = !this.form.value.directa;
    if(check){
      this.formPresentacion.formaRecaban.directa = valorCheck;
    }else{
      this.formPresentacion.formaRecaban.directa = '';
    }
    
  }
  
  setCheckboxesValueIndirecta(valorCheck:string){
    let check = !this.form.value.indirecta;
    if(check){
      this.formPresentacion.formaRecaban.indirecta = valorCheck;
    }else{
      this.formPresentacion.formaRecaban.indirecta = '';
    }
    
  }
  
  setCheckboxesValue10(valorRadio:string) {
    this.formPresentacion.fuProDat = valorRadio;
  }

  setCheckboxesValue11(valorRadio:string) {
    this.formPresentacion.traDatPer = valorRadio;

    if(valorRadio != 'Si'){
      this.formPresentacion.tipTraDatPer = "";
      this.formPresentacion.secTraDatPer = "";
    }
  }

  setCheckboxesValue12(valorRadio:string) {
    this.formPresentacion.tipTraDatPer = valorRadio;
  }
  
  setCheckboxesValue13(valorRadio:string) {
    this.formPresentacion.secTraDatPer = valorRadio;
  }

  setCheckboxesValue14(valorRadio:string) {
    this.formPresentacion.tieDurTra = valorRadio;
  }

  setCheckboxesValue15(valorRadio:string) {
    this.formPresentacion.intRel = valorRadio;
  }

  setCheckboxesValue16(valorRadio:string) {
    this.formPresentacion.medSeg = valorRadio;
  }

  setCheckboxesValue17(valorRadio:string) {
    this.formPresentacion.susIdo = valorRadio;
  }

  setCheckboxesValue18(valorRadio:string) {
    this.formPresentacion.proEst = valorRadio;
  }

  setCheckboxesValue19(valorRadio:string) {
    this.formPresentacion.equFun = valorRadio;
  }

  setCheckboxesValueO(valorCheck:string){
    let check = this.form.value.obtencion;
    if(check){
      this.formPresentacion.checkTipoTratamiento.obtencion = valorCheck;
    }else{
      this.formPresentacion.checkTipoTratamiento.obtencion = '';
    }
    console.log(this.formPresentacion.checkTipoTratamiento.obtencion);
  }
  
  setCheckboxesValueAp(valorCheck:string){
    
    let check = this.form.value.aprovechamiento;
    if(check){
      this.formPresentacion.checkTipoTratamiento.aprovechamiento = valorCheck;
    }else{
      this.formPresentacion.checkTipoTratamiento.aprovechamiento = '';
    }
    console.log(this.formPresentacion.checkTipoTratamiento.aprovechamiento);
  }

  setCheckboxesValueE(valorCheck:string){
    
    let check = this.form.value.explotacion;
    if(check){
      this.formPresentacion.checkTipoTratamiento.explotacion = valorCheck;
    }else{
      this.formPresentacion.checkTipoTratamiento.explotacion = '';
    }
    console.log(this.formPresentacion.checkTipoTratamiento.explotacion);
  }
  
  setCheckboxesValueAl(valorCheck:string){
    
    let check = this.form.value.almacenamiento;
    if(check){
      this.formPresentacion.checkTipoTratamiento.almacenamiento = valorCheck;
    }else{
      this.formPresentacion.checkTipoTratamiento.almacenamiento = '';
    }
    console.log(this.formPresentacion.checkTipoTratamiento.almacenamiento);
  }
  
  setCheckboxesValueC(valorCheck:string){
    
    let check = this.form.value.conservacion;
    if(check){
      this.formPresentacion.checkTipoTratamiento.conservacion = valorCheck;
    }else{
      this.formPresentacion.checkTipoTratamiento.conservacion = '';
    }
    console.log(this.formPresentacion.checkTipoTratamiento.conservacion);
  }

  setCheckboxesValueS(valorCheck:string){
    
    let check = this.form.value.supresion;
    if(check){
      this.formPresentacion.checkTipoTratamiento.supresion = valorCheck;
    }else{
      this.formPresentacion.checkTipoTratamiento.supresion = '';
    }
    console.log(this.formPresentacion.checkTipoTratamiento.supresion);
  }
  
  setCheckboxesValueOt(valorCheck:string){
    this.form.value.otroTratamiento = '';  
    console.log(this.form.value.otra);

    let check = this.form.value.otra;
    if(check){
      this.formPresentacion.checkTipoTratamiento.otra = valorCheck;
    }else{
      this.formPresentacion.checkTipoTratamiento.otra = "";
     
    }

   

    console.log(this.formPresentacion.checkTipoTratamiento.otra);
    console.log(this.form.value.otroTratamiento);
  }
  
  
  setCheckboxesValue21(valorRadio:string) {
    this.formPresentacion.fueInt = valorRadio;
  }

  setCheckboxesValue22(valorRadio:string) {
    this.formPresentacion.areGruPer = valorRadio;
  }

  setCheckboxesValue23(valorRadio:string) {
    this.formPresentacion.traEnc = valorRadio;
  }

  setCheckboxesValue24(valorRadio:string) {
    this.formPresentacion.serNub = valorRadio;
  }

  setCheckboxesValue25(valorRadio:string) {
    this.formPresentacion.traResp = valorRadio;
  }

  setCheckboxesValue26(valorRadio:string) {
    this.formPresentacion.traRespSec = valorRadio;
  }

  setCheckboxesValue27(valorRadio:string) {
    this.formPresentacion.plaConAlm = valorRadio;
  
  }

  setCheckboxesValue28(valorRadio:string) {
    this.formPresentacion.tecUti = valorRadio;
  }

  setCheckboxesValue29(valorRadio:string) {
    this.formPresentacion.ideDes = valorRadio;
  }

  setCheckboxesValue30(valorRadio:string) {
    this.formPresentacion.ponCuan = valorRadio;
  }
  
  setCheckboxesValue31(valorRadio:string) {
    this.formPresentacion.medCon = valorRadio;
  }

  setCheckboxesValue32(valorRadio:string) {
    this.formPresentacion.cumPri = valorRadio;
  }

  setCheckboxesValue33(valorRadio:string) {
    this.formPresentacion.cumDeb = valorRadio;
  }

  setCheckboxesValue34(valorRadio:string) {
    this.formPresentacion.cumEsp = valorRadio;
  }

  setCheckboxesValue35(valorRadio:string) {
    this.formPresentacion.vinEje = valorRadio;
  }

  setCheckboxesValue36(valorRadio:string) {
    this.formPresentacion.conExt = valorRadio;
  }

  setCheckboxesValue37(valorRadio:string) {
    this.formPresentacion.reaOpi = valorRadio;
  }
  
  setCheckboxesValue38(valorRadio:string) {
    this.formPresentacion.radioEvaluacionImpacto = valorRadio;
  }
  
  guardarCuestionario(){
    
    this.imprimirForm();
    this.recuperarForm();

    if(this.validaPuntoUno() && this.validaRadios() && this.validaArchivos && this.validaTextAreas){
      this.spinner.show();
      this.flujoService.altaFlujo2(this.formPresentacion).subscribe(
        result => {
          this.responseUsuario = result;
          console.log( this.responseUsuario.mensaje);
          if (this.responseUsuario !=null ) {

            if(this.responseUsuario.estatus === "ok"){
              this.frameOk.show();

            }else if(this.responseUsuario.estatus === "fail"){
              this.frameFail.show();
            }else{
              this.toastr.warning('No se pudo registrar el cuestionario...', '¡Error!', { positionClass: 'toast-top-full-width', closeButton: true });
            }
        } else {
          this.toastr.error('No se pudo realizar la operacion...', '¡Error!', { positionClass: 'toast-top-full-width', closeButton: true });
        }

          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        },(error:any)=>{

        }
      );
    }

    
  }

  recuperarForm(){
    this.formPresentacion.presentacionMatch(this.form);
    this.formPresentacion.listaServidor =  this.listaServidor;
    this.formPresentacion.idUsuario = this.usuario.usuario.idUsuario;

    if(this.formPresentacion.checkTipoTratamiento.otra === ''){
      this.formPresentacion.otroTratamiento='';
    }


    if(this.barchivoUno){
      this.formPresentacion.archivo1 = this.form.value.archivo1;
    }else{
      this.formPresentacion.archivo1 = new UploadF("","","");
    }

    if(this.barchivoDos){
      this.formPresentacion.archivo2 = this.form.value.archivo2;
    }else{
      this.formPresentacion.archivo2 = new UploadF("","","");
    }

    if(this.barchivoTres){
      this.formPresentacion.archivo3 = this.form.value.archivo3;
    }else{
      this.formPresentacion.archivo3 = new UploadF("","","");
    }

    if(this.barchivoCuatro){
      this.formPresentacion.archivo4 = this.form.value.archivo4;
    }else{
      this.formPresentacion.archivo4 = new UploadF("","","");
    }

    if(this.barchivoCinco){
      this.formPresentacion.archivo5 = this.form.value.archivo5;
    }else{
      this.formPresentacion.archivo5 = new UploadF("","","");
    }

    if(this.barchivoSeis){
      this.formPresentacion.archivo6 = this.form.value.archivo6;
    }else{
      this.formPresentacion.archivo6 = new UploadF("","","");
    }

    if(this.barchivoSiete){
      this.formPresentacion.archivo7 = this.form.value.archivo7;
    }else{
      this.formPresentacion.archivo7 = new UploadF("","","");
    }

    if(this.barchivoOcho){
      this.formPresentacion.archivo8 = this.form.value.archivo8;
    }else{
      this.formPresentacion.archivo8 = new UploadF("","","");
    }
  }

  imprimirForm(){
    
    console.log(this.form.value.general); 
    console.log(this.form.value.txtgeneral); 
    console.log(this.form.value.particular); 
    for(let i =0 ; i < this.valListaParticular.length;i++){
      console.log( this.valListaParticular.controls[i].get("valCheck").value);
      console.log( this.valListaParticular.controls[i].get("valText").value);
    }




    console.log(this.formPresentacion.denominacion);
    console.log(this.formPresentacion.nomPolPub);
    console.log(this.formPresentacion.objGen);
    console.log(this.formPresentacion.objEsp);

    this.formPresentacion.listaServidor.forEach((o)=>{
      console.log(o.nombre);
      console.log(o.cargo);
    });

    console.log(this.formPresentacion.archivo1.filename);
    console.log(this.formPresentacion.archivo1.filetype);
    console.log(this.formPresentacion.archivo1.value.length);

    console.log(this.formPresentacion.objetivosGenerales);
    console.log(this.formPresentacion.objetivosEspecificos);
    console.log(this.formPresentacion.objetivosLegal);
    console.log(this.formPresentacion.hipervinculo);



    console.log(this.formPresentacion.categorias);

    console.log(this.formPresentacion.grupVul);

    console.log(this.formPresentacion.datPerTra);

    console.log(this.formPresentacion.datPerSen);

    console.log(this.formPresentacion.finTra);

    console.log(this.formPresentacion.nuProTra);

    console.log(this.formPresentacion.viDePro);

    console.log(this.formPresentacion.formaRecaban);

    console.log(this.formPresentacion.fuProDat);

    console.log(this.formPresentacion.traDatPer);
    
    console.log(this.formPresentacion.tipTraDatPer);

    console.log(this.formPresentacion.secTraDatPer);

    console.log(this.formPresentacion.tieDurTra);

    console.log(this.formPresentacion.intRel);

    console.log(this.formPresentacion.medSeg);

    console.log(this.formPresentacion.infoAdi);

    console.log(this.formPresentacion.archivo2.filename);
    console.log(this.formPresentacion.archivo2.filetype);
    console.log(this.formPresentacion.archivo2.value.length);

    console.log(this.formPresentacion.susIdo);
    console.log(this.formPresentacion.proEst);
    console.log(this.formPresentacion.equFun);

    console.log(this.formPresentacion.archivo3.filename);
    console.log(this.formPresentacion.archivo3.filetype);
    console.log(this.formPresentacion.archivo3.value.length);

    console.log(this.formPresentacion.checkTipoTratamiento.obtencion);
    console.log(this.formPresentacion.checkTipoTratamiento.aprovechamiento);
    console.log(this.formPresentacion.checkTipoTratamiento.explotacion);
    console.log(this.formPresentacion.checkTipoTratamiento.almacenamiento);
    console.log(this.formPresentacion.checkTipoTratamiento.conservacion);
    console.log(this.formPresentacion.checkTipoTratamiento.supresion);
    console.log(this.formPresentacion.checkTipoTratamiento.otra);

    console.log(this.form.value.otroTratamiento);

    console.log(this.formPresentacion.otroTratamiento);


    console.log(this.formPresentacion.fueInt);
    console.log(this.formPresentacion.areGruPer);
    console.log(this.formPresentacion.traEnc);
    console.log(this.formPresentacion.serNub);
    console.log(this.formPresentacion.traResp);
    console.log(this.formPresentacion.traRespSec);
    console.log(this.formPresentacion.plaConAlm);
    console.log(this.formPresentacion.tecUti);

    console.log(this.formPresentacion.ideDes);
    console.log(this.formPresentacion.ponCuan);
    console.log(this.formPresentacion.medCon);

    console.log(this.formPresentacion.cumPri);
    console.log(this.formPresentacion.cumDeb);
    console.log(this.formPresentacion.cumEsp);
    console.log(this.formPresentacion.vinEje);


    console.log(this.formPresentacion.conExt);

    console.log(this.formPresentacion.reaOpi);

    console.log(this.formPresentacion.descGen);
    console.log(this.formPresentacion.descAne);


    console.log(this.formPresentacion.radioEvaluacionImpacto);
    console.log(this.formPresentacion.evaUno);
    console.log(this.formPresentacion.evaDos);
    console.log(this.formPresentacion.evaTres);
 
  }

  validaPuntoUno(){
    let respuesta = true;
    if(!this.form.value.general && !this.form.value.particular){
      this.toastr.warning('Selecciona al menos una opción, punto 1, pestaña cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      respuesta = false;
    }
    if(this.form.value.general){
      if(this.form.value.txtgeneral === ''){
        this.toastr.warning('Ingresa el texto de la casilla General, punto 1, pestaña cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
        respuesta = false;        
      }
    }
    
    if(this.form.value.particular){
      let con = 0;
      for(let i =0 ; i < this.valListaParticular.length;i++){
        if(this.valListaParticular.controls[i].get("valCheck").value==false){
          con++;
        }
      }
      if(con==this.valListaParticular.length){
        this.toastr.warning('Selecciona al menos una opcion de la casilla Particular, punto 1, pestaña cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
        respuesta=false;
      }else{
        for(let i =0 ; i < this.valListaParticular.length;i++){
          if(this.valListaParticular.controls[i].get("valCheck").value==true){
            if(this.valListaParticular.controls[i].get("valText").value===''){
              this.toastr.warning('Ingresa el texto de la opción '+(i+1)+', casilla Particular, punto 1, pestaña cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
              respuesta=false;
              break;
            }
          }
        }
      }
    }


    return respuesta;
  }

  validaRadios(){
    if(this.formPresentacion.denominacion === '' ){
      this.toastr.warning('Ingresa el valor del campo de la letra (a), pestaña Datos Generales', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.nomPolPub === '' ){
      this.toastr.warning('Ingresa el valor del campo de la letra (b), pestaña Datos Generales', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if(this.formPresentacion.objGen === '' ){
      this.toastr.warning('Ingresa el valor del campo de la letra (c) objetivos generales, pestaña Datos Generales', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if(this.formPresentacion.objEsp === '' ){
      this.toastr.warning('Ingresa el valor del campo de la letra (c) objetivos específicos, pestaña Datos Generales', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.listaServidor.length == 0){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Agrega al menos un servidor y su cargo de la letra (d), pestaña Datos Generales', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.archivo1.filename === '' ){
      this.toastr.warning('Cargar el archivo de la sección 2, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.objetivosGenerales === '' ){
      this.toastr.warning('Selecciona la opción de objetivos generales, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.objetivosEspecificos === '' ){
      this.toastr.warning('Selecciona la opción de objetivos especificos, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.objetivosLegal === '' ){
        this.toastr.warning('Selecciona la opción del fundamento legal, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
        return false;
    }else if(this.formPresentacion.objetivosLegal === 'Si' && this.formPresentacion.hipervinculo === '' ){
      this.toastr.warning('Ingresa el valor para el hipervínculo, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.categorias === '' ){
      this.toastr.warning('Selecciona la opción de las categorías de titulares de datos, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.grupVul === '' ){
      this.toastr.warning('Selecciona la opción de los grupos vulnerables, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.datPerTra === ''){
      this.toastr.warning('Selecciona la opción de los datos personales objeto de tratamiento, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.datPerSen === ''){
      this.toastr.warning('Selecciona la opción de datos personales sensibles, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.finTra === ''){
        this.toastr.warning('Selecciona la opción de las finalidades del tratamiento, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
        return false;
    }else if(this.formPresentacion.nuProTra === ''){
      this.toastr.warning('Ingresa el valor del campo número de procesos que involucran el tratamiento, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.viDePro === ''){
      this.toastr.warning('Selecciona la opción de vienen descritos los procesos, sección 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.formaRecaban.personal === '' && this.formPresentacion.formaRecaban.directa === '' && this.formPresentacion.formaRecaban.indirecta === ''){
      this.toastr.warning('Selecciona una o más opciones de la forma en que se recaban datos personales, seccion 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.fuProDat === ''){
      this.toastr.warning('Selecciona la opción de las fuentes de las cuales provienen los datos, seccion 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.traDatPer === ''){
      this.toastr.warning('Selecciona la opción de las transferencias de datos personales, seccion 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.traDatPer === 'Si' && this.formPresentacion.tipTraDatPer === ''){
      this.toastr.warning('Selecciona la opción de tipo de transferencias de datos personales, seccion 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.traDatPer === 'Si' && this.formPresentacion.secTraDatPer === ''){
      this.toastr.warning('Selecciona la opción de sector de transferencias de datos personales, seccion 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.tieDurTra === ''){
      this.toastr.warning('Selecciona la opción de Tiempo de duración del tratamiento, seccion 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.intRel === ''){
      this.toastr.warning('Selecciona la opción de la tecnología que se pretende utilizar para efectuar el tratamiento intensivo o relevante de datos personales, seccion 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.medSeg === ''){
      this.toastr.warning('Selecciona la opción de medidas de seguridad, seccion 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.infoAdi === ''){
      this.toastr.warning('Ingresa el valor del campo de información adicional, seccion 1, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.archivo2.filename === '' ){
      this.toastr.warning('Cargar el archivo de la sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.susIdo === ''){
      this.toastr.warning('Selecciona la opción de las medidas propuestas son susceptibles o idóneas para garantizar el derecho a la protección de datos personales de los titulares, sección 2, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.proEst === ''){
      this.toastr.warning('Selecciona la opción de si la o las medidas propuestas son las estrictamente necesarias, en el sentido de ser las más moderadas para garantizar el derecho a la protección de datos personales de los titulares, sección 2, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.equFun === ''){
      this.toastr.warning('Selecciona la opción de si la o las medidas son equilibradas en función del mayor número de beneficios o ventajas que perjuicios para el garantizar el derecho a la protección de datos personales de los titulares, sección 2, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.archivo3.filename === '' ){
      this.toastr.warning('Cargar el archivo de la sección 4, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.checkTipoTratamiento.obtencion === '' && this.formPresentacion.checkTipoTratamiento.aprovechamiento === '' && this.formPresentacion.checkTipoTratamiento.explotacion === '' && this.formPresentacion.checkTipoTratamiento.almacenamiento === '' && this.formPresentacion.checkTipoTratamiento.conservacion === '' && this.formPresentacion.checkTipoTratamiento.supresion === '' && this.formPresentacion.checkTipoTratamiento.otra === ''){
      this.toastr.warning('Selecciona la opción de tipo de tratamiento, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.checkTipoTratamiento.otra != '' && this.formPresentacion.otroTratamiento === ''){
      this.toastr.warning('Imgresa el valor para el campo describa otro tipo de tratamiento, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.fueInt === ''){
      this.toastr.warning('Selecciona la opción de las fuentes internas y/o externas, así como los medios y procedimientos a través de los cuales se recabarán los datos personales, o bien, son recabados, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.areGruPer === ''){
      this.toastr.warning('Selecciona la opción de las áreas, grupos o personas que llevarán a cabo operaciones específicas de tratamiento con los datos personales, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.traEnc === ''){
      this.toastr.warning('Selecciona la opción de se realiza tratamiento por parte de encargados, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.serNub === ''){
      this.toastr.warning('Selecciona la opción de encargados que brindan servicio de cómputo en nube, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.traResp === ''){
      this.toastr.warning('Selecciona la opción en el tratamiento de datos personales participan otros responsables, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.traResp === 'Si' && this.formPresentacion.traRespSec === ''){
      this.toastr.warning('Selecciona la opción del sector de en el tratamiento de datos personales participan otros responsables, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.plaConAlm === ''){
      this.toastr.warning('Selecciona la opción de los plazos de conservación o almacenamiento de los datos personales, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.tecUti === ''){
      this.toastr.warning('Selecciona la opción de las técnicas a utilizar para garantizar el borrado seguro de los datos personales, sección 3, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.archivo4.filename === '' ){
      this.toastr.warning('Cargar el archivo de la sección 5, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.ideDes === ''){
      this.toastr.warning('Selecciona la opción de riesgos administrativos, sección 4, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.ponCuan === ''){
      this.toastr.warning('Selecciona la opción de riesgos identificados, sección 4, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.medCon === ''){
      this.toastr.warning('Selecciona la opción de medias de los riesgos detectados, sección 4, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.archivo5.filename === '' ){
      this.toastr.warning('Cargar el archivo de la sección 6, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.cumPri === ''){
      this.toastr.warning('Selecciona la opción de análisis de cumplimiento de principios, sección 5, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.cumDeb === ''){
      this.toastr.warning('Selecciona la opción del análisis de cumplimiento de deberes, sección 5, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.cumEsp === ''){
      this.toastr.warning('Selecciona la opción de análisis de cumplimiento de obligaciones específicas, sección 5, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.vinEje === ''){
      this.toastr.warning('Selecciona la opción de tratamiento tiene vinculación con ejercicio de derechos ARCO, sección 5, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.archivo6.filename === '' ){
      this.toastr.warning('Cargar el archivo de la sección 7, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.conExt === ''){
      this.toastr.warning('Selecciona la opción de los resultados de la consulta externa influyeron en la modificación del tratamiento relevante o intensivo, sección 6 pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.archivo7.filename === '' ){
      this.toastr.warning('Cargar el archivo de la sección 8, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.reaOpi === ''){
      this.toastr.warning('Selecciona la opción de quién realiza la opinión, sección 7 pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.archivo8.filename === '' ){
      this.toastr.warning('Cargar el archivo de la sección 9, pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.descGen === ''){
      this.toastr.warning('Ingresa el valor del campo descripción general de la información adicional, sección 8 pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.descAne === ''){
      this.toastr.warning('Ingresa el valor del campo descripción general de los documentos anexos, sección 8 pestaña Cuestionario', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    } else if(this.formPresentacion.radioEvaluacionImpacto === ''){
      this.toastr.warning('Selecciona la opción de si se trata de una evaluación de impacto en la protección de datos personales interinstitucional,seccion 1, pestaña Evaluación de Impacto', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.radioEvaluacionImpacto === 'Si' && this.formPresentacion.evaUno === '' ){
      this.toastr.warning('Ingresa el campo de la denominación de los responsables conjuntos, sección 1, pestaña Evaluación de Impacto', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.radioEvaluacionImpacto === 'Si' && this.formPresentacion.evaDos === '' ){
      this.toastr.warning('Ingresa el campo de la denominación del responsable líder del proyecto, sección 1, pestaña Evaluación de Impacto', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPresentacion.radioEvaluacionImpacto === 'Si' && this.formPresentacion.evaTres === ''){
      this.toastr.warning('Ingresa el campo de las obligaciones, deberes, responsabilidades, límites y demás cuestiones, sección 1, pestaña Evaluación de Impacto', '¡Aviso!', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else{
      return true;
    }
  }

  validaArchivos(){
    var ban =true;

    return ban;
  }

  validaTextAreas(){
    var ban =true;

    return ban;
  }

  navegaBandeja(){
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/presentacion']);    
    }
  }


  setValGeneral(){
    let check = !this.form.value.general;
    this.fGeneral = check;
    console.log(this.fGeneral);     
    this.form.get('txtgeneral').setValue('');   
  }

  setValParticular(){
    let check = !this.form.value.particular;
    this.fParticular = check;
    console.log(this.fParticular);   
    
    if(this.fParticular==false) {
      for(let i =0 ; i < this.valListaParticular.length;i++){
        this.valListaParticular.controls[i].get("valCheck").setValue(false);
        this.valListaParticular.controls[i].get("valText").setValue("");
      }
    }
  }

  mostrarAyuda(tipo:number,msg:string){
    let mensaje = '';
    if(tipo==1){
      mensaje = Constantes.AyudaTitulo;      
    }else if(tipo==2){
      mensaje = Constantes.AyudaGeneral;
    }else if(tipo==3){  
      mensaje = Constantes.AyudaParticular;
    }else{
      mensaje = msg;
    }
    this.modalAyuda.mostrarModal(mensaje);
  }

  setListaParticular() {

    this._service.getListaParticulares().subscribe(
      result => {
        this.response = result;
        console.log(this.response);
        if (this.response.listaParticular !=null ) {
           
          let control = <FormArray>this.form.controls.listaParticular;
          this.response.listaParticular.forEach(x => {
            control.push(this.fb.group({ 
              valCheck: false,
              valTitulo: x.valTitulo,
              valText:'', 
              valHelp:x.valHelp
              }))
          })
            
        } 

        setTimeout(() => {
          
        }, 1000);
        
      },(error: any) => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );

    
  }

  setValor(indice:number){      
    console.log(indice);
    console.log(this.valListaParticular.controls[indice].get("valCheck").value);
    this.valListaParticular.controls[indice].get("valCheck").setValue(!this.valListaParticular.controls[indice].get("valCheck").value);
    console.log(this.valListaParticular.controls[indice].get("valCheck").value);
    if(this.valListaParticular.controls[indice].get("valCheck").value==false){
      this.valListaParticular.controls[indice].get("valText").setValue("");
    }
  }

  getValor(indice:number){
    return this.valListaParticular.controls[indice].get("valCheck").value;
  }

  get valListaParticular(): any {
    return this.form.get('listaParticular')  as FormArray;
  }

  

}
