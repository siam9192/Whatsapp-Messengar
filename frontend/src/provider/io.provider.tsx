"use client";

import { io, Socket } from "socket.io-client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { env } from "@/env";
import { setCookie } from "@/services/auth.service";
import { useUser } from "./user.provider";

interface Props {
  children: ReactNode;
}

const IoContext = createContext<Socket | null>(null);
export default function IoProvider({ children }: Props) {
  const [socIo, setIo] = useState<Socket | null>(null);
  const showMessage = (message: string) => {};

  const { login } = useUser();

  useEffect(() => {
    const ioInstance = io(env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });

    setIo(ioInstance);

    ioInstance.on("connect", () => {
      console.log("Connected:", ioInstance.id);
    });

    ioInstance.on("disconnect", () => {
      console.log("Disconnected");
    });

    ioInstance.on("ready", async (token: string) => {
      login(token);
    });
    return () => {
      ioInstance.disconnect();
    };
  }, []);

  return <IoContext.Provider value={socIo}>{children}</IoContext.Provider>;
}

export function useIo() {
  const context = useContext(IoContext);
  return context;
}
