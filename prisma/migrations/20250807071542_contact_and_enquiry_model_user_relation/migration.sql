/*
  Warnings:

  - Added the required column `userId` to the `ContactAndEnquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactAndEnquiry" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ContactAndEnquiry" ADD CONSTRAINT "ContactAndEnquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
