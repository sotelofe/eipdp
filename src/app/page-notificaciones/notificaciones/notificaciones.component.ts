import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'ng-uikit-pro-standard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListaNotificaciones } from '../../model/lista.notificaciones';
import { NotificacionesDTO } from '../../model/notificaciones';
import { ResponseLogin } from '../../model/responselogin';
import { NotificacionesService } from '../../services/notificacion.service';
import { SesionService } from '../../services/sesion.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UploadF } from '../../model/upload';
import { Propagar } from '../../model/propagar';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  @ViewChild('frameAlta', { static: true }) frameAlta: ModalDirective;
  @ViewChild('frameDetalle', { static: true }) frameDetalle: ModalDirective;
  public textoBusqueda:string="";
  public listaNotificaciones:NotificacionesDTO[]=[];
  public lisNoti:ListaNotificaciones={listaNotificaciones:this.listaNotificaciones};
  public usuarioSesion:ResponseLogin;
  previous: any = [];
  faDetalle= faEnvelope;
  faEliminar= faTrash;

  constructor(
    private notiService:NotificacionesService,
    private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private usuarioService:SesionService,
    private _router: Router,
  ) { }

  @HostListener('input') oninput() {
    this.buscarElementos();
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.recuperarListaNotificaciones();
  }

  recuperarListaNotificaciones(){
    this.usuarioSesion = this.usuarioService.obtenerSesionUsuario();
    let noti = new NotificacionesDTO(null,this.usuarioSesion.usuario.idUsuario,this.usuarioSesion.usuario.idPerfil,'','','','',null,null,'','','',"","","",null,null,"","");
    this.spinner.show();
    this.notiService.recuperaNotificaciones(noti).subscribe(
      result=>{
            console.log(result);
            this.lisNoti.listaNotificaciones=result.notificaciones;

            if (this.lisNoti.listaNotificaciones !=null ) {
              
                this.mdbTable.setDataSource(this.lisNoti.listaNotificaciones);
                this.lisNoti.listaNotificaciones = this.mdbTable.getDataSource();
                this.previous = this.mdbTable.getDataSource();

                this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
                this.mdbTablePagination.calculateFirstItemIndex();
                this.mdbTablePagination.calculateLastItemIndex();
                this.cdRef.detectChanges();              
          } 

          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
      }
    );
  }

  buscarElementos() {
    const prev = this.mdbTable.getDataSource();
    if (!this.textoBusqueda) {
        this.mdbTable.setDataSource(this.previous);
        this.lisNoti.listaNotificaciones = this.mdbTable.getDataSource();
    }
    if (this.textoBusqueda) {
      this.lisNoti.listaNotificaciones = this.mdbTable.searchLocalDataBy(this.textoBusqueda);
        this.mdbTable.setDataSource(prev);
    }
  }

  navegarAlta(){
    sessionStorage.setItem("retornoNotificacion","4")
    sessionStorage.removeItem("folioNavegacion");    
    this._router.navigate(['/nueva_notificacion']);
    
  }

  bajaNotificaciones(noti:NotificacionesDTO){
    console.log(noti);
    this.spinner.show();
    this.notiService.bajaNotificaciones(noti).subscribe(
      result=>{        
        setTimeout(() => {
          this.spinner.hide();
          this.frameAlta.show();
          this.recuperarListaNotificaciones();
        }, 1000);
      }
    );
  }

  detalleNotificaciones(noti:NotificacionesDTO){
    sessionStorage.removeItem("detalleNoti");
    sessionStorage.setItem("detalleNoti",JSON.stringify(noti));
    this._router.navigate(['/detalle_notificacion']);
  }

  regresar(cerrar:Boolean){
    this.frameDetalle.hide();
  }

  enviarMensaje(propagar:Propagar){
    console.log(propagar.respuesta);
    console.log(propagar.upload);
    this.frameDetalle.hide();
  }
 
  actualizar(){
    this.recuperarListaNotificaciones();
  }

}
