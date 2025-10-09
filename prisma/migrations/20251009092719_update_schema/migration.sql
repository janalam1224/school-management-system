/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Principal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentAttendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherAttendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherSubjectClass` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('principal');

-- DropForeignKey
ALTER TABLE "public"."Exam" DROP CONSTRAINT "Exam_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Exam" DROP CONSTRAINT "Exam_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Fee" DROP CONSTRAINT "Fee_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Result" DROP CONSTRAINT "Result_examId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Result" DROP CONSTRAINT "Result_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StudentAttendance" DROP CONSTRAINT "StudentAttendance_studentId_fkey";

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

-- DropTable
DROP TABLE "public"."Class";

-- DropTable
DROP TABLE "public"."Exam";

-- DropTable
DROP TABLE "public"."Fee";

-- DropTable
DROP TABLE "public"."Principal";

-- DropTable
DROP TABLE "public"."Result";

-- DropTable
DROP TABLE "public"."Student";

-- DropTable
DROP TABLE "public"."StudentAttendance";

-- DropTable
DROP TABLE "public"."Subject";

-- DropTable
DROP TABLE "public"."Teacher";

-- DropTable
DROP TABLE "public"."TeacherAttendance";

-- DropTable
DROP TABLE "public"."TeacherSubjectClass";

-- DropEnum
DROP TYPE "public"."AttendanceStatus";

-- DropEnum
DROP TYPE "public"."FeeStatus";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
