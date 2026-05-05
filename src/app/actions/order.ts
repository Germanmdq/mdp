"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(productId: string, quantity: number, total: number) {
  // Get first user for demo (should be session user)
  const user = await prisma.user.findFirst();
  if (!user) throw new Error("No user found in DB");

  const order = await prisma.order.create({
    data: {
      total,
      status: "PAID",
      userId: user.id,
      items: {
        create: {
          productId,
          quantity,
          price: total / quantity
        }
      }
    }
  });

  // Update stock
  await prisma.product.update({
    where: { id: productId },
    data: {
      stock: {
        decrement: quantity
      }
    }
  });

  revalidatePath("/dashboard/usuario/compras");
  revalidatePath(`/productos/${productId}`);
  
  return { success: true, orderId: order.id };
}
