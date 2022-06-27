-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "total" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "ProductsInCart" (
    "productId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("productId", "cartId"),
    CONSTRAINT "ProductsInCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductsInCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
