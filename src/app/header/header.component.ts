import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { ResponseLogin } from '../model/responselogin';
import { ManualesService } from '../services/manuales.service';
import { ManualesDTO } from '../model/manuales.dto';
import { Documentos } from '../model/documentos';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { ResponseArchivo } from '../model/response-archivo';
import { UsuarioDTO } from '../model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('frameManuales', { static: true }) frameManuales: ModalDirective;
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  public aliasUsuario:string;
  public paginaActual:string;
  public usuario:ResponseLogin;
  public inicio:boolean;
  public alta_usuario:boolean;
  public activar_usuario:boolean;
  public eipdp:boolean;
  public consulta:boolean;
  public presentacion:boolean;
  public exencion:boolean;
  public notificacion:boolean;
  public manuales:boolean;
  public documento:Documentos;
  public titulo:string;
  public archivo:ResponseArchivo={base64:"",estatus:""};
  public usuariop:UsuarioDTO;

  public menu1:string;
  public menu2:string;
  public menu3:string;
  public menu4:string;
  public menu5:string;
  public menu6:string;
  public menu7:string;
  public menu8:string;
  public menu9:string;
  public listaManuales:ManualesDTO[]=[];
  public muestraIcono:boolean=false;
  public nombreDocumento:string="";


  constructor(private serviceSesion:SesionService,
    private _router: Router,
    private manualService:ManualesService) { 
    this.inicio=false;
    this.alta_usuario=false;
    this.activar_usuario=false;
    this.eipdp=false;
    this.consulta=false;
    this.presentacion=false;
    this.exencion=false;
    this.notificacion=false;
    this.manuales=false;
    this.usuarioLogueado();
    
   
    this.menu1="";
    this.menu2="";
    this.menu3="";
    this.menu4="";
    this.menu5="";
    this.menu6="";
    this.menu7="";
    this.menu8="";
    this.menu9="";
    
  }
 

  ngOnInit() {
    this.documento = new Documentos("Manual.pdf","");
    this.vistaActual();
    this.permisosMenu();
    this.obtenerManuales();
  }

  ngAfterViewInit(): void {
   
  }

  obtenerManuales(){
    this.manualService.obtenerManuales().subscribe(
      result=>{
        this.listaManuales = result
        console.log(this.listaManuales);
      }
    );
  }

  usuarioLogueado(){
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
    this.aliasUsuario = this.usuario.usuario.usuario;
  }

  vistaActual(){
    this.paginaActual = this.serviceSesion.obtenerSesionVista();
  }

  cerrarSesion(){
    this.serviceSesion.limpiarSesion();
  }

  permisosMenu():void{
    this.usuario.listaMenus.forEach((me)=>{
      console.log(me.menu);
        if(me.menuNav==="inicio"){
          this.inicio = true;
          this.menu1=me.menu;
        }

        if(me.menuNav==="alta"){
          this.alta_usuario = true;
          this.menu2=me.menu;
        }

        if(me.menuNav==="activar"){
          this.activar_usuario = true;
          this.menu3=me.menu;
        }

        if(me.menuNav==="eipdp"){
          this.eipdp = true;
          this.menu4=me.menu;
        }

        if(me.menuNav==="consulta"){
          this.consulta = true;
          this.menu5=me.menu;
        }

        if(me.menuNav==="presentacion"){
          this.presentacion = true;
          this.menu6=me.menu;
        }

        if(me.menuNav==="exencion"){
          this.exencion = true;
          this.menu7=me.menu;
        }

        if(me.menuNav==="notificaciones"){
          this.notificacion = true;
          this.menu8=me.menu;
        }

        if(me.menuNav==="manuales"){
          this.manuales = true;
          this.menu9=me.menu;
        }
    });
  }

  metodo(nombre:string, titulo:string){
    this.documento = new Documentos(nombre,"");
    this.titulo = titulo;
    this.nombreDocumento = nombre;
    this.manualService.obtenerBytesManuales(nombre).subscribe(
      result=>{        
        console.log(result);
        this.archivo = result;      
        const blob = this.base64toBlob(this.archivo.base64,'application/pdf');
        
        this.pdfViewerOnDemand.pdfSrc = blob; 
        this.pdfViewerOnDemand.refresh();
      }
    );
    let str1 = "Formato";
    let formato = nombre.substring(0,7)
    
    if(str1 === formato){
        this.muestraIcono=true;
    }else{
        this.muestraIcono=false;
    }    

    this.frameManuales.show();
  }

  getExtension(nombre:string){
    let indice = nombre.indexOf(".");
    let extension = nombre.substring(indice+1);   
    console.log(extension);
    if(extension === 'pdf'){
      return 'application/pdf';
    }else{
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
  }

  private base64toBlob(base64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  modificarCuenta(){   
    sessionStorage.setItem("usuarioDetalleDos","2");
    this._router.navigate(['/detalle']);

  }

  descargaWord(){
    let no = this.nombreDocumento.substring(0,this.nombreDocumento.indexOf("."));
    this.manualService.descargarFormato(no);
  }

}
