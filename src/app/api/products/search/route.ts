import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (!q) return NextResponse.json([]);

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: q } },
        { category: { name: { contains: q } } }
      ]
    },
    take: 3,
    select: {
      id: true,
      title: true,
      price: true
    }
  });

  return NextResponse.json(products);
}
