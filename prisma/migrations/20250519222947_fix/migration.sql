/*
  Warnings:

  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Size" ADD VALUE 'L';

-- DropIndex
DROP INDEX "ProductImage_id_productId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "size",
ADD COLUMN     "sizes" "Size"[] DEFAULT ARRAY[]::"Size"[];
