-- AlterTable
ALTER TABLE "ui_elements" ADD COLUMN     "promotion_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ui_elements" ADD CONSTRAINT "ui_elements_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
