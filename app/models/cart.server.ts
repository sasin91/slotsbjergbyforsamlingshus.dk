import type { Cart, Product } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Cart } from "@prisma/client";

export async function getCartById(id: Cart["id"]) {
  return prisma.cart.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function productInCart(product: Product, cart: Cart) {
  const countProductsInCart = await prisma.productsInCart.count({
    where: {
      productId: product.slug,
      cartId: cart.id,
    },
  });

  return countProductsInCart > 0;
}
