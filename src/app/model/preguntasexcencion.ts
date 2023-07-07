import {UploadF} from './upload';

export class Preguntasexcencion {
  constructor(public pregunta: number,
              public subpregunta: number,
              public respuesta: string,
              public archivo:UploadF) {
  }
}
