import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { ResponseLogin } from '../model/responselogin';
import { SesionService } from '../services/sesion.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlujoService } from '../services/flujos.service';
import { ToastrService } from 'ngx-toastr';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { UsuarioDTO } from '../model/usuario';
import { ListaFlujoUno } from '../model/lista_flujo1';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { DescargaService } from '../services/descarga.service';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  private sesion:ResponseLogin;
  public user:UsuarioDTO;
  public usuario:ResponseLogin;
  public lista:ListaFlujoUno[];
  public textoBusqueda:string;
  previous: any = [];
  faFileDownload = faFileDownload;
  faCircle = faCircle;
  faFileAlt = faFileAlt;
  faFileSignature = faFileSignature;
  faFileContract = faFileContract;
  faFileUpload= faFileUpload;
  faNotificacion= faEnvelope;
  faFolder= faFolder;

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
    this.usuario = this.serviceSesion.obtenerSesionUsuario(); 
    console.log("this.usuario.usuario.idPerfil: " + this.usuario.usuario.idPerfil);
    this.user = new UsuarioDTO(this.usuario.usuario.idUsuario,null,"","","","","","","","","","");
    this.lista = new Array();
    this.textoBusqueda ="";
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

  
  ngOnInit() {

    this.serviceSesion.validarInicioSesion();

    this.serviceSesion.sesionVista("tramites");
    sessionStorage.setItem("navVis", "/consulta");
    
  }

  preconsulta(){
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/preconsulta']);
  }

  iniciarBandeja(){
    this.spinner.show();

    this.flujoService.obtenerListaFlujo1(this.user).subscribe(
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
        this.toastr.error('Servicio no disponible...', '¡Error!', { positionClass: 'toast-top-full-width', closeButton: true });
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
    sessionStorage.setItem("dashboard", "consulta");
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
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/opinion']); 
  }

  navegarAcuerdoAdmision(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/admision']); 
  }

  navegarDescargarAdmision(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/veradmision']); 
  }

  navegarDetalleOpinionTecnica(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/opiniontecnica']); 
  }
  
  navegarRia(folio:string){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", folio);
    sessionStorage.setItem("dashboard", "consulta");
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
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/revisorria']); 
  }

  navegarRiaNoPresentadaFu(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "1");
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/rianopresentada']); 
  }

  navegarVerRiaNoPresentadaFu(folio:string){
    sessionStorage.removeItem("folioConsultafDos");
    sessionStorage.removeItem("tipoFlujoRia");
    sessionStorage.setItem("folioConsultafDos", folio);
    sessionStorage.setItem("tipoFlujoRia", "1");
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/verrianopresentada']); 
  }

  navegarNuevaNotificacion(folio:string){
    sessionStorage.removeItem("folioNavegacion");
    sessionStorage.setItem("folioNavegacion", folio);

    sessionStorage.removeItem("retornoNotificacion");
    sessionStorage.setItem("retornoNotificacion", "1");
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/nueva_notificacion']); 
  }

  navegaHistorico(flujo:ListaFlujoUno){
    console.log(flujo);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));
    sessionStorage.setItem("dashboard", "consulta");
    sessionStorage.setItem("origenhistorico", "1");    
    this._router.navigate(['/historico']); 
  }

  verExpediente(flujo:ListaFlujoUno){
    sessionStorage.removeItem("folioConsultafUno");
    sessionStorage.setItem("folioConsultafUno", flujo.folio);

    sessionStorage.removeItem("expedienteHistorico");
    sessionStorage.setItem("expedienteHistorico", JSON.stringify(flujo));

    sessionStorage.setItem("origenhistorico", "2");
    sessionStorage.setItem("origenCuestionario", "revisorfuno");
    sessionStorage.setItem("dashboard", "consulta");
    this._router.navigate(['/revisorfuno']); 
  }

}
