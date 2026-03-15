export interface CreateQrPayload {
    code:string
}


export interface SendMessagePayload  {
    users:{number:string,count:number}[],
    message:string
}


