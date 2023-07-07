import {Preguntasexcencion} from './preguntasexcencion';

export class Excencionrequest {
  constructor(public idUsuario: number,
              public preguntas: Preguntasexcencion[]){
  }
}
