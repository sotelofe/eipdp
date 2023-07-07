import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AltaComponent } from './page-usuarios/alta/alta.component';
import { AltafueraComponent } from './altafuera/altafuera.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { ActivarComponent } from './page-usuarios/activar/activar.component';
import { DetalleComponent } from './page-usuarios/detalle/detalle.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { PreconsultaComponent } from './preconsulta/preconsulta.component';
import { CuestionarioeipdpComponent } from './cuestionarioeipdp/cuestionarioeipdp.component';
import { CuestionariorevisorfunoComponent } from './cuestionariorevisorfuno/cuestionariorevisorfuno.component';
import { GenerandoComponent } from './generando/generando.component';
import { Descargaropinionf1Component } from './descargaropinionf1/descargaropinionf1.component';
import { RiaComponent } from './ria/ria.component';
import { RevisionriaComponent } from './revisionria/revisionria.component';
import { BandejadosComponent } from './bandejados/bandejados.component';
import { CuestionariodosComponent } from './cuestionariodos/cuestionariodos.component';
import { CuestionariorevisorfdosComponent } from './cuestionariorevisorfdos/cuestionariorevisorfdos.component';
import { SolicitarreunionComponent } from './solicitarreunion/solicitarreunion.component';
import { VerreunionComponent } from './verreunion/verreunion.component';
import { PresentarriesgosComponent } from './presentarriesgos/presentarriesgos.component';
import { VerriesgosComponent } from './verriesgos/verriesgos.component';
import { EmitirdictamenComponent } from './emitirdictamen/emitirdictamen.component';
import { VerdictamenComponent } from './verdictamen/verdictamen.component';
import { SolicitarinformeComponent } from './solicitarinforme/solicitarinforme.component';
import { CargarinformeComponent } from './cargarinforme/cargarinforme.component';
import { VerinformeComponent } from './verinforme/verinforme.component';
import { RiadosComponent } from './riados/riados.component';
import { RevisionriadosComponent } from './revisionriados/revisionriados.component';
import {ExencionComponent} from './exencion/exencion.component';
import {PreconsultaexencionComponent} from './preconsultaexencion/preconsultaexencion.component';
import {CuestionarioexencionComponent} from './cuestionarioexcencion/cuestionarioexencion.component';
import {RespuestaComponent} from './respuestaexencion/respuesta.component';
import {DescargarrespuestaComponent} from './respuestadescargaexcencion/descargarrespuesta.component';
import {RiaexencionComponent} from './riaexencion/riaexencion.component';
import {RevisionriaexencionComponent} from './revisionriaexencion/revisionriaexencion.component';
import { RianopresentadaComponent } from './rianopresentada/rianopresentada.component';
import { VerrianopresentadaComponent } from './verrianopresentada/verrianopresentada.component';
import { NotificacionesComponent } from './page-notificaciones/notificaciones/notificaciones.component';
import { AltaNotificacionComponent } from './page-notificaciones/alta-notificacion/alta-notificacion.component';
import { DetalleNotificacionComponent } from './page-notificaciones/detalle-notificacion/detalle-notificacion.component';
import { AuthGuard } from './guards/auth.guard';
import { ActualizarRoutingModule } from './actualizar/actualizar-routing.module';

export const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'eipdplogin', component:LoginComponent},
  {path: 'actualizar',component:ActualizarComponent},

  { 
    path: 'usuarios', 
    loadChildren: () => import('./page-usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  { 
    path: 'registrar', 
    loadChildren: () => import('./altafuera/alta-fuera-routing.module').then(m => m.AltaFueraRoutingModule),     
  },
  { 
    path: 'recuperar', 
    loadChildren: () => import('./recuperar/recuperar-routing.module').then(m => m.RecuperarRoutingModule),    
  },  
  { 
    path: 'inicio', 
    loadChildren: () => import('./inicio/inicio-routing.module').then(m => m.InicioRoutingModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },  
  { 
    path: 'notificaciones', 
    loadChildren: () => import('./page-notificaciones/notificaciones/notificaciones-routing.module').then(m => m.NotificacionesRoutingModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  { 
    path: 'detalle_notificacion', 
    loadChildren: () => import('./page-notificaciones/detalle-notificacion/detalle-notificaciones-routing.module').then(m => m.DetalleNotificacionesRoutingModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  { 
    path: 'nueva_notificacion', 
    loadChildren: () => import('./page-notificaciones/alta-notificacion/alta-notificaciones-routing.module').then(m => m.AltaNotificacionesRoutingModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
   },
   { 
    path: 'activar', 
    loadChildren: () => import('./page-usuarios/activar/activar-usuario-routing.module').then(m => m.ActivarNotificacionesRoutingModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
   },
   { 
    path: 'alta', 
    loadChildren: () => import('./page-usuarios/alta/alta-usuario-routing.module').then(m => m.AltaNotificacionesRoutingModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
   },
   { 
    path: 'detalle', 
    loadChildren: () => import('./page-usuarios/detalle/detalle-usuario-routing.module').then(m => m.DetalleNotificacionesRoutingModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
   },
   
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
