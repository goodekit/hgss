-- AlterTable
ALTER TABLE "User" ADD COLUMN     "failedSignInAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastFailedAttempt" TIMESTAMP(3);
