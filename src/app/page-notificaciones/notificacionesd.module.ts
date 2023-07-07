import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesRoutingModule } from './notificaciones/notificaciones-routing.module';
import { DetalleNotificacionesRoutingModule } from './detalle-notificacion/detalle-notificaciones-routing.module';
import { AltaNotificacionesRoutingModule } from './alta-notificacion/alta-notificaciones-routing.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    NotificacionesRoutingModule,
    DetalleNotificacionesRoutingModule,
    AltaNotificacionesRoutingModule
  ]
})
export class NotificacionesModule { }
