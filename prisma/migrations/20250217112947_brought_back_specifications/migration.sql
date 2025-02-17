-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "specifications" TEXT[] DEFAULT ARRAY[]::TEXT[];
