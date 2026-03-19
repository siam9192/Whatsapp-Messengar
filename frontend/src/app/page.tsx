"use client";
import MainPage from "@/components/pages/main-page";
import StartPage from "@/components/pages/start-page";
import { useUser } from "@/provider/user.provider";

function page() {
  const { user } = useUser();
  if (user) return <MainPage />;

  return <StartPage />;
}

export default page;
