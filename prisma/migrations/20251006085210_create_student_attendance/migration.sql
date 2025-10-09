/*
  Warnings:

  - The values [overDue] on the enum `FeeStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."attendanceStatus" AS ENUM ('present', 'absent');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."FeeStatus_new" AS ENUM ('pending', 'paid', 'overdue');
ALTER TABLE "public"."Fee" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Fee" ALTER COLUMN "status" TYPE "public"."FeeStatus_new" USING ("status"::text::"public"."FeeStatus_new");
ALTER TYPE "public"."FeeStatus" RENAME TO "FeeStatus_old";
ALTER TYPE "public"."FeeStatus_new" RENAME TO "FeeStatus";
DROP TYPE "public"."FeeStatus_old";
ALTER TABLE "public"."Fee" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- CreateTable
CREATE TABLE "public"."StudentAttendance" (
    "id" SERIAL NOT NULL,
    "status" "public"."attendanceStatus" NOT NULL DEFAULT 'present',
    "studentId" INTEGER NOT NULL,
    "teacherSubjectClassId" INTEGER NOT NULL,

    CONSTRAINT "StudentAttendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."StudentAttendance" ADD CONSTRAINT "StudentAttendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAttendance" ADD CONSTRAINT "StudentAttendance_teacherSubjectClassId_fkey" FOREIGN KEY ("teacherSubjectClassId") REFERENCES "public"."TeacherSubjectClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
