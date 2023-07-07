import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { ResponseLogin } from '../model/responselogin';
import { SesionService } from '../services/sesion.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { ListaFlujoUno } from '../model/lista_flujo1';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import {ExcencionService} from '../services/excencion.service';
import {ExencionUtilService} from '../services/exencion.util.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consulta',
  templateUrl: './exencion.component.html',
  styleUrls: ['./exencion.component.scss']
})
export class ExencionComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  public usuario:ResponseLogin;
  public lista:ListaFlujoUno[];
  public textoBusqueda:string;
  public previous: any = [];
  public faFileDownload = faFileDownload;
  public faCircle = faCircle;
  public faFileAlt = faFileAlt;
  public faFileSignature = faFileSignature;
  public faFileContract = faFileContract;
  public faFileUpload= faFileUpload;
  public ETAPA4 = 'RIA';
  public ETAPA5 = 'Revisión RIA';
  public ETAPA_CANCELADO = 'Cancelado';
  public ETAPA1 ='Revisión';
  public ETAPA2 ='Acuerdo de admisión';
  public ETAPA3 ='Generando opinión técnica';
  public ETAPA6 ='Opinión técnica emitida-finalizado';
  public ETAPA7 ='RIA no presentada';
  public ETAPA8 ='Acuerdo de no presentación-finalizado';
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
  faNotificacion= faEnvelope;
  faFolder= faFolder;

  @HostListener('input') oninput() {
    this.buscarElementos();
  }

  constructor(
    private serviceSesion: SesionService,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private excencionService: ExcencionService,
    private exencionUtil: ExencionUtilService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
    console.log('Perfil: ' + this.usuario.usuario.idPerfil);
    this.lista = [];
    this.textoBusqueda ='';
  }

  ngAfterViewInit(): void {
    this.iniciarBandeja();
  }

  ngOnInit() {
    this.serviceSesion.validarInicioSesion();
    this.serviceSesion.sesionVista('tramites');
    sessionStorage.setItem('navVis', '/tramites');
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

  cuestionario(){
    sessionStorage.setItem("dashboard", "exencion");
    this._router.navigate(['/preconsultaexencion']);
  }

  cargarCuestionario(folio: string) {
    sessionStorage.removeItem("origenhistorico");
    sessionStorage.removeItem('folioExencion');
    sessionStorage.setItem('folioExencion', folio);
    sessionStorage.setItem("dashboard", "exencion");
    this._router.navigate(['/excencionrevisor']);
  }

  iniciarBandeja(){
    this.spinner.show();
    this.excencionService.consultarFlujo(this.usuario.usuario.idUsuario).subscribe(
      result => {
        if(result.code !== 0) {
          console.log('Respuesta: ' + JSON.stringify(result));
        }
        this.lista = result.payload == null ? new Array() : result.payload;
        if (this.lista != null) {
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
      },(error: any) => {
        console.log(error);
        this.spinner.hide();
        this.exencionUtil.mostrarError('Servicio no disponible');
      }
    );
  }

  descargaCuestionario(folio:string){
 
    this.excencionService.descargarArchivo(folio);
  }

  descargaDocumento(folio:string, pregunta:string){
    this.excencionService.descargarDocumentos(folio,pregunta);
  }

  navegar(folio:string, id:number) {
    sessionStorage.setItem('folioExencion', folio);
    
    if(id === this.CARGAR_RESPUESTA) {
      sessionStorage.setItem("dashboard", "exencion");
      this._router.navigate(['/cargarrespuestaexencion']);
    }
    if(id === this.DETALLE_RESPUESTA) {
      sessionStorage.setItem("dashboard", "exencion");
      this._router.navigate(['/detallerespuestaexencion']);
    }
    if(id === this.CARGAR_RIA) {
      sessionStorage.setItem("dashboard", "exencion");
      this._router.navigate(['/cargarriaexencion']);
    }
    if(id === this.REVISAR_RIA) {
      sessionStorage.setItem("dashboard", "exencion");
      this._router.navigate(['/revisarriaexencion']);
    }
    if(id === this.CARGAR_OPINION) {
      sessionStorage.setItem("dashboard", "exencion");
      this._router.navigate(['/opinion-exencion']);
    }
    if(id === this.DESCARGAR_OPINION) {
      sessionStorage.setItem("dashboard", "exencion");
      this._router.navigate(['/detalle-opinion-exencion']);
    }
  }

  navegarRiaNoPresentada(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "3");
    sessionStorage.setItem("dashboard", "exencion");
    this._router.navigate(['/rianopresentada']); 
  }

  navegarVerRiaNoPresentada(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "3");
    sessionStorage.setItem("dashboard", "exencion");
    this._router.navigate(['/verrianopresentada']); 
  }

  navegarNuevaNotificacion(folio:string){
    sessionStorage.removeItem("folioNavegacion");
    sessionStorage.setItem("folioNavegacion", folio);

    sessionStorage.removeItem("retornoNotificacion");
    sessionStorage.setItem("retornoNotificacion", "3");
    sessionStorage.setItem("dashboard", "exencion");
    this._router.navigate(['/nueva_notificacion']); 
  }


  navegaHistorico(flujo:ListaFlujoUno){
    console.log(flujo);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));
    sessionStorage.setItem("dashboard", "exencion");
    sessionStorage.setItem("origenhistorico", "1");    
    this._router.navigate(['/historico']); 
  }

  verExpediente(flujo:ListaFlujoUno){

    sessionStorage.setItem('folioExencion', flujo.folio);

    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", flujo.folio);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));

    sessionStorage.setItem("origenhistorico", "2");
    sessionStorage.setItem("origenCuestionario", "excencionrevisor");
    sessionStorage.setItem("dashboard", "exencion");
    this._router.navigate(['/excencionrevisor']); 
  }
  

}
