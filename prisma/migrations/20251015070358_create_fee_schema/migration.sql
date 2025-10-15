-- CreateEnum
CREATE TYPE "public"."FeeStatus" AS ENUM ('PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "public"."FeeType" AS ENUM ('TUITION', 'EXAM');

-- CreateTable
CREATE TABLE "public"."Fee" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "classId" INTEGER,
    "examId" INTEGER,
    "feeType" "public"."FeeType" NOT NULL DEFAULT 'TUITION',
    "feeAmount" DOUBLE PRECISION NOT NULL,
    "feeMonth" TEXT NOT NULL,
    "status" "public"."FeeStatus" NOT NULL DEFAULT 'PAID',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Fee_studentId_classId_idx" ON "public"."Fee"("studentId", "classId");

-- AddForeignKey
ALTER TABLE "public"."Fee" ADD CONSTRAINT "Fee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fee" ADD CONSTRAINT "Fee_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fee" ADD CONSTRAINT "Fee_examId_fkey" FOREIGN KEY ("examId") REFERENCES "public"."Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
