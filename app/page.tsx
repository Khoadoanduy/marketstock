'use client'

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NavBar from "@/components/NavBar"
// import StockData from "@/components/StockData"
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <main>
      <NavBar></NavBar>

    </main>
  );
}