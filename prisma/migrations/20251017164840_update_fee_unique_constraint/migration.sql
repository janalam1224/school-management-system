/*
  Warnings:

  - A unique constraint covering the columns `[studentId,classId,feeMonth,feeType]` on the table `Fee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Fee_studentId_classId_feeMonth_key";

-- CreateIndex
CREATE UNIQUE INDEX "Fee_studentId_classId_feeMonth_feeType_key" ON "public"."Fee"("studentId", "classId", "feeMonth", "feeType");
