-- DropForeignKey
ALTER TABLE "CurrentStudents" DROP CONSTRAINT "CurrentStudents_documentId_fkey";

-- AlterTable
ALTER TABLE "CurrentStudents" ALTER COLUMN "documentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CurrentStudents" ADD CONSTRAINT "CurrentStudents_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
