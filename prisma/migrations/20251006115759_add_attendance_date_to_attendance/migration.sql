/*
  Warnings:

  - The `status` column on the `StudentAttendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[studentId,attendanceDate]` on the table `StudentAttendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."AttendanceStatus" AS ENUM ('present', 'absent');

-- DropForeignKey
ALTER TABLE "public"."StudentAttendance" DROP CONSTRAINT "StudentAttendance_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."StudentAttendance" ADD COLUMN     "attendanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."AttendanceStatus" NOT NULL DEFAULT 'present';

-- DropEnum
DROP TYPE "public"."attendanceStatus";

-- CreateIndex
CREATE UNIQUE INDEX "StudentAttendance_studentId_attendanceDate_key" ON "public"."StudentAttendance"("studentId", "attendanceDate");

-- AddForeignKey
ALTER TABLE "public"."StudentAttendance" ADD CONSTRAINT "StudentAttendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
