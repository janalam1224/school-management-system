/*
  Warnings:

  - You are about to drop the column `examId` on the `Fee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Fee" DROP CONSTRAINT "Fee_examId_fkey";

-- AlterTable
ALTER TABLE "public"."Fee" DROP COLUMN "examId",
ADD COLUMN     "examName" TEXT,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "date" DROP DEFAULT;
