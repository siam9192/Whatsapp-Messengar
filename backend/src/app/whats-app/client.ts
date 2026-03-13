import { Client, LocalAuth } from "whatsapp-web.js";
import fs from "fs";
import path from "path";

const clients = new Map<String, Client>();

export function initClients() {
  const authPath = path.join(process.cwd(), ".wwebjs_auth");

  const clientsName = fs.readdirSync(authPath).filter((folder) => {
    const fullPath = path.join(authPath, folder);
    return fs.statSync(fullPath).isDirectory();
  });

  clientsName.forEach((clientName) => {
    const id = clientName.split("-")[2];
    const client = new Client({
      authStrategy: new LocalAuth({ clientId: id }),
    });
    if (client) clients.set(id, client);
  });
}

function createClient(userId: string) {
  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: userId,
    }),
  });
  client.initialize();
  return client;
}

export async function removeClient(userId: string) {
  const client = clients.get(userId);

  if (client) {
    await client.logout();
    await client.destroy();
    clients.delete(userId);
    return true;
  }
  return false;
}

export function getClient(userId: string) {
  if (!clients.has(userId)) {
    const client = createClient(userId);
    clients.set(userId, client);
    return client;
  }
  return clients.get(userId) as Client;
}
