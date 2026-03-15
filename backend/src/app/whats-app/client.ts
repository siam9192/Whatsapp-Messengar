import { Client, LocalAuth } from "whatsapp-web.js";
import fs from "fs";
import path from "path";
import { getIo } from "../socket/init";

const clients = new Map<
  string,
  {
    socketIds: string[];
    client: Client;
  }
>();

export function initClients() {
  const authPath = path.join(process.cwd(), ".wwebjs_auth");
  if (!fs.existsSync(authPath)) return;

  const folders = fs.readdirSync(authPath);

  for (const folder of folders) {
    const fullPath = path.join(authPath, folder);

    if (!fs.statSync(fullPath).isDirectory()) continue;

    const id = folder.split("-")[2];

    const client = new Client({
      authStrategy: new LocalAuth({ clientId: id }),
    });

    clients.set(id, {
      client,
      socketIds: [],
    });
  }
}

export async function logout(userId: string) {
  const io = getIo();

  const client = getClient(userId);
  if (!client) return;

  try {
    await client.client.logout();
    await client.client.destroy();
  } catch (err) {
    console.log("Client destroy error:", err);
  }

  clients.delete(userId);

  io.to(client.socketIds).emit("logout", { message: "Logout successfully" });
  io.to(client.socketIds).disconnectSockets(true);

  console.log("Logout successful:", userId);
}

export function watchClient(
  client: Client,
  userId: string,
  userExist: boolean,
) {
  const interval = setInterval(async () => {
    try {
      const state = await client.getState();

      if (userExist && state === null) {
        throw new Error("Session lost");
      }
    } catch (error: any) {
      console.log("Client session error:", error?.message);

      clearInterval(interval);
      await logout(userId);
    }
  }, 2000);
}

export async function createClient(userId: string) {
  if (clients.has(userId)) {
    return clients.get(userId)!;
  }

  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: userId,
    }),
  });

  await client.initialize();
  
  
  clients.set(userId, {
    socketIds: [],
    client,
  });

  return client;
}

export async function removeClient(userId: string) {
  const client = clients.get(userId);

  if (!client) return false;

  try {
    await logout(userId);
  } catch (error) {
    console.log("Remove client error:", error);
  }
  return true;
}

export function getClient(userId: string) {
  return clients.get(userId) ?? null;
}
