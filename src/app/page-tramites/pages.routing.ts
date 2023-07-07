
import { Routes } from "@angular/router";
import { AcuerdoAdmisionComponent } from "../acuerdo-admision/acuerdo-admision.component";
import { BandejadosComponent } from "../bandejados/bandejados.component";
import { CargarinformeComponent } from "../cargarinforme/cargarinforme.component";
import { ConsultaComponent } from "../consulta/consulta.component";
import { CuestionariodosComponent } from "../cuestionariodos/cuestionariodos.component";
import { CuestionarioeipdpComponent } from "../cuestionarioeipdp/cuestionarioeipdp.component";
import { CuestionarioexencionComponent } from "../cuestionarioexcencion/cuestionarioexencion.component";
import { CuestionariorevisorfdosComponent } from "../cuestionariorevisorfdos/cuestionariorevisorfdos.component";
import { CuestionariorevisorfunoComponent } from "../cuestionariorevisorfuno/cuestionariorevisorfuno.component";
import { Descargaropinionf1Component } from "../descargaropinionf1/descargaropinionf1.component";
import { DetalleOpinionExencionComponent } from "../detalle-opinion-exencion/detalle-opinion-exencion.component";
import { EmitirdictamenComponent } from "../emitirdictamen/emitirdictamen.component";
import { ExencionComponent } from "../exencion/exencion.component";
import { ExpedienteHistoricoComponent } from "../expediente-historico/expediente-historico.component";
import { ExpedientesComponent } from "../expedientes/expedientes.component";
import { GenerandoComponent } from "../generando/generando.component";
import { GenerarAdmisionComponent } from "../generar-admision/generar-admision.component";
import { AuthGuard } from "../guards/auth.guard";
import { OpinionExencionComponent } from "../opinion-exencion/opinion-exencion.component";
import { PreconsultaComponent } from "../preconsulta/preconsulta.component";
import { PreconsultaexencionComponent } from "../preconsultaexencion/preconsultaexencion.component";
import { PresentarriesgosComponent } from "../presentarriesgos/presentarriesgos.component";
import { DescargarrespuestaComponent } from "../respuestadescargaexcencion/descargarrespuesta.component";
import { RespuestaComponent } from "../respuestaexencion/respuesta.component";
import { RevisionriaComponent } from "../revisionria/revisionria.component";
import { RevisionriadosComponent } from "../revisionriados/revisionriados.component";
import { RevisionriaexencionComponent } from "../revisionriaexencion/revisionriaexencion.component";
import { RiaComponent } from "../ria/ria.component";
import { RiadosComponent } from "../riados/riados.component";
import { RiaexencionComponent } from "../riaexencion/riaexencion.component";
import { RianopresentadaComponent } from "../rianopresentada/rianopresentada.component";
import { SolicitarinformeComponent } from "../solicitarinforme/solicitarinforme.component";
import { SolicitarreunionComponent } from "../solicitarreunion/solicitarreunion.component";
import { VerAdmisionComponent } from "../ver-admision/ver-admision.component";
import { VerdictamenComponent } from "../verdictamen/verdictamen.component";
import { VerinformeComponent } from "../verinforme/verinforme.component";
import { VerreunionComponent } from "../verreunion/verreunion.component";
import { VerrianopresentadaComponent } from "../verrianopresentada/verrianopresentada.component";
import { VerriesgosComponent } from "../verriesgos/verriesgos.component";




/** DBR - Rutas y navegacion entre todos los modulos */
export const PagesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path:'consulta', 
        component:ConsultaComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: "presentacion",
        component: BandejadosComponent,        
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'preconsulta', 
        component:PreconsultaComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'cuestionarioeipdp', 
        component:CuestionarioeipdpComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'revisorfuno', 
        component:CuestionariorevisorfunoComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'opinion', 
        component:GenerandoComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'opiniontecnica', 
        component:Descargaropinionf1Component,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'ria', 
        component:RiaComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'revisorria', 
        component:RevisionriaComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },    
      {
        path:'pcuestionario', 
        component:CuestionariodosComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'revisorfdos', 
        component:CuestionariorevisorfdosComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'solicitarReunion', 
        component:SolicitarreunionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'verReunion', 
        component:VerreunionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'presentarRiesgos', 
        component:PresentarriesgosComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'verRiesgos', 
        component:VerriesgosComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'emitirDictamen', 
        component:EmitirdictamenComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'verDictamen', 
        component:VerdictamenComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'solicitarInforme',
        component:SolicitarinformeComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'cargarInforme', 
        component:CargarinformeComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'verInforme', 
        component:VerinformeComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'riados', 
        component:RiadosComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path:'drevisorria', 
        component:RevisionriadosComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'exencion', 
        component: ExencionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'preconsultaexencion', 
        component: PreconsultaexencionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'excencionrevisor', 
        component: CuestionarioexencionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'cargarrespuestaexencion', 
        component: RespuestaComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'detallerespuestaexencion', 
        component: DescargarrespuestaComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'cargarriaexencion', 
        component: RiaexencionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'revisarriaexencion', 
        component: RevisionriaexencionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'rianopresentada', 
        component: RianopresentadaComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'verrianopresentada', 
        component: VerrianopresentadaComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'expedientes', 
        component: ExpedientesComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'admision', 
        component: GenerarAdmisionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'veradmision', 
        component: VerAdmisionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'historico', 
        component: ExpedienteHistoricoComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'acuerdo-admision', 
        component: AcuerdoAdmisionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'opinion-exencion', 
        component: OpinionExencionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'detalle-opinion-exencion', 
        component: DetalleOpinionExencionComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
    ],
  },
];

