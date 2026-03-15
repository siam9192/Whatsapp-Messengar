import { Socket } from "socket.io";
import { getClient } from "../whats-app/client";

export function registerEvents(socket: Socket, userId: string) {
  socket.on("disconnect", async () => {
    try {
      const client = getClient(userId);
      if (!client) return;
      const waClient = client.client;
      const timeout = setTimeout(async () => {
        try {
          const state = await waClient.getState();
          if (!state) {
            await waClient.logout();
            console.log("Session removed");
          }
        } catch {}
        clearTimeout(timeout);
      }, 20000);
      console.log(`🔴 Socket disconnected: ${socket.id}`);
    } catch (err: any) {
      console.error("Disconnect handler error:", err.message);
    }
  });
}
