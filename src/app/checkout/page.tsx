import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CheckoutClient from "@/components/checkout/CheckoutClient";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const params = await searchParams;
  const id = typeof params.id === 'string' ? params.id : "";
  const quantity = parseInt(typeof params.q === 'string' ? params.q : "1") || 1;

  if (!id) notFound();

  const product = await prisma.product.findUnique({
    where: { id },
    include: { seller: true }
  });

  if (!product) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#ebebeb] flex items-center justify-center font-bold text-slate-500">Cargando checkout...</div>}>
      <CheckoutClient initialProduct={product} quantity={quantity} />
    </Suspense>
  );
}