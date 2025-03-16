/*
  Warnings:

  - You are about to drop the column `action` on the `ui_elements` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ui_elements` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ui_elements` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `ui_elements` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ui_elements` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ui_elements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ui_elements" DROP COLUMN "action",
DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "image_url",
DROP COLUMN "title",
DROP COLUMN "updated_at",
ADD COLUMN     "img_alt" TEXT,
ADD COLUMN     "img_desktopImgUrl" TEXT,
ADD COLUMN     "img_mobileImgUrl" TEXT,
ADD COLUMN     "txt_text" TEXT;
