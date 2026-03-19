"use client";

import { io, Socket } from "socket.io-client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { env } from "@/env";

interface Props {
  children: ReactNode;
}

const orderRoutes: Record<string, string[]> = {
  admin: ["/admin-dashboard/orders"],
  customer: ["/dashboard/orders"],
  provider: [
    "/provider-dashboard/overview",
    "/provider-dashboard-orders",
    "/provider-dashboard/all-orders",
  ],
};

const events = [
  "order:placed",
  "order:preparing",
  "order:ready",
  "order:delivered",
  "order:canceled",
];

const IoContext = createContext<Socket | null>(null);
export default function IoProvider({ children }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);

  const showMessage = (message: string) => {};

  useEffect(() => {
    const socketInstance = io(env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return <IoContext.Provider value={socket}>{children}</IoContext.Provider>;
}

export function useIo() {
  if (!IoContext) throw new Error("Socket not initialized");
  return IoContext;
}
