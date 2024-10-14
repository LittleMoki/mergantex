-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productsCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productsCategoryId_fkey" FOREIGN KEY ("productsCategoryId") REFERENCES "ProductsCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
