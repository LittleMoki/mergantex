/*
  Warnings:

  - You are about to drop the column `name` on the `Technique` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TechniqueTranslation` table. All the data in the column will be lost.
  - Added the required column `title` to the `TechniqueTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Technique_name_key";

-- AlterTable
ALTER TABLE "Technique" DROP COLUMN "name",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "TechniqueTranslation" DROP COLUMN "name",
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
