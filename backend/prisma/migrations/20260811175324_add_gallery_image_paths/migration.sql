-- AlterEnum
ALTER TYPE "ActivityAction" ADD VALUE 'PASSWORD_RESET';

-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "originalUrl" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT;
