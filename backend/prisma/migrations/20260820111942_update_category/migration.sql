/*
  Warnings:

  - You are about to alter the column `slug` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "slug" SET DATA TYPE VARCHAR(120);

-- CreateIndex
CREATE INDEX "Category_createdAt_idx" ON "Category"("createdAt");

-- CreateIndex
CREATE INDEX "Category_updatedAt_idx" ON "Category"("updatedAt");
