-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_departmentId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "departmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
