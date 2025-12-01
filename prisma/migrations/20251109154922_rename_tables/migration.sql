/*
  Warnings:

  - The values [present,absent] on the enum `AttendanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `teacherSubjectClassId` on the `StudentAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `teacherSubjectClassId` on the `TeacherAttendance` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Principal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResultPractical` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherSubjectClass` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId,teachingAssignmentId,attendanceDate]` on the table `StudentAttendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId,teachingAssignmentId,attendanceDate]` on the table `TeacherAttendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dob` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teachingAssignmentId` to the `StudentAttendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teachingAssignmentId` to the `TeacherAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."AttendanceStatus_new" AS ENUM ('PRESENT', 'ABSENT');
ALTER TABLE "public"."StudentAttendance" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."TeacherAttendance" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."StudentAttendance" ALTER COLUMN "status" TYPE "public"."AttendanceStatus_new" USING ("status"::text::"public"."AttendanceStatus_new");
ALTER TABLE "public"."TeacherAttendance" ALTER COLUMN "status" TYPE "public"."AttendanceStatus_new" USING ("status"::text::"public"."AttendanceStatus_new");
ALTER TYPE "public"."AttendanceStatus" RENAME TO "AttendanceStatus_old";
ALTER TYPE "public"."AttendanceStatus_new" RENAME TO "AttendanceStatus";
DROP TYPE "public"."AttendanceStatus_old";
ALTER TABLE "public"."StudentAttendance" ALTER COLUMN "status" SET DEFAULT 'PRESENT';
ALTER TABLE "public"."TeacherAttendance" ALTER COLUMN "status" SET DEFAULT 'PRESENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Class" DROP CONSTRAINT "Class_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Exam" DROP CONSTRAINT "Exam_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Fee" DROP CONSTRAINT "Fee_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ResultPractical" DROP CONSTRAINT "ResultPractical_resultId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StudentAttendance" DROP CONSTRAINT "StudentAttendance_teacherSubjectClassId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TeacherAttendance" DROP CONSTRAINT "TeacherAttendance_teacherSubjectClassId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TeacherSubjectClass" DROP CONSTRAINT "TeacherSubjectClass_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TeacherSubjectClass" DROP CONSTRAINT "TeacherSubjectClass_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TeacherSubjectClass" DROP CONSTRAINT "TeacherSubjectClass_teacherId_fkey";

-- DropIndex
DROP INDEX "public"."StudentAttendance_studentId_teacherSubjectClassId_attendanc_key";

-- DropIndex
DROP INDEX "public"."TeacherAttendance_teacherId_teacherSubjectClassId_attendanc_key";

-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "gender" "public"."Gender" NOT NULL DEFAULT 'MALE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."StudentAttendance" DROP COLUMN "teacherSubjectClassId",
ADD COLUMN     "teachingAssignmentId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PRESENT';

-- AlterTable
ALTER TABLE "public"."Teacher" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."TeacherAttendance" DROP COLUMN "teacherSubjectClassId",
ADD COLUMN     "teachingAssignmentId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PRESENT';

-- DropTable
DROP TABLE "public"."Class";

-- DropTable
DROP TABLE "public"."Principal";

-- DropTable
DROP TABLE "public"."ResultPractical";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."TeacherSubjectClass";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AcademicSession" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AcademicSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SchoolClass" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "section" TEXT,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "SchoolClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TeachingAssignment" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeachingAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PracticalResult" (
    "id" SERIAL NOT NULL,
    "resultId" INTEGER NOT NULL,
    "obtainedMarks" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PracticalResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "public"."Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicSession_name_key" ON "public"."AcademicSession"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolClass_name_section_sessionId_key" ON "public"."SchoolClass"("name", "section", "sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "TeachingAssignment_teacherId_subjectId_classId_key" ON "public"."TeachingAssignment"("teacherId", "subjectId", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAttendance_studentId_teachingAssignmentId_attendance_key" ON "public"."StudentAttendance"("studentId", "teachingAssignmentId", "attendanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherAttendance_teacherId_teachingAssignmentId_attendance_key" ON "public"."TeacherAttendance"("teacherId", "teachingAssignmentId", "attendanceDate");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SchoolClass" ADD CONSTRAINT "SchoolClass_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."AcademicSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."SchoolClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."SchoolClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAttendance" ADD CONSTRAINT "StudentAttendance_teachingAssignmentId_fkey" FOREIGN KEY ("teachingAssignmentId") REFERENCES "public"."TeachingAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeacherAttendance" ADD CONSTRAINT "TeacherAttendance_teachingAssignmentId_fkey" FOREIGN KEY ("teachingAssignmentId") REFERENCES "public"."TeachingAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Exam" ADD CONSTRAINT "Exam_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."SchoolClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PracticalResult" ADD CONSTRAINT "PracticalResult_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "public"."Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fee" ADD CONSTRAINT "Fee_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."SchoolClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
