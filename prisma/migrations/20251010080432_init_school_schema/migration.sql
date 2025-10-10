/*
  Warnings:

  - Added the required column `teacherSubjectClassId` to the `StudentAttendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherSubjectClassId` to the `TeacherAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."StudentAttendance" ADD COLUMN     "teacherSubjectClassId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'present';

-- AlterTable
ALTER TABLE "public"."TeacherAttendance" ADD COLUMN     "teacherSubjectClassId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'present';

-- CreateIndex
CREATE INDEX "Exam_name_classId_subjectId_idx" ON "public"."Exam"("name", "classId", "subjectId");

-- CreateIndex
CREATE INDEX "StudentAttendance_studentId_teacherSubjectClassId_idx" ON "public"."StudentAttendance"("studentId", "teacherSubjectClassId");

-- CreateIndex
CREATE INDEX "TeacherAttendance_teacherId_teacherSubjectClassId_idx" ON "public"."TeacherAttendance"("teacherId", "teacherSubjectClassId");

-- AddForeignKey
ALTER TABLE "public"."StudentAttendance" ADD CONSTRAINT "StudentAttendance_teacherSubjectClassId_fkey" FOREIGN KEY ("teacherSubjectClassId") REFERENCES "public"."TeacherSubjectClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeacherAttendance" ADD CONSTRAINT "TeacherAttendance_teacherSubjectClassId_fkey" FOREIGN KEY ("teacherSubjectClassId") REFERENCES "public"."TeacherSubjectClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
