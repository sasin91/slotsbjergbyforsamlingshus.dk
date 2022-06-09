import { prisma } from "~/db.server";
export type { Product } from "@prisma/client";

export function getProducts() {
  return prisma.product.findMany;
}

export async function getProduct(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}
