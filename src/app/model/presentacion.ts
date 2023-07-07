import { UploadF } from './upload';
import { TipoTratamiento } from './tipo.tratamiento';
import { Servidor } from './servidor';
import { FormArray, FormGroup } from '@angular/forms';
import { Archivo } from './archivo';
import { FormaRecaban } from './forma.recaban';
import { Tratamiento } from './tratamientos';
import { ListaParticular } from './lista.particular';

export class Presentacion{
    public listaParticular:ListaParticular[] = [];

    constructor(
        public denominacion:string,
        public nomPolPub:string,
        public objGen:string,
        public objEsp:string,
        public listaServidor:Servidor[],
        public objetivosGenerales:String,
        public objetivosEspecificos:String,
        public objetivosLegal:String,
        public hipervinculo:String,
        public categorias:String,
        public grupVul:String,
        public datPerTra:String,
        public datPerSen:String,
        public finTra:String,
        public nuProTra:String,
        public formaRecaban:FormaRecaban,
        public viDePro:String,
        public fuProDat:String,
        public traDatPer:string,
        public tipTraDatPer:string,
        public secTraDatPer:string,
        public tieDurTra:string,
        public intRel:string,
        public medSeg:string,
        public infoAdi:string,
        public susIdo:string,
        public proEst:string,
        public equFun:string,
        public checkTipoTratamiento:TipoTratamiento,
        public otroTratamiento:string,
        public fueInt:string,
        public areGruPer:string,
        public traEnc:string,  
        public serNub:string,  
        public traResp:string,
        public traRespSec:string,
        public plaConAlm:string,
        public tecUti:string,
        public ideDes:string,
        public ponCuan:string,
        public medCon:string,
        public cumPri:string,
        public cumDeb:string,
        public cumEsp:string,
        public vinEje:string,
        public conExt:string,
        public reaOpi:string,
        public descGen:string,
        public descAne:string,
        public evaUno:string,
        public evaDos:string,
        public evaTres:string,
        public radioEvaluacionImpacto:string,
        public archivo1:UploadF,
        public archivo2:UploadF,
        public archivo3:UploadF,
        public archivo4:UploadF,
        public archivo5:UploadF,
        public archivo6:UploadF,
        public archivo7:UploadF,
        public archivo8:UploadF,
        public idUsuario:number,
        public tratamiento:Tratamiento,
    ){}

    public presentacionMatch(form:FormGroup){
        this.denominacion = form.value.denominacion;
        this.nomPolPub = form.value.nomPolPub;
        this.objGen = form.value.objGen;
        this.objEsp = form.value.objEsp;
        this.archivo1 = form.value.archivo1;
        this.hipervinculo = form.value.hipervinculo;
        this.nuProTra = form.value.nuProTra;
        this.infoAdi = form.value.infoAdi;
        this.archivo2 = form.value.archivo2;
        this.archivo3 = form.value.archivo3;
        this.otroTratamiento = form.value.otroTratamiento;
        this.descGen = form.value.descGen;
        this.descAne = form.value.descAne;
        this.evaUno = form.value.evaUno;
        this.evaDos = form.value.evaDos;
        this.evaTres = form.value.evaTres;
        this.archivo4 = form.value.archivo4;
        this.archivo5 = form.value.archivo5;
        this.archivo6 = form.value.archivo6;
        this.archivo7 = form.value.archivo7;
        this.archivo8 = form.value.archivo8;       
        this.tratamiento.general.checkGeneral = form.value.general;
        this.tratamiento.general.valGeneral = form.value.txtgeneral;
        this.tratamiento.particular.checkParticular = form.value.particular;

        for(let i =0 ; i < this.valListaParticular(form).length;i++){       
            let valCheck:boolean = this.valListaParticular(form).controls[i].get("valCheck").value;
            let valHelp:string = this.valListaParticular(form).controls[i].get("valHelp").value;
            let valText:string = this.valListaParticular(form).controls[i].get("valText").value;
            let valTitulo:string = this.valListaParticular(form).controls[i].get("valTitulo").value;
            let lp  = new ListaParticular(valCheck,valTitulo,valText,valHelp);     
            
            this.listaParticular.push(lp);
            
        }
        
        this.tratamiento.particular.lista = this.listaParticular;
        
    }

    valListaParticular(form:FormGroup): any {
        return form.get('listaParticular')  as FormArray;
    }
}