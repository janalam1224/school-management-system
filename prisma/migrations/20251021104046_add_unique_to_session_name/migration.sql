/*
  Warnings:

  - You are about to drop the column `hasPractical` on the `ExamSubject` table. All the data in the column will be lost.
  - You are about to drop the column `practicalMax` on the `ExamSubject` table. All the data in the column will be lost.
  - You are about to drop the column `examSubjectId` on the `ResultPractical` table. All the data in the column will be lost.
  - You are about to drop the column `subjectName` on the `ResultPractical` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."ResultPractical" DROP CONSTRAINT "ResultPractical_examSubjectId_fkey";

-- DropIndex
DROP INDEX "public"."Class_name_key";

-- AlterTable
ALTER TABLE "public"."ExamSubject" DROP COLUMN "hasPractical",
DROP COLUMN "practicalMax";

-- AlterTable
ALTER TABLE "public"."ResultPractical" DROP COLUMN "examSubjectId",
DROP COLUMN "subjectName";

-- CreateIndex
CREATE UNIQUE INDEX "Session_name_key" ON "public"."Session"("name");
