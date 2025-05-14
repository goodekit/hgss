/*
  Warnings:

  - You are about to drop the column `images` on the `GalleryItem` table. All the data in the column will be lost.
  - Added the required column `image` to the `GalleryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GalleryItem" DROP COLUMN "images",
ADD COLUMN     "image" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
