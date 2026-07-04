-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatedTeam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    "companyId" INTEGER,

    CONSTRAINT "CreatedTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamApplication" (
    "id" SERIAL NOT NULL,
    "currentStudentId" INTEGER NOT NULL,
    "createdTeamId" INTEGER NOT NULL,

    CONSTRAINT "TeamApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CreatedTeam_id_key" ON "CreatedTeam"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamApplication_id_key" ON "TeamApplication"("id");

-- AddForeignKey
ALTER TABLE "CreatedTeam" ADD CONSTRAINT "CreatedTeam_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatedTeam" ADD CONSTRAINT "CreatedTeam_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamApplication" ADD CONSTRAINT "TeamApplication_currentStudentId_fkey" FOREIGN KEY ("currentStudentId") REFERENCES "CurrentStudents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamApplication" ADD CONSTRAINT "TeamApplication_createdTeamId_fkey" FOREIGN KEY ("createdTeamId") REFERENCES "CreatedTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
