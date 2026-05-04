import { redirect } from "next/navigation";

export default function FavoritosRedirect() {
  redirect("/dashboard/usuario/favoritos");
}
