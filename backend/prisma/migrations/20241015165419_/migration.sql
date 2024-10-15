/*
  Warnings:

  - Added the required column `title` to the `FactoryTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FactoryTranslation" ADD COLUMN     "title" TEXT NOT NULL;
