-- CreateTable
CREATE TABLE "public"."TeacherAttendance" (
    "id" SERIAL NOT NULL,
    "status" "public"."AttendanceStatus" NOT NULL DEFAULT 'present',
    "attendanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherSubjectClassId" INTEGER NOT NULL,

    CONSTRAINT "TeacherAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherAttendance_teacherSubjectClassId_attendanceDate_key" ON "public"."TeacherAttendance"("teacherSubjectClassId", "attendanceDate");

-- AddForeignKey
ALTER TABLE "public"."TeacherAttendance" ADD CONSTRAINT "TeacherAttendance_teacherSubjectClassId_fkey" FOREIGN KEY ("teacherSubjectClassId") REFERENCES "public"."TeacherSubjectClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
