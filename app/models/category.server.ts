import { prisma } from "~/db.server";
export type { Category } from "@prisma/client";

export function getCategories() {
  return prisma.category.findMany;
}

export async function getCategory(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}
