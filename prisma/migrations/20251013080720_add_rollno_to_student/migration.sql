/*
  Warnings:

  - A unique constraint covering the columns `[classId,rollNo]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rollNo` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "rollNo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_classId_rollNo_key" ON "public"."Student"("classId", "rollNo");
