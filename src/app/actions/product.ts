"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryName = formData.get("category") as string;
  const stock = parseInt(formData.get("stock") as string) || 1;
  const images = formData.get("images") as string; // JSON string from client
  const attributes = formData.get("attributes") as string; // JSON string

  // Find or create category
  let category = await prisma.category.findUnique({
    where: { name: categoryName }
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/ /g, "-")
      }
    });
  }

  // Get first user as vendor for demo (should be session user)
  const vendor = await prisma.user.findFirst({
    where: { role: "VENDOR" }
  });

  if (!vendor) throw new Error("No vendor found in DB");

  const product = await prisma.product.create({
    data: {
      title,
      description,
      price,
      stock,
      thumbnail: JSON.parse(images)[0] || "",
      images,
      attributes,
      categoryId: category.id,
      sellerId: vendor.id,
      tags: JSON.stringify(["new"]),
      condition: "new",
      freeShipping: true
    }
  });

  revalidatePath("/");
  revalidatePath("/productos");
  
  return { success: true, id: product.id };
}
