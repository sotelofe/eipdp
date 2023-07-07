import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'ng-uikit-pro-standard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ListaFlujoUno } from '../model/lista_flujo1';
import { ResponseLogin } from '../model/responselogin';
import { UsuarioDTO } from '../model/usuario';
import { FlujoService } from '../services/flujos.service';
import { SesionService } from '../services/sesion.service';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ExcencionService } from '../services/excencion.service';
import { Router } from '@angular/router';
import { DescargaService } from '../services/descarga.service';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { SubeDocumento } from '../model/sube.documento';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss']
})
export class ExpedientesComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('frame', { static: true }) frame: ModalDirective;
  public lista:ListaFlujoUno[];
  public listau:ListaFlujoUno[];
  public listad:ListaFlujoUno[];
  public listat:ListaFlujoUno[];
  public usuario:ResponseLogin;
  public user:UsuarioDTO;
  public previous: any = [];
  faFileDownload = faFileDownload;
  faCircle = faCircle;
  faFileAlt = faFileAlt;
  faFileSignature = faFileSignature;
  faFileContract = faFileContract;
  faFileUpload= faFileUpload;
  faNotificacion= faEnvelope;
  faUserTie= faUserTie;
  faExclamationCircle = faExclamationCircle;
  faFileInvoice = faFileInvoice;
  faUserFriends = faUserClock;
  faExclamationTriangle = faExclamationTriangle;
  faFolder= faFolder;
  public ETAPA4 = 'RIA';
  public ETAPA5 = 'Revisión RIA';
  public ETAPA_CANCELADO = 'Cancelado';
  public ETAPA1 ='Revisión';
  public ETAPA2 ='Acuerdo de admisión';
  public ETAPA3 ='Generando opinión técnica';
  public ETAPA6 ='Opinión técnica emitida-finalizado';
  public ETAPA7 ='RIA no presentada';
  public ETAPA8 ='Acuerdo de no presentación-finalizado';
  public textoBusqueda:string="";
  public CARGAR_RESPUESTA = 1;
  public DETALLE_RESPUESTA = 2;
  public CARGAR_RIA = 3;
  public REVISAR_RIA = 4;
  public CARGAR_OPINION = 5;
  public DESCARGAR_OPINION = 6;
  public ID_DOC_RIA_SOLICITADA='11';
  public ID_DOC_RIA_ENVIADA='13';
  public ID_DOC_ACEPTACION='10';
  public PERFIL_ADMIN = 1;
  public PERFIL_SUJETO_OBLIGADO=2;
  public PERFIL_DGNC=3;
  public folioEliminarNovinculantes:string="";
  

  
  constructor(
    private spinner: NgxSpinnerService,
    private flujoService: FlujoService,
    private serviceSesion: SesionService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef,
    private excencionService: ExcencionService,
    private _router: Router,
    private descargaService: DescargaService,
  ) { 
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
    this.user = new UsuarioDTO(this.usuario.usuario.idUsuario,null,"","","","","","","","","","");
    this.lista = new Array();
    this.listau = new Array();
    this.listad = new Array();
    this.listat = new Array();
  }

  @HostListener('input') oninput() {
    this.buscarElementos();
}
  
  ngOnInit(): void {
    
  }
  

  buscarElementos() {
    const prev = this.mdbTable.getDataSource();
    if (!this.textoBusqueda) {
        this.mdbTable.setDataSource(this.previous);
        this.lista = this.mdbTable.getDataSource();
    }
    if (this.textoBusqueda) {
      this.lista = this.mdbTable.searchLocalDataBy(this.textoBusqueda);
        this.mdbTable.setDataSource(prev);
    }
  }

  ngAfterViewInit(): void {    
    this.iniciarBandeja();
  }

  iniciarBandeja(){
    this.spinner.show();

    this.flujoService.obtenerListaFlujo1(this.user).subscribe(
      result => {
        this.listau = result;
      
        if (this.listau.length>=0 ) {
              this.lista = this.lista.concat(this.listau);
              this.mdbTable.setDataSource(this.lista);
              this.lista = this.mdbTable.getDataSource();
              this.previous = this.mdbTable.getDataSource();
              this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
              this.mdbTablePagination.calculateFirstItemIndex();
              this.mdbTablePagination.calculateLastItemIndex();
              this.cdRef.detectChanges();

              this.flujoService.obtenerListaFlujo2(this.user).subscribe(
                resultd => {        
                  this.listad = resultd;                                                   
                  if (this.listad.length>=0 ) {                                       
                        this.lista = this.lista.concat(this.listad);
                        this.mdbTable.setDataSource(this.lista);
                        this.lista = this.mdbTable.getDataSource();
                        this.previous = this.mdbTable.getDataSource();
                        this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
                        this.mdbTablePagination.calculateFirstItemIndex();
                        this.mdbTablePagination.calculateLastItemIndex();
                        this.cdRef.detectChanges();

                        this.excencionService.consultarFlujo(this.usuario.usuario.idUsuario).subscribe(
                          resultt => {
                            this.listat = resultt.payload;                                                                 
                           
                            if (this.listat != null && this.listat.length>=0) {
                                  this.lista = this.lista.concat(this.listat);
                                  this.mdbTable.setDataSource(this.lista);
                                  this.lista = this.mdbTable.getDataSource();
                                  this.previous = this.mdbTable.getDataSource();
                                  this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
                                  this.mdbTablePagination.calculateFirstItemIndex();
                                  this.mdbTablePagination.calculateLastItemIndex();
                                  this.cdRef.detectChanges();
                            }
                            setTimeout(() => {
                              console.log(this.lista);
                              this.spinner.hide();
                            }, 1000);
                          }

                        );
                  }else{
                    setTimeout(() => {
                      this.spinner.hide();
                    }, 100);
                  }                       
                } 
              );            
        }else{
          setTimeout(() => {
            this.spinner.hide();
          }, 100);
        }                 
      }
    );
    
  }


  descargaCuestionarioF1(folio:string){
    this.descargaService.descargaCuestionarioF1(folio);
  }

  navegarPrecargaCuestionarioF1(folio:string){
    sessionStorage.removeItem("origenhistorico");
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/revisorfuno']); 
  }

  descargaAceptacionF1(folio:string){
    console.log(folio);
    while(folio.indexOf("/") != -1){
      folio = folio.replace("/","");
    }
    console.log(folio);
    this.descargaService.descargaDocumentoPorNombreF1(folio);
  }


  navegarOpinionTecnica(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/opinion']); 
  }

  navegarAcuerdoAdmision(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/admision']); 
  }

  navegarDescargarAdmision(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/veradmision']); 
  }

  navegarDetalleOpinionTecnica(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/opiniontecnica']); 
  }
  
  navegarRia(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/ria']); 
  }

  descargaRiaSolicitada(folio:string){
    console.log(folio);
    while(folio.indexOf("/") != -1){
      folio = folio.replace("/","");
    }
    console.log(folio);
    this.descargaService.descargaDocumentoPorNombreF1RiaSolicitada(folio);
  }

  descargaRiaEnviada(folio:string){
    console.log(folio);
    while(folio.indexOf("/") != -1){
      folio = folio.replace("/","");
    }
    console.log(folio);
    this.descargaService.descargaDocumentoPorNombreF1RiaEnviada(folio);
  }

  navegarRevisionRia(folio:string){
    console.log(folio);
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/revisorria']); 
  }

  navegarRiaNoPresentadaFu(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "1");
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/rianopresentada']); 
  }

  navegarVerRiaNoPresentadaFu(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "1");
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/verrianopresentada']); 
  }

  navegarNuevaNotificacion(folio:string){
    sessionStorage.removeItem("folioNavegacion");
    sessionStorage.setItem("folioNavegacion", folio);

    sessionStorage.removeItem("retornoNotificacion");
    sessionStorage.setItem("retornoNotificacion", "1");
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/nueva_notificacion']); 
  }

  /**
   * Metodos flujo2
   */
   descargaCuestionarioF2(folio:string){
    this.descargaService.descargaCuestionarioF2(folio);
  }

  navegarPrecargaCuestionarioF2(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/revisorfdos']); 
  }
  
  descargaAceptacionF2(folio:string){
    while(folio.indexOf("/") != -1){
      folio = folio.replace("/","");
    }
    this.descargaService.descargaDocumentoPorNombreF2(folio);
  }
  
  solicitarReunion(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/solicitarReunion']); 
  }
  
  solicitudesReunion(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/verReunion']); 
  }

  presentarRiesgos(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/presentarRiesgos']); 
  }
  
  verRiesgos(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/verRiesgos']); 
  }

  descargaRiesgosIdentificados(folio:string){
    while(folio.indexOf("/") != -1){
      folio = folio.replace("/","");
    }
    this.descargaService.descargaDocumentoRiesgosF2(folio);
  }

  emitirDictamen(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/emitirDictamen']); 
  }

  verDictamen(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/verDictamen']);
  }
  
  navegarSolicitarInforme(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/solicitarInforme']);
  }
  
  cargarInforme(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/cargarInforme']);
  }
  
  verInforme(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/verInforme']);
  }

  navegarRia2(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/riados']); 
  }

  descargaRiaSolicitada2(folio:string){
    console.log(folio);
    while(folio.indexOf("/") != -1){
      folio = folio.replace("/","");
    }
    console.log(folio);
    this.descargaService.descargaDocumentoPorNombreF1RiaSolicitada2(folio);
  }

  descargaRiaEnviada2(folio:string){
    while(folio.indexOf("/") != -1){
      folio = folio.replace("/","");
    }
    this.descargaService.descargaDocumentoPorNombreF1RiaEnviada2(folio);
  }

  navegarRevisionRia2(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/drevisorria']); 
  }

  navegarRiaNoPresentada(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "2");
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/rianopresentada']); 
  }

  navegarVerRiaNoPresentada(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "2");
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/verrianopresentada']); 
  }

  navegarNuevaNotificacion2(folio:string){
    sessionStorage.removeItem("folioNavegacion");
    sessionStorage.setItem("folioNavegacion", folio);

    sessionStorage.removeItem("retornoNotificacion");
    sessionStorage.setItem("retornoNotificacion", "2");
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/nueva_notificacion']); 
  }

  //
  navegarAcuerdoAdmision2(folio:string){
    sessionStorage.removeItem("folioConsulta");
    sessionStorage.setItem("folioConsulta", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/acuerdo-admision']); 
  }

  finalizar(folio:string){
    this.folioEliminarNovinculantes = folio;
    this.frame.show();
  }

  aceptarFrame(){
    let doc:SubeDocumento={folio:this.folioEliminarNovinculantes,asunto:"",email:"",upload:null};
    this.flujoService.terminarSolicitudRecomendacionesNoVinculantes(doc).subscribe(
      result=>{

        setTimeout(()=>{
          this.toastr.success('El proceso de Solicitud de Recomendaciones no Vinculantes ha finalizado', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
          this.iniciarBandeja();
        },1000);
      },error=>{
        this.toastr.error('Ocurrio un error al generar el proceso', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );
  }


  verExpediente2(flujo:ListaFlujoUno){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", flujo.folio);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));

    sessionStorage.setItem("origenhistorico", "2");
    sessionStorage.setItem("origenCuestionario", "revisorfdos");
    sessionStorage.setItem("dashboard", "expedientes");
    this._router.navigate(['/revisorfdos']); 
  }

  /**
   * Metodos flujos 3
   */

   descargaCuestionario(folio:string){
 
    this.excencionService.descargarArchivo(folio);
  }

  descargaDocumento(folio:string, pregunta:string){
    this.excencionService.descargarDocumentos(folio,pregunta);
  }

  navegar(folio:string, id:number) {
    sessionStorage.setItem('folioExencion', folio);
    if(id === this.CARGAR_RESPUESTA) {
      sessionStorage.setItem("dashboard", "expediente");
      this._router.navigate(['/cargarrespuestaexencion']);
    }
    if(id === this.DETALLE_RESPUESTA) {
      sessionStorage.setItem("dashboard", "expediente");
      this._router.navigate(['/detallerespuestaexencion']);
    }
    if(id === this.CARGAR_RIA) {
      sessionStorage.setItem("dashboard", "expediente");
      this._router.navigate(['/cargarriaexencion']);
    }
    if(id === this.REVISAR_RIA) {
      sessionStorage.setItem("dashboard", "expediente");
      this._router.navigate(['/revisarriaexencion']);
    }
    if(id === this.CARGAR_OPINION) {
      sessionStorage.setItem("dashboard", "expediente");
      this._router.navigate(['/opinion-exencion']);
    }
    if(id === this.DESCARGAR_OPINION) {
      sessionStorage.setItem("dashboard", "expediente");
      this._router.navigate(['/detalle-opinion-exencion']);
    }
  }

  navegarRiaNoPresentada3(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "3");
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/rianopresentada']); 
  }

  navegarVerRiaNoPresentada3(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "3");
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/verrianopresentada']); 
  }

  navegarNuevaNotificacion3(folio:string){
    sessionStorage.removeItem("folioNavegacion");
    sessionStorage.setItem("folioNavegacion", folio);

    sessionStorage.removeItem("retornoNotificacion");
    sessionStorage.setItem("retornoNotificacion", "3");
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/nueva_notificacion']); 
  }

  cargarCuestionario(folio: string) {
    sessionStorage.removeItem("origenhistorico");
    sessionStorage.removeItem('folioExencion');
    sessionStorage.setItem('folioExencion', folio);   
    sessionStorage.setItem("dashboard", "expediente");
    this._router.navigate(['/excencionrevisor']);
  }

  navegaHistorico(flujo:ListaFlujoUno){
    console.log(flujo);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));
    sessionStorage.setItem("dashboard", "expedientes");
    sessionStorage.setItem("origenhistorico", "1");
    this._router.navigate(['/historico']); 
  }

  verExpediente(flujo:ListaFlujoUno){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", flujo.folio);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));

    sessionStorage.setItem("origenhistorico", "2");
    sessionStorage.setItem("dashboard", "expedientes");
    this._router.navigate(['/revisorfuno']); 
  }

 

  verExpediente3(flujo:ListaFlujoUno){

    sessionStorage.setItem('folioExencion', flujo.folio);

    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", flujo.folio);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));

    sessionStorage.setItem("origenhistorico", "2");
    sessionStorage.setItem("origenCuestionario", "excencionrevisor");
    sessionStorage.setItem("dashboard", "expedientes");
    this._router.navigate(['/excencionrevisor']); 
  }

}
