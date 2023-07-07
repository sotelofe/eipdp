import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaFlujoUno } from '../model/lista_flujo1';
import { Secuencia } from '../model/secuencia';
import { SecuenciaRequest } from '../model/secuencia-request';
import { SecuenciaService } from '../services/secuencia.service';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { DescargaService } from '../services/descarga.service';
import { ToastrService } from 'ngx-toastr';
import { SesionService } from '../services/sesion.service';
import { ResponseLogin } from '../model/responselogin';

@Component({
  selector: 'app-expediente-historico',
  templateUrl: './expediente-historico.component.html',
  styleUrls: ['./expediente-historico.component.scss']
})
export class ExpedienteHistoricoComponent implements OnInit {
  public flujo:ListaFlujoUno; 
  public listaSecuencia:Secuencia[];
  public retorno:string="";
  public faCircle = faCircle;
  public res:boolean=false;
  public origen:string="";
  public iorigen:number=0;
  public nombre:string="";
  public smensaje:string="";
  public size:number=0;
  public usuario:ResponseLogin;
  public etapa:string ="Generando opinión técnica";
  public etapag:string ="Generando Opinión Técnica";
  public etapad:string ="Generando Dictamen";
                        
  public etapaRR:string ="Revisión RIA";
  public etapaCR:string ="Contestación RIA";

  constructor(
    private service:SecuenciaService,
    private _router: Router,
    private descargaService:DescargaService,
    private toastr: ToastrService, 
    private serviceSesion:SesionService,
  ) { 
    this.listaSecuencia = new Array();
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
  }

  ngOnInit(): void {
    this.flujo = JSON.parse(sessionStorage.getItem("expedienteHistorico"));
    this.retorno = sessionStorage.getItem("dashboard");
    this.iniciarValores();
    this.iniciaComentario();
  }

  iniciarValores(){
    let fol:SecuenciaRequest={folio:this.flujo.folio, mensaje:""};
    this.service.getHistoricoSecuencia(fol).subscribe(
      result=>{
          this.listaSecuencia = result.listaSecuencia;
          this.listaSecuencia.forEach(element => {
            if(element.etapa === this.etapaRR){
              element.etapa = this.etapaCR;
            }
          });
          console.log(this.listaSecuencia);
      }
    );
    this.origen = sessionStorage.getItem("origenhistorico");
    this.iorigen = parseInt(this.origen);
  }

  iniciaComentario(){
    if(this.origen !=null && this.origen == "2"){
      let fol:SecuenciaRequest={folio:this.flujo.folio, mensaje:""};
      this.service.getComentario(fol).subscribe(
        result=>{
          if(result == null || result == ''){
            this.smensaje="";
          }else{
            this.smensaje = result.mensaje;
          }
        }
      );
    }
  }

  regresar(){
    if(this.origen !=null && this.origen == "2"){
      let cue = sessionStorage.getItem("origenCuestionario");
      this._router.navigate(['/'+cue]); 
    }else{      
      this._router.navigate(['/'+this.retorno]); 
    }
  }

  checarImagen(ruta:string){
    //console.log("ruta: " +ruta.substring(ruta.indexOf(".")));    
    if(ruta!=null && ruta!=''){
      return ruta.substring(ruta.indexOf(".")+1);
    }else{
      return ".na";
    }
  }

  descargar(ruta:string,etapa:string){
    console.log("descargar");
    let objeto = {folio:ruta}
    this.nombre = etapa+"."+ruta.substring(ruta.indexOf(".")+1);
    this.descargaService.descargaArchivoRuta(objeto).subscribe(result=>{
      console.log(result);
      setTimeout(() => {
        this.descargaService.descarga('data:application/octet-stream;base64,' +result.base64,this.nombre);
        
      }, 1000);
    
    });
  }

  guardar(){
    let fol:SecuenciaRequest={folio:this.flujo.folio, mensaje:this.smensaje};
      this.service.altaComentario(fol).subscribe(
        result=>{
          console.log(result.estatus);
          setTimeout(() => {
            this.toastr.success('Comentario guardado correctamente', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
          }, 1000);
        }
      );
  }

  validaTexto(){
    if(this.smensaje == null || this.smensaje ==''){
      return true;
    }else{
      return false;
    }
  }

}
