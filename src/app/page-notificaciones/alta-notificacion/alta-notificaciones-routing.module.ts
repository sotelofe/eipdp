import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaNotificacionComponent } from './alta-notificacion.component';



const routes: Routes = [
  {path: '', component: AltaNotificacionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaNotificacionesRoutingModule { }
