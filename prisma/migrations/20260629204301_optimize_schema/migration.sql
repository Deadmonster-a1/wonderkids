/*
  Warnings:

  - Added the required column `updated_at` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `admission_inquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `contact_submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `faqs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `fee_tiers` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `features` on the `fee_tiers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `gallery_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `programs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `theme_config` on the `programs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "admission_inquiries" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "contact_submissions" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "faqs" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "fee_tiers" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "features",
ADD COLUMN     "features" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "gallery_items" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "programs" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "theme_config",
ADD COLUMN     "theme_config" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "testimonials" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "admission_inquiries_status_created_at_idx" ON "admission_inquiries"("status", "created_at");

-- CreateIndex
CREATE INDEX "contact_submissions_status_created_at_idx" ON "contact_submissions"("status", "created_at");

-- CreateIndex
CREATE INDEX "faqs_is_active_display_order_idx" ON "faqs"("is_active", "display_order");

-- CreateIndex
CREATE INDEX "fee_tiers_is_active_display_order_idx" ON "fee_tiers"("is_active", "display_order");

-- CreateIndex
CREATE INDEX "gallery_items_is_active_category_idx" ON "gallery_items"("is_active", "category");

-- CreateIndex
CREATE INDEX "programs_is_active_display_order_idx" ON "programs"("is_active", "display_order");

-- CreateIndex
CREATE INDEX "site_settings_group_idx" ON "site_settings"("group");

-- CreateIndex
CREATE INDEX "teachers_is_active_display_order_idx" ON "teachers"("is_active", "display_order");

-- CreateIndex
CREATE INDEX "testimonials_is_approved_display_order_idx" ON "testimonials"("is_approved", "display_order");
