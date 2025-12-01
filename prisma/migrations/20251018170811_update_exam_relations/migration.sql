/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `totalMarks` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `Result` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,examSubjectId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `examSubjectId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Exam" DROP CONSTRAINT "Exam_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Result" DROP CONSTRAINT "Result_examId_fkey";

-- DropIndex
DROP INDEX "public"."Exam_name_classId_subjectId_idx";

-- DropIndex
DROP INDEX "public"."Result_studentId_examId_key";

-- AlterTable
ALTER TABLE "public"."Exam" DROP COLUMN "subjectId",
DROP COLUMN "totalMarks";

-- AlterTable
ALTER TABLE "public"."Result" DROP COLUMN "examId",
ADD COLUMN     "examSubjectId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."ExamSubject" (
    "id" SERIAL NOT NULL,
    "examId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "maxMarks" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "ExamSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExamSubject_examId_subjectId_key" ON "public"."ExamSubject"("examId", "subjectId");

-- CreateIndex
CREATE INDEX "Exam_name_classId_idx" ON "public"."Exam"("name", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_studentId_examSubjectId_key" ON "public"."Result"("studentId", "examSubjectId");

-- AddForeignKey
ALTER TABLE "public"."ExamSubject" ADD CONSTRAINT "ExamSubject_examId_fkey" FOREIGN KEY ("examId") REFERENCES "public"."Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExamSubject" ADD CONSTRAINT "ExamSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Result" ADD CONSTRAINT "Result_examSubjectId_fkey" FOREIGN KEY ("examSubjectId") REFERENCES "public"."ExamSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
