import { Server, Socket } from "socket.io";
import { registerEvents } from "./events";


let io:Server|null =  null


function setIo (server:Server) {
   io = server;
}

export function initIO (io:Server) {
 io.on("connection",(socket)=>{
 registerEvents(socket)
 })
  
 setIo(io)
}

export function getIo(){
    return io
}