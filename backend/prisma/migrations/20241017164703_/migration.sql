/*
  Warnings:

  - Added the required column `image` to the `Factory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `ProductsCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Factory" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductsCategory" ADD COLUMN     "image" TEXT NOT NULL;
