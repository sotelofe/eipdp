import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleNotificacionComponent } from './detalle-notificacion.component';



const routes: Routes = [
  {path: '', component: DetalleNotificacionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleNotificacionesRoutingModule { }
