import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { DescargaService } from '../services/descarga.service';
import { ToastrService } from 'ngx-toastr';
import { FlujoService } from '../services/flujos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service';
import { ListaFlujoUno } from '../model/lista_flujo1';
import { ResponseLogin } from '../model/responselogin';
import { UsuarioDTO } from '../model/usuario';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'ng-uikit-pro-standard';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SubeDocumento } from '../model/sube.documento';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bandejados',
  templateUrl: './bandejados.component.html',
  styleUrls: ['./bandejados.component.scss']
})
export class BandejadosComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('frame', { static: true }) frame: ModalDirective;
  public textoBusqueda:string;
  public lista:ListaFlujoUno[];
  public user:UsuarioDTO;
  public usuario:ResponseLogin;
  previous: any = [];
  faFileDownload = faFileDownload;
  faCircle = faCircle;
  faFileAlt = faFileAlt;
  faFileSignature = faFileSignature;
  faFileContract = faFileContract;
  faFileUpload= faFileUpload;
  faUserTie= faUserTie;
  faExclamationCircle = faExclamationCircle;
  faFileInvoice = faFileInvoice;
  faUserFriends = faUserClock;
  faExclamationTriangle = faExclamationTriangle;
  faNotificacion= faEnvelope;
  faFolder= faFolder;
  public folioEliminarNovinculantes:string="";

  @HostListener('input') oninput() {
    this.buscarElementos();
  }


  constructor(
    private serviceSesion: SesionService,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private flujoService: FlujoService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef,
    private descargaService: DescargaService,
  ) { 
    sessionStorage.removeItem("origenhistorico");
    this.usuario = this.serviceSesion.obtenerSesionUsuario(); 
    console.log("this.usuario.usuario.idPerfil: " + this.usuario.usuario.idPerfil);
    this.user = new UsuarioDTO(this.usuario.usuario.idUsuario,null,"","","","","","","","","","");
    this.lista = new Array();
    this.textoBusqueda ="";
  }

  ngOnInit(): void {
    this.serviceSesion.validarInicioSesion();
    this.serviceSesion.sesionVista("tramites");
    sessionStorage.setItem("navVis", "/presentacion");
  }

  pcuestionario(){
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/pcuestionario']);
  }

  ngAfterViewInit(): void {
    this.iniciarBandeja();
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


  iniciarBandeja(){
    this.spinner.show();

    this.flujoService.obtenerListaFlujo2(this.user).subscribe(
      result => {
        this.lista = result;
       console.log(this.lista);
        if (this.lista !=null ) {
           
              this.mdbTable.setDataSource(this.lista);
              this.lista = this.mdbTable.getDataSource();
              this.previous = this.mdbTable.getDataSource();

              this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
              this.mdbTablePagination.calculateFirstItemIndex();
              this.mdbTablePagination.calculateLastItemIndex();
              this.cdRef.detectChanges();
            
        } 

        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        
      },(error: any) => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );
  }

  descargaCuestionarioF2(folio:string){
    this.descargaService.descargaCuestionarioF2(folio);
  }

  navegarPrecargaCuestionarioF2(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
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
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/solicitarReunion']); 
  }
  
  solicitudesReunion(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/verReunion']); 
  }

  presentarRiesgos(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/presentarRiesgos']); 
  }
  
  verRiesgos(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
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
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/emitirDictamen']); 
  }

  verDictamen(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/verDictamen']);
  }
  
  navegarSolicitarInforme(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/solicitarInforme']);
  }
  
  cargarInforme(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/cargarInforme']);
  }
  
  verInforme(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/verInforme']);
  }

  navegarRia(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/riados']); 
  }

  descargaRiaSolicitada(folio:string){
    console.log(folio);
    while(folio.indexOf("/") != -1){
      folio = folio.replace("/","");
    }
    console.log(folio);
    this.descargaService.descargaDocumentoPorNombreF1RiaSolicitada2(folio);
  }

  descargaRiaEnviada(folio:string){
    while(folio.indexOf("/") != -1){
      folio = folio.replace("/","");
    }
    this.descargaService.descargaDocumentoPorNombreF1RiaEnviada2(folio);
  }

  navegarRevisionRia(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/drevisorria']); 
  }

  navegarRiaNoPresentada(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "2");
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/rianopresentada']); 
  }

  navegarVerRiaNoPresentada(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "2");
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/verrianopresentada']); 
  }

  navegarNuevaNotificacion(folio:string){
    sessionStorage.removeItem("folioNavegacion");
    sessionStorage.setItem("folioNavegacion", folio);

    sessionStorage.removeItem("retornoNotificacion");
    sessionStorage.setItem("retornoNotificacion", "2");
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/nueva_notificacion']); 
  }

  navegarAcuerdoAdmision(folio:string){
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

  navegarDescargarAdmision(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/veradmision']); 
  }

  navegaHistorico(flujo:ListaFlujoUno){
    console.log(flujo);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));
    sessionStorage.setItem("dashboard", "presentacion");
    sessionStorage.setItem("origenhistorico", "1");    
    this._router.navigate(['/historico']); 
  }

  verExpediente(flujo:ListaFlujoUno){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.setItem("folioConsultafDos", flujo.folio);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));

    sessionStorage.setItem("origenhistorico", "2");
    sessionStorage.setItem("origenCuestionario", "revisorfdos");
    sessionStorage.setItem("dashboard", "presentacion");
    this._router.navigate(['/revisorfdos']); 
  }

}
