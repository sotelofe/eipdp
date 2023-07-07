import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivarComponent } from './activar.component';




const routes: Routes = [
  {path:'', component:ActivarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivarNotificacionesRoutingModule { }
