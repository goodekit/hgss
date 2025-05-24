/*
  Warnings:

  - You are about to drop the column `image` on the `Gallery` table. All the data in the column will be lost.
  - Added the required column `cover` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "image",
ADD COLUMN     "cover" TEXT NOT NULL;
