import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  @ViewChild('frameModalAviso', { static: true }) frameModalAviso: ModalDirective;
  mensaje:string='';

  constructor() { }

  ngOnInit(): void {
  
  }

  public mostrarModal(mensaje:string){
    this.mensaje = mensaje;
    this.frameModalAviso.show();
  }

}
