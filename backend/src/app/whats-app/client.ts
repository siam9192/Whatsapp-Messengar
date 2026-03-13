import { Client, LocalAuth } from "whatsapp-web.js";

const clients = new Map<String, Client>();

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
