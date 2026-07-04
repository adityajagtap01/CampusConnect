/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE student_id_seq;
ALTER TABLE "Student" ALTER COLUMN "id" SET DEFAULT nextval('student_id_seq');
ALTER SEQUENCE student_id_seq OWNED BY "Student"."id";

-- CreateTable
CREATE TABLE "CurrentStudents" (
    "id" SERIAL NOT NULL,
    "regno" INTEGER NOT NULL,
    "branch" TEXT NOT NULL,
    "cgpa" DOUBLE PRECISION NOT NULL,
    "documentId" INTEGER
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "twelth_result_file" TEXT,
    "cgpa_result_file" TEXT,
    "resume_result_file" TEXT,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrentStudents_id_key" ON "CurrentStudents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CurrentStudents_regno_key" ON "CurrentStudents"("regno");

-- CreateIndex
CREATE UNIQUE INDEX "Documents_id_key" ON "Documents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- AddForeignKey
ALTER TABLE "CurrentStudents" ADD CONSTRAINT "CurrentStudents_id_fkey" FOREIGN KEY ("id") REFERENCES "Documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
