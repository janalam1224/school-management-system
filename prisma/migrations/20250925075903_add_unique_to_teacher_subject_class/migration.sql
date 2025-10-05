/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,subjectId,classId]` on the table `TeacherSubjectClass` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeacherSubjectClass_teacherId_subjectId_classId_key" ON "public"."TeacherSubjectClass"("teacherId", "subjectId", "classId");
