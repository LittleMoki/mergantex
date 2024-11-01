/*
  Warnings:

  - Added the required column `description` to the `FactoryTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FactoryTranslation" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "HomePageVideo" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "video" TEXT,
    "isVideo" BOOLEAN NOT NULL,

    CONSTRAINT "HomePageVideo_pkey" PRIMARY KEY ("id")
);
