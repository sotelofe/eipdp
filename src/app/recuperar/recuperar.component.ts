import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioAlta } from '../model/usuarioalta';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecuperarUsuario } from '../model/recupera';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from '../services/usuario.service';
import { ResponseUsuario } from '../model/responseusuario';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;

  public formUsuario: UsuarioAlta;
  public recuperarUsuario:RecuperarUsuario;
  public responseUsuario:ResponseUsuario;

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService
  ) { 
    this.formUsuario = new UsuarioAlta("", "", "", "", "", "", "", "", "", "");
    this.recuperarUsuario = new RecuperarUsuario("");
  }

  ngOnInit() {
   
  }


  recuperar():void{
    let hasEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.formUsuario.emailInstitucional);
    if(!hasEmail){
      this.toastr.error('Error Ingresa un formato valido para el email', '', { positionClass: 'toast-top-full-width', closeButton: true });
      return;
    }else{
      this.recuperarUsuario.emailInstitucional = this.formUsuario.emailInstitucional;

      this.spinner.show();

      this.usuarioService.recuperarUsuario(this.recuperarUsuario).subscribe(
        result => {

              this.responseUsuario = result;
            
              if (this.responseUsuario !=null ) {

                  if(this.responseUsuario.estatus === "ok"){
                    this.frameOk.show();
                  }else if(this.responseUsuario.estatus === "noexiste"){
                    this.frameFail.show();
                  }else{
                    this.toastr.warning('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                  }
              } else {
                this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
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
  }

  cancelar():void{
    this._router.navigate(['/login']);
  }

}
