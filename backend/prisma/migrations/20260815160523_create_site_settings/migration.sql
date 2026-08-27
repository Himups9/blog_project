/*
  Warnings:

  - The primary key for the `SiteSetting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SiteSetting` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "SiteSetting_email_key";

-- AlterTable
ALTER TABLE "SiteSetting" DROP CONSTRAINT "SiteSetting_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ADD CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id");
