/*
  Warnings:

  - You are about to drop the column `noticeId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[departmentId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "noticeId";

-- CreateIndex
CREATE UNIQUE INDEX "Address_departmentId_key" ON "Address"("departmentId");
