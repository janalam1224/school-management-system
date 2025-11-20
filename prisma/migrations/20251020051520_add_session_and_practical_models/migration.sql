/*
  Warnings:

  - A unique constraint covering the columns `[name,section,sessionId]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Class" ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."ExamSubject" ADD COLUMN     "hasPractical" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "practicalMax" INTEGER;

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResultPractical" (
    "id" SERIAL NOT NULL,
    "resultId" INTEGER NOT NULL,
    "obtainedMarks" DOUBLE PRECISION NOT NULL,
    "subjectName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "examSubjectId" INTEGER,

    CONSTRAINT "ResultPractical_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_section_sessionId_key" ON "public"."Class"("name", "section", "sessionId");

-- AddForeignKey
ALTER TABLE "public"."Class" ADD CONSTRAINT "Class_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResultPractical" ADD CONSTRAINT "ResultPractical_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "public"."Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResultPractical" ADD CONSTRAINT "ResultPractical_examSubjectId_fkey" FOREIGN KEY ("examSubjectId") REFERENCES "public"."ExamSubject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
