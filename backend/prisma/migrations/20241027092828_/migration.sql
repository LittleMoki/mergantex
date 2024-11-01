/*
  Warnings:

  - You are about to drop the column `isVideo` on the `HomePageVideo` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `HomePageVideo` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `ProductsCategory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProductsCategory_url_key";

-- AlterTable
ALTER TABLE "HomePageVideo" DROP COLUMN "isVideo",
DROP COLUMN "video";

-- AlterTable
ALTER TABLE "ProductsCategory" DROP COLUMN "url";
