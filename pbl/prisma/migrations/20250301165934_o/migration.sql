/*
  Warnings:

  - A unique constraint covering the columns `[documentId]` on the table `CurrentStudents` will be added. If there are existing duplicate values, this will fail.
  - Made the column `documentId` on table `CurrentStudents` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CurrentStudents" DROP CONSTRAINT "CurrentStudents_id_fkey";

-- AlterTable
ALTER TABLE "CurrentStudents" ALTER COLUMN "documentId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CurrentStudents_documentId_key" ON "CurrentStudents"("documentId");

-- AddForeignKey
ALTER TABLE "CurrentStudents" ADD CONSTRAINT "CurrentStudents_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
