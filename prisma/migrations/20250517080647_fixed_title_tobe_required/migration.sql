/*
  Warnings:

  - Made the column `title` on table `Gallery` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `GalleryItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Gallery" ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "GalleryItem" ALTER COLUMN "title" SET NOT NULL;
