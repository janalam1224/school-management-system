/*
  Warnings:

  - You are about to drop the column `date` on the `StudentAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `TeacherAttendance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,teacherSubjectClassId,attendanceDate]` on the table `StudentAttendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId,teacherSubjectClassId,attendanceDate]` on the table `TeacherAttendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."StudentAttendance_studentId_teacherSubjectClassId_idx";

-- DropIndex
DROP INDEX "public"."TeacherAttendance_teacherId_teacherSubjectClassId_idx";

-- AlterTable
ALTER TABLE "public"."StudentAttendance" DROP COLUMN "date",
ADD COLUMN     "attendanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."TeacherAttendance" DROP COLUMN "date",
ADD COLUMN     "attendanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "StudentAttendance_studentId_teacherSubjectClassId_attendanc_key" ON "public"."StudentAttendance"("studentId", "teacherSubjectClassId", "attendanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherAttendance_teacherId_teacherSubjectClassId_attendanc_key" ON "public"."TeacherAttendance"("teacherId", "teacherSubjectClassId", "attendanceDate");
