//MDB
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule, TableModule, TabsModule } from 'ng-uikit-pro-standard';
import { ButtonsModule, WavesModule, CollapseModule, NavbarModule,  AccordionModule, } from 'ng-uikit-pro-standard'
import { ToastrModule } from 'ngx-toastr';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { StepperModule } from 'ng-uikit-pro-standard'

//Iconos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Material Angular
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';

//Sistema
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
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
import { ModalsComponent } from './modals/modals.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { NotificacionesComponent } from './page-notificaciones/notificaciones/notificaciones.component';
import { AltaNotificacionComponent } from './page-notificaciones/alta-notificacion/alta-notificacion.component';
import { DetalleNotificacionComponent } from './page-notificaciones/detalle-notificacion/detalle-notificacion.component';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from "./page-tramites/pages.routing";
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { GenerarAdmisionComponent } from './generar-admision/generar-admision.component';
import { VerAdmisionComponent } from './ver-admision/ver-admision.component';
import { ExpedienteHistoricoComponent } from './expediente-historico/expediente-historico.component';
import { AcuerdoAdmisionComponent } from './acuerdo-admision/acuerdo-admision.component';
import { OpinionExencionComponent } from './opinion-exencion/opinion-exencion.component';
import { DetalleOpinionExencionComponent } from './detalle-opinion-exencion/detalle-opinion-exencion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    AltaComponent,
    AltafueraComponent,
    RecuperarComponent,
    ActualizarComponent,
    ActivarComponent,
    DetalleComponent,
    ConsultaComponent,
    PreconsultaComponent,
    CuestionarioeipdpComponent,
    CuestionariorevisorfunoComponent,
    GenerandoComponent,
    Descargaropinionf1Component,
    RiaComponent,
    RevisionriaComponent,
    BandejadosComponent,
    CuestionariodosComponent,
    CuestionariorevisorfdosComponent,
    SolicitarreunionComponent,
    VerreunionComponent,
    PresentarriesgosComponent,
    VerriesgosComponent,
    EmitirdictamenComponent,
    VerdictamenComponent,
    SolicitarinformeComponent,
    CargarinformeComponent,
    VerinformeComponent,
    RiadosComponent,
    RevisionriadosComponent,
    ExencionComponent,
    PreconsultaexencionComponent,
    CuestionarioexencionComponent,
    RespuestaComponent,
    DescargarrespuestaComponent,
    RiaexencionComponent,
    RevisionriaexencionComponent,
    RianopresentadaComponent,
    VerrianopresentadaComponent,
    ModalsComponent,
    NotificacionesComponent,
    AltaNotificacionComponent,
    DetalleNotificacionComponent,
    ExpedientesComponent,
    GenerarAdmisionComponent,
    VerAdmisionComponent,
    ExpedienteHistoricoComponent,
    AcuerdoAdmisionComponent,
    OpinionExencionComponent,
    DetalleOpinionExencionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    WavesModule,
    CollapseModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    PdfJsViewerModule,
    TableModule,
    NavbarModule,
    StepperModule,
    TabsModule.forRoot(),
    AccordionModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forChild(PagesRoutes),
  ],
  //providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
