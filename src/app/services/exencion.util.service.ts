import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ExencionUtilService {
  private MAX_FILE_LENGTH = 2000;

  constructor(private toastr: ToastrService) {
  }

  public mostrarMensaje(texto: string) {
    this.toastr.success(texto,
      '¡Aviso!',
      { positionClass: 'toast-top-full-width',
        closeButton: true });
  }

  public mostrarAviso(texto: string) {
    this.toastr.warning('<span style="font-family: Gotham-Book !important">' + texto + '</span>',
      '¡Aviso!',
      { positionClass: 'toast-top-full-width',
        closeButton: true, enableHtml:true });
  }

  public mostrarError(texto: string) {
    this.toastr.error(texto,
      '¡Error!',
      { positionClass: 'toast-top-full-width',
        closeButton: true, enableHtml:false });
  }

  public isEmpty(valor: string) {
    
    if (valor===undefined) {
      console.log('El campo ' + valor + ' es undefined');
      return true;
    }
    
    if (!valor) {
      console.log('El campo ' + valor + ' esta vacio');
      return true;
    }

    if (valor.trim().length === 0) {
      console.log('El campo ' + valor + ' esta vacio');
      return true;
    }
    return false;
  }

  public validateSize(event) {
    const file = event.target.files[0];
    const size = file.size / 1024;
    if (size > this.MAX_FILE_LENGTH) {
      console.log('Size: ' + size);
      this.mostrarAviso('El archivo no puede exceder los 2 megas...');
      return false;
    }
    return true;
  }

  public validaURL(url: string) {
    return /(http|https):\/\/(\w+:?\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url);
  }
}
