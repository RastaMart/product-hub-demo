/*
  Warnings:

  - You are about to drop the column `created_at` on the `markets` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `markets` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `markets` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `markets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "markets" DROP COLUMN "created_at",
DROP COLUMN "name",
DROP COLUMN "region",
DROP COLUMN "updated_at",
ADD COLUMN     "csgCode" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "label" TEXT NOT NULL DEFAULT 'Unknown';
