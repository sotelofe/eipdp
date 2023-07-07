import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-preconsulta',
  templateUrl: './preconsulta.component.html',
  styleUrls: ['./preconsulta.component.scss']
})
export class PreconsultaComponent implements OnInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  public formPreconsulta:Preconsulta;
  public form: FormGroup;
  public archivo1:Archivo;
  public upload1:UploadF;
  public upload2:UploadF;
  public upload3:UploadF;
  public chipervinculo:number;
  public crelevante:number;
  public responseUsuario:ResponseUsuario;
  public user:UsuarioDTO[];
  public usuario:ResponseLogin;
  public barchivoDos:boolean;
  public barchivoTres:boolean;
  public barchivoUno:boolean;

  
  constructor(
    private _router: Router,
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private flujoService: FlujoService,
    private spinner: NgxSpinnerService,
    private serviceSesion:SesionService
  ) { 
    this.upload1 = new UploadF("no cargado","no cargado","no cargado");
    this.upload2 = new UploadF("","","");
    this.upload3 = new UploadF("","","");
    this.formPreconsulta = new Preconsulta("","","","","",this.upload1,"","","","","","","","","","","",this.upload2,"","","","","","",this.upload3,"","",0);
    this.archivo1 = new Archivo("","");
    this.createForm();
    this.chipervinculo =0;
    this.crelevante =0;
    this.user = new Array();
    this.responseUsuario = new ResponseUsuario(this.user,"","");
    this.barchivoUno = false;
    this.barchivoDos = false;
    this.barchivoTres = false;
  }

  ngOnInit(): void {
    this.serviceSesion.validarInicioSesion();
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
  }

  incHipervinculo(){
    this.chipervinculo = this.form.value.hipervinculo.length;
  }

  incRelevante(){
    this.crelevante = this.form.value.relevante.length;
  }

  createForm() {
    this.form = this.fb.group({
      name: null,
      radioPreconsultab: ['', ],
      radioPreconsultaeg1: [''],
      radioPreconsultaeg2: [''],
      radioPreconsultaf: [''],
      resultados: [''],
      hipervinculo:[''],
      descripcion:['', Validators.required],
      relevante:['', Validators.required],
      nombre:['', Validators.required],
      cargo:['', Validators.required],
      unidad:['', Validators.required],
      correo:['', Validators.required],
      telefono:['', Validators.required],
      documentos:['', Validators.required],
      desGenAdi:['', Validators.required],
      desGenAne:['', Validators.required],
    });
  }

  text1(){
    
  }

  
  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoUno = false;
      return;
    }



    const size = event.srcElement.files[0].size;

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('resultados').setValue({
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
    }else{
      this.barchivoUno = true;
    }

    

  }

  onFileChange2(event) {
    let reader = new FileReader();

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoDos = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('descripcion').setValue({
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
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      
      this.barchivoDos = false;      
    }else{
      this.barchivoDos = true;
    }

  }

  onFileChange3(event) {
    let reader = new FileReader();

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoTres = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('documentos').setValue({
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
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      
      this.barchivoDos = false;      
    }else{
      this.barchivoTres = true;
     
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

  setCheckboxesValue(valorRadio:string) {
    this.formPreconsulta.radioPreconsulta = valorRadio;
  }


  limpiarPrecuestionario(v:string){

    
    if(v === 'B'){
      this.formPreconsulta.radioPreconsultab = this.form.value.radioPreconsultab;
      this.formPreconsulta.radioPreconsultaeg1 = "";
      this.formPreconsulta.radioPreconsultaeg2 = "";
      this.formPreconsulta.radioPreconsultaf = "";
    }
    
    if( v === 'D'){
      this.formPreconsulta.radioPreconsultab = "";
      this.formPreconsulta.radioPreconsultaeg1 = this.form.value.radioPreconsultaeg1;
      this.formPreconsulta.radioPreconsultaeg2 = this.form.value.radioPreconsultaeg2;
      this.formPreconsulta.radioPreconsultaf = "";
    }
    
    if(v === 'CD' || v === 'CE'){
      this.formPreconsulta.radioPreconsultab = "";
      this.formPreconsulta.radioPreconsultaeg1 = this.form.value.radioPreconsultaeg1;
      this.formPreconsulta.radioPreconsultaeg2 = this.form.value.radioPreconsultaeg2;
      this.formPreconsulta.radioPreconsultaf = "";
    }
    
    if(v==='CF' || v==='CG'){
      this.formPreconsulta.radioPreconsultab = "";
      this.formPreconsulta.radioPreconsultaeg1 = "";
      this.formPreconsulta.radioPreconsultaeg2 = "";
      this.formPreconsulta.radioPreconsultaf = this.form.value.radioPreconsultaf;
    }
  }

  setCheckboxesCuestionarioValue1(valorRadio:string) {
    this.formPreconsulta.radioConsulta1 = valorRadio;
    
  }

  setCheckboxesCuestionarioValue2(valorRadio:string) {
    this.formPreconsulta.radioConsulta2 = valorRadio;
    
  }

  setCheckboxesCuestionarioValue31(valorRadio:string) {
    this.formPreconsulta.radioConsulta31 = valorRadio;
    
  }

  setCheckboxesCuestionarioValue32(valorRadio:string) {
    this.formPreconsulta.radioConsulta32 = valorRadio;
    
  }
  
  setCheckboxesCuestionarioValue4(valorRadio:string) {
    this.formPreconsulta.radioConsulta4 = valorRadio;
    
  }
  
  setCheckboxesCuestionarioValue51(valorRadio:string) {
    this.formPreconsulta.radioConsulta51 = valorRadio;
    
  }

  setCheckboxesCuestionarioValue52(valorRadio:string) {
    this.formPreconsulta.radioConsulta52 = valorRadio;
    
  }

  setCheckboxesCuestionarioValue53(valorRadio:string) {
    this.formPreconsulta.radioConsulta53 = valorRadio;
    
  }

  setCheckboxesCuestionarioValue6(valorRadio:string) {
    this.formPreconsulta.radioConsulta6 = valorRadio;
    
  }

  cuestionarioPresentarEipdp(){
    this._router.navigate(['/cuestionarioeipdp']);
  }


  guardarCuestionario(){

    if(this.barchivoUno){
      this.formPreconsulta.upload1 = this.form.value.resultados;
    }else{
      this.formPreconsulta.upload1 = new UploadF("","","");
    }

    if(this.barchivoDos){
      this.formPreconsulta.upload2 = this.form.value.descripcion;
    }else{
      this.formPreconsulta.upload2 = new UploadF("","","");
    }

    if(this.barchivoTres){
      this.formPreconsulta.upload3 = this.form.value.documentos;
    }else{
      this.formPreconsulta.upload3 = new UploadF("","","");
    }

   

    this.limpiarPrecuestionario(this.formPreconsulta.radioPreconsulta);
    this.formPreconsulta.idUsuario = this.usuario.usuario.idUsuario;
    this.formPreconsulta.hipervinculo = this.form.value.hipervinculo;
    this.formPreconsulta.relevante = this.form.value.relevante;
    this.formPreconsulta.nombre = this.form.value.nombre;
    this.formPreconsulta.cargo = this.form.value.cargo;
    this.formPreconsulta.unidad = this.form.value.unidad;
    this.formPreconsulta.correo = this.form.value.correo;
    this.formPreconsulta.telefono = this.form.value.telefono;
    this.formPreconsulta.desGenAdi = this.form.value.desGenAdi;
    this.formPreconsulta.desGenAne = this.form.value.desGenAne;


    
    this.spinner.show();
    if(this.validaArchivos()){
        if(this.validaFaltantes()){
          if(this.validaRadios()){
            if(this.validaFormato()){
              this.flujoService.altaFlujo1(this.formPreconsulta).subscribe(
                result => {
                  this.responseUsuario = result;
                  console.log( this.responseUsuario.mensaje);
                  if (this.responseUsuario !=null ) {

                    if(this.responseUsuario.estatus === "ok"){
                      this.frameOk.show();

                    }else if(this.responseUsuario.estatus === "fail"){
                      this.frameFail.show();
                    }else{
                      this.toastr.warning('No se pudo registrar el cuestionario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                    }
                } else {
                  this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }

                  setTimeout(() => {
                    this.spinner.hide();
                  }, 1000);
                },(error:any)=>{

                }
              );
            }else{
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            }
          }else{
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          }
        }else{
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
    }else{
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  }

  validaArchivos(){
    console.log("this.formPreconsulta.upload2.filename: " + this.formPreconsulta.upload2.filetype);
    if( this.formPreconsulta.upload2.filename === '' ){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Carga el archivo de la sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if( this.formPreconsulta.upload3.filename  === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Carga el archivo de la sección 3, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if( this.formPreconsulta.relevante === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo describa la información adicional incorporada en el documento que resulta relevante para el caso concreto, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if( this.formPreconsulta.nombre === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo nombre, sección 2, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if( this.formPreconsulta.cargo === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo cargo, sección 2, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if( this.formPreconsulta.unidad === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo unidad, sección 2, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if( this.formPreconsulta.correo === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo correo, sección 2, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if( this.formPreconsulta.telefono === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo telefono, sección 2, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if( this.formPreconsulta.desGenAdi === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo descripción general de la información adicional, sección 3, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }if( this.formPreconsulta.desGenAne === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo descripción general de los documentos anexos, sección 3, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }

    
    else{
      return true;
    }
  }

  validaFaltantes(){
    if( this.formPreconsulta.radioConsulta1 === 'Si'){
      if( this.formPreconsulta.hipervinculo === ''){
        this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor del hipervínculo web, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
        return false;
      }else{
        return true;
      } 
    }else{
      return true;
    }
  }
  
  validaRadios(){

    if(this.formPreconsulta.radioConsulta1 === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo fundamento que lo habilita a tratar los datos personales conforme a la normatividad que le resulte aplicable, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPreconsulta.radioConsulta2 === '' ){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo finalidades concretas, lícitas, explícitas y legítimas del tratamiento, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPreconsulta.radioConsulta31 === '' ){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo datos personales objeto de tratamiento, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPreconsulta.radioConsulta32 === '' ){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo datos personales sensibles, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if( this.formPreconsulta.radioConsulta4 === '' ){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo categorías de titulares, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPreconsulta.radioConsulta51 === '' ){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo transferencias de datos personales, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPreconsulta.radioConsulta52 === '' && this.formPreconsulta.radioConsulta51 === 'Si' ){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo tipo de transferencias de datos personales, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPreconsulta.radioConsulta53 === '' && this.formPreconsulta.radioConsulta51 === 'Si'){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo tipo de Sector de transferencias de datos personales, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPreconsulta.radioConsulta6 === ''){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor para el campo tecnología utilizada, sección 1, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(this.formPreconsulta.radioConsulta51 === 'Si'){
      if(this.formPreconsulta.radioConsulta52 === ''){
        this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor de nacionalidad de la transferencia de datos</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
        return false;
      }else if(this.formPreconsulta.radioConsulta53 === ''){
        this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa el valor del sector de la transferencia de datos</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }

  }

  validaFormato(){
    console.log(this.formPreconsulta.correo);
    console.log(this.formPreconsulta.telefono);
    var tel = this.formPreconsulta.telefono+"";
    console.log(tel.length);
    let hasEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.formPreconsulta.correo);
    console.log(hasEmail);
    
    if(!hasEmail){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">Ingresa un correo electrónico valido, sección 2, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else if(tel.length<10){
      this.toastr.warning('<span style="font-family: Gotham-Book !important">El número de teléfono debe contener al menos 10 dígitos, sección 2, pestaña Cuestionario</span>', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true, enableHtml:true });
      return false;
    }else {
      return true;
    }

  }

  navegaBandeja(){
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/consulta']);
    
    }
  }

}
