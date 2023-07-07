import { Component, OnInit, ViewChild } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { ResponseLogin } from '../model/responselogin';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  @ViewChild('frameConfirm', { static: true }) frameConfirm: ModalDirective;
  private sesion:ResponseLogin;

  constructor( 
    private serviceSesion: SesionService,
    private _router: Router,
    ) {
    
   }

  ngOnInit(){

    this.sesion = this.serviceSesion.obtenerSesionUsuario();
    if(this.sesion == null || this.sesion.usuario.usuario === ""){
      this._router.navigate(["/login"]);
    }

    this.serviceSesion.sesionVista("inicio");
    sessionStorage.setItem("navVis","/inicio");
  }

  nuevo(){
    this.frameConfirm.show();
  }

  navega(ruta:string){
    if(ruta === 'consulta'){
      this._router.navigate(["/preconsulta"]);
    }else if(ruta === 'presentacion'){
      this._router.navigate(["/pcuestionario"]);
    }else if(ruta === 'exencion'){
      this._router.navigate(["/preconsultaexencion"]);
    }else if(ruta === 'expedientes'){
      this._router.navigate(["/expedientes"]);
    }
  }

}
