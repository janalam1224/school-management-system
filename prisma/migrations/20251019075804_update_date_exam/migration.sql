/*
  Warnings:

  - You are about to drop the column `date` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `ExamSubject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Exam" DROP COLUMN "date",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."ExamSubject" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
