/*
  Warnings:

  - You are about to drop the column `date` on the `Fee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,classId,feeMonth]` on the table `Fee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Fee_studentId_classId_idx";

-- AlterTable
ALTER TABLE "public"."Fee" DROP COLUMN "date",
ADD COLUMN     "paymentDate" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Fee_studentId_classId_feeMonth_key" ON "public"."Fee"("studentId", "classId", "feeMonth");
