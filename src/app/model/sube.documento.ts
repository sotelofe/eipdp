import { UploadF } from './upload';

export class SubeDocumento{
    constructor(
        public folio:string,
        public email:string,
        public asunto:string,
        public upload:UploadF,
    ){}
}