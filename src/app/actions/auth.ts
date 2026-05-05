"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || user.password !== password) {
    return { error: "Credenciales inválidas" };
  }

  // Set session cookie (simulated JWT for now, but real persistence)
  const cookieStore = await cookies();
  cookieStore.set("mdp_session", JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/"
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("mdp_session");
  redirect("/");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("mdp_session");
  if (!session) return null;
  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}
