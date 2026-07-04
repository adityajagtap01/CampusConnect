/*
  Warnings:

  - You are about to drop the column `package` on the `CreatedTeam` table. All the data in the column will be lost.
  - Added the required column `packag` to the `CreatedTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreatedTeam" DROP COLUMN "package",
ADD COLUMN     "packag" TEXT NOT NULL;
