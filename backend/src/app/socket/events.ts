import { Socket } from "socket.io";

export function registerEvents (socket:Socket) {
 
 socket.on('disconnect', async (reason) => {
    console.log(`🔴 Socket disconnected: ${socket.id}`);
 })

}