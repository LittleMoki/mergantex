/*
  Warnings:

  - You are about to drop the column `image` on the `ProductsCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Factory" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductsCategory" DROP COLUMN "image";
