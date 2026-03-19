"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export async function setCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("access-token", token, {
    httpOnly: true,
    secure: false,
    expires: 60 * 60 * 24 * 20,
    maxAge: 60 * 60 * 24 * 20,
  });
}

export async function clearCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
}

export async function getMe() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/api/me`, {
      headers: {
        authorization: cookieStore.get("access-token")?.value as string,
      },
    });
    if (!res.json) return await res.json();
  } catch (error) {
    return null;
  }
}
