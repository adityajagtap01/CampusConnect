/*
  Warnings:

  - Added the required column `onsite` to the `CreatedTeam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package` to the `CreatedTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreatedTeam" ADD COLUMN     "onsite" BOOLEAN NOT NULL,
ADD COLUMN     "package" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT;
