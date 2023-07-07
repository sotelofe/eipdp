import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltafueraComponent } from './altafuera.component';



const routes: Routes = [
  {path:'', component:AltafueraComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaFueraRoutingModule { }
