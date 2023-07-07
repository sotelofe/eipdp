import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AccordionModule, ButtonsModule, CollapseModule, MDBBootstrapModule, NavbarModule, StepperModule, TableModule, TabsModule, WavesModule } from "ng-uikit-pro-standard";
import { PdfJsViewerModule } from "ng2-pdfjs-viewer";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "../app-routing.module";

/**
 * Componentes comunes utilizados en los diferentes formularios, su uso principal es concentrar la mayor parte de código en ellos para en caso de algún cambio este se realice solo en los componentes comunes
 *
 */
 @NgModule({
    declarations: [
     
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
        HttpClientModule
    ],
    exports:[
      
    ]
  })
  export class CommonModules { }