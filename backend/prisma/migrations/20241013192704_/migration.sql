/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `en` on the `ProductsCategory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ProductsCategory` table. All the data in the column will be lost.
  - You are about to drop the column `ru` on the `ProductsCategory` table. All the data in the column will be lost.
  - You are about to drop the column `uz` on the `ProductsCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "subtitle",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "ProductsCategory" DROP COLUMN "en",
DROP COLUMN "name",
DROP COLUMN "ru",
DROP COLUMN "uz";

-- CreateTable
CREATE TABLE "ProductsCategoryTranslation" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productsCategoryId" INTEGER NOT NULL,

    CONSTRAINT "ProductsCategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTranslation" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" JSONB,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductsCategoryTranslation_language_productsCategoryId_key" ON "ProductsCategoryTranslation"("language", "productsCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTranslation_language_productId_key" ON "ProductTranslation"("language", "productId");

-- AddForeignKey
ALTER TABLE "ProductsCategoryTranslation" ADD CONSTRAINT "ProductsCategoryTranslation_productsCategoryId_fkey" FOREIGN KEY ("productsCategoryId") REFERENCES "ProductsCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTranslation" ADD CONSTRAINT "ProductTranslation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
