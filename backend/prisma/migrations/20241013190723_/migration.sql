-- CreateTable
CREATE TABLE "ProductsCategory" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uz" TEXT NOT NULL,
    "ru" TEXT NOT NULL,
    "en" TEXT NOT NULL,

    CONSTRAINT "ProductsCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" JSONB,
    "productsCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductsCategory_url_key" ON "ProductsCategory"("url");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productsCategoryId_fkey" FOREIGN KEY ("productsCategoryId") REFERENCES "ProductsCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
