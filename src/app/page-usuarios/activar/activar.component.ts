import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { ResponseLogin } from '../../model/responselogin';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from '../../services/usuario.service';
import { ResponseUsuario } from '../../model/responseusuario';
import { ToastrService } from 'ngx-toastr';
import { UsuarioDTO } from '../../model/usuario';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from 'ng-uikit-pro-standard';
import { UsuarioAlta } from '../../model/usuarioalta';
import { RecuperarUsuario } from '../../model/recupera';

@Component({
  selector: 'app-activar',
  templateUrl: './activar.component.html',
  styleUrls: ['./activar.component.scss']
})
export class ActivarComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameOkd', { static: true }) frameOkd: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  @ViewChild('frameConfirm', { static: true }) frameConfirm: ModalDirective;
  @ViewChild('frameConfirmDisabled', { static: true }) frameConfirmDisabled: ModalDirective;
  @ViewChild('frameEliminar', { static: true }) frameEliminar: ModalDirective;

  previous: any = [];
  
  private sesion:ResponseLogin;
  public responseUsuario:ResponseUsuario;
  public user:UsuarioDTO[];
  public color:String;
  public color2:String;
  public textoBusqueda:string;
  public recuperarUsuario:RecuperarUsuario;
  public usu:UsuarioDTO;
  public mensaje:string="";

  constructor(
    private serviceSesion: SesionService,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef,
  ) { 
    this.user = new Array();
    this.responseUsuario = new ResponseUsuario(this.user,"","");
    this.textoBusqueda ="";
  }
  ngAfterViewInit(): void {
    this.iniciarUsuarios();
  }

  @HostListener('input') oninput() {
    this.buscarElementos();
}
  

  ngOnInit() {
    this.serviceSesion.validarInicioSesion();
    this.serviceSesion.sesionVista("activar");
    sessionStorage.setItem("navVis", "/activar");
    this.color = "#424242";
    this.color2= "#00C851";

    
    sessionStorage.removeItem("usuarioDetalle");
  }

  iniciarUsuarios(){
    this.spinner.show();

    this.usuarioService.recuperarUsuarios().subscribe(
      result => {
        this.responseUsuario = result;
       
        if (this.responseUsuario !=null ) {
            if(this.responseUsuario.estatus === "ok"){ 
              this.mdbTable.setDataSource(this.responseUsuario.usuario);
              this.responseUsuario.usuario = this.mdbTable.getDataSource();
              this.previous = this.mdbTable.getDataSource();

              this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
              this.mdbTablePagination.calculateFirstItemIndex();
              this.mdbTablePagination.calculateLastItemIndex();
              this.cdRef.detectChanges();
            }
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

  buscarElementos() {
    const prev = this.mdbTable.getDataSource();
    if (!this.textoBusqueda) {
        this.mdbTable.setDataSource(this.previous);
        this.responseUsuario.usuario = this.mdbTable.getDataSource();
    }
    if (this.textoBusqueda) {
      this.responseUsuario.usuario = this.mdbTable.searchLocalDataBy(this.textoBusqueda);
        this.mdbTable.setDataSource(prev);
    }
  }

  navegarAlta(){
    this._router.navigate(['/alta']);
  }

  irDetalle(usuario:UsuarioDTO){
    sessionStorage.setItem("usuarioDetalle",JSON.stringify(usuario));
    this._router.navigate(['/detalle']);
  }

  setearUsuario(paramUsuario:UsuarioDTO){
    this.usu = paramUsuario;
    this.frameConfirm.show();
  }

  setearUsuarioEliminar(paramUsuario:UsuarioDTO){
    this.usu = paramUsuario;
    this.frameEliminar.show();
  }

  setearUsuariod(paramUsuario:UsuarioDTO){
    this.usu = paramUsuario;
    this.frameConfirmDisabled.show();
  }

  activarUsuario(){
    this.spinner.show();
    this.recuperarUsuario = new RecuperarUsuario("");
    this.recuperarUsuario.emailInstitucional = this.usu.usuario;
    this.usuarioService.activarUsuario( this.recuperarUsuario).subscribe(
      result => {

            this.responseUsuario = result;
          
            if (this.responseUsuario !=null ) {

                if(this.responseUsuario.estatus === "ok"){
                  this.mensaje = "El usuario se ha activado correctamente";
                  this.frameOk.show();

                }else if(this.responseUsuario.estatus === "fail"){
                  this.frameFail.show();
                }else{
                  this.toastr.warning('No se pudo activar el usuario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }
            } else {
              this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }

            setTimeout(() => {
              this.iniciarUsuarios();
              this.spinner.hide();
            }, 1000);
        
      },(error: any) => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );
  }

  desactivarUsuario(){
    this.spinner.show();
    this.recuperarUsuario = new RecuperarUsuario("");
    this.recuperarUsuario.emailInstitucional = this.usu.usuario;
    this.usuarioService.desactivarUsuario( this.recuperarUsuario).subscribe(
      result => {

            this.responseUsuario = result;
          
            if (this.responseUsuario !=null ) {

                if(this.responseUsuario.estatus === "ok"){
                  this.frameOkd.show();

                }else if(this.responseUsuario.estatus === "fail"){
                  this.frameFail.show();
                }else{
                  this.toastr.warning('No se pudo desactivar el usuario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }
            } else {
              this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }

            setTimeout(() => {
              this.iniciarUsuarios();
              this.spinner.hide();
            }, 1000);
        
      },(error: any) => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );
  }

  eliminar(){
   
    let reu:RecuperarUsuario={emailInstitucional:""};
    reu.emailInstitucional = this.usu.usuario;
    this.usuarioService.eliminarUsuario(reu).subscribe(
      result=>{
        let response:ResponseUsuario = result;
          
        if (response !=null ) {

            if(response.estatus === "ok"){
              this.mensaje ="El usuario se ha eliminado correctamente"
              this.frameOk.show();

            }else if(response.estatus === "fail"){
              this.frameFail.show();
            }else{
              this.toastr.warning('No se pudo eliminar el usuario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }
        } else {
          this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
        }

        setTimeout(() => {
          this.iniciarUsuarios();
          this.spinner.hide();
        }, 1000);
      }
    );
  }


  

}
