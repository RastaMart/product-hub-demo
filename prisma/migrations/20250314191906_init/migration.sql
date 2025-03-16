-- CreateTable
CREATE TABLE "promotions" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "markets" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "markets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internet_products" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "speed" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "internet_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv_products" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channels" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tv_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voice_products" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "features" TEXT[],
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voice_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ui_elements" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image_url" TEXT,
    "action" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ui_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_product_internet" (
    "id" SERIAL NOT NULL,
    "promotion_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotion_product_internet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_product_tv" (
    "id" SERIAL NOT NULL,
    "promotion_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotion_product_tv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_product_voice" (
    "id" SERIAL NOT NULL,
    "promotion_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotion_product_voice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_product_equipment" (
    "id" SERIAL NOT NULL,
    "promotion_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotion_product_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_market" (
    "id" SERIAL NOT NULL,
    "promotion_id" INTEGER NOT NULL,
    "market_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotion_market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_triggers" (
    "id" SERIAL NOT NULL,
    "promotion_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotion_triggers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ui_element_internet_association" (
    "id" SERIAL NOT NULL,
    "promotion_product_id" INTEGER NOT NULL,
    "ui_element_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ui_element_internet_association_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ui_element_tv_association" (
    "id" SERIAL NOT NULL,
    "promotion_product_id" INTEGER NOT NULL,
    "ui_element_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ui_element_tv_association_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ui_element_voice_association" (
    "id" SERIAL NOT NULL,
    "promotion_product_id" INTEGER NOT NULL,
    "ui_element_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ui_element_voice_association_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ui_element_equipment_association" (
    "id" SERIAL NOT NULL,
    "promotion_product_id" INTEGER NOT NULL,
    "ui_element_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ui_element_equipment_association_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "promotions_key_key" ON "promotions"("key");

-- CreateIndex
CREATE UNIQUE INDEX "markets_key_key" ON "markets"("key");

-- CreateIndex
CREATE UNIQUE INDEX "internet_products_key_key" ON "internet_products"("key");

-- CreateIndex
CREATE UNIQUE INDEX "tv_products_key_key" ON "tv_products"("key");

-- CreateIndex
CREATE UNIQUE INDEX "voice_products_key_key" ON "voice_products"("key");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_key_key" ON "equipment"("key");

-- CreateIndex
CREATE UNIQUE INDEX "ui_elements_key_key" ON "ui_elements"("key");

-- CreateIndex
CREATE UNIQUE INDEX "promotion_product_internet_promotion_id_product_id_key" ON "promotion_product_internet"("promotion_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "promotion_product_tv_promotion_id_product_id_key" ON "promotion_product_tv"("promotion_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "promotion_product_voice_promotion_id_product_id_key" ON "promotion_product_voice"("promotion_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "promotion_product_equipment_promotion_id_product_id_key" ON "promotion_product_equipment"("promotion_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "promotion_market_promotion_id_market_id_key" ON "promotion_market"("promotion_id", "market_id");

-- CreateIndex
CREATE UNIQUE INDEX "ui_element_internet_association_promotion_product_id_ui_ele_key" ON "ui_element_internet_association"("promotion_product_id", "ui_element_id");

-- CreateIndex
CREATE UNIQUE INDEX "ui_element_tv_association_promotion_product_id_ui_element_i_key" ON "ui_element_tv_association"("promotion_product_id", "ui_element_id");

-- CreateIndex
CREATE UNIQUE INDEX "ui_element_voice_association_promotion_product_id_ui_elemen_key" ON "ui_element_voice_association"("promotion_product_id", "ui_element_id");

-- CreateIndex
CREATE UNIQUE INDEX "ui_element_equipment_association_promotion_product_id_ui_el_key" ON "ui_element_equipment_association"("promotion_product_id", "ui_element_id");

-- AddForeignKey
ALTER TABLE "promotion_product_internet" ADD CONSTRAINT "promotion_product_internet_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_product_internet" ADD CONSTRAINT "promotion_product_internet_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "internet_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_product_tv" ADD CONSTRAINT "promotion_product_tv_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_product_tv" ADD CONSTRAINT "promotion_product_tv_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tv_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_product_voice" ADD CONSTRAINT "promotion_product_voice_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_product_voice" ADD CONSTRAINT "promotion_product_voice_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "voice_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_product_equipment" ADD CONSTRAINT "promotion_product_equipment_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_product_equipment" ADD CONSTRAINT "promotion_product_equipment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_market" ADD CONSTRAINT "promotion_market_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_market" ADD CONSTRAINT "promotion_market_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "markets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_triggers" ADD CONSTRAINT "promotion_triggers_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ui_element_internet_association" ADD CONSTRAINT "ui_element_internet_association_promotion_product_id_fkey" FOREIGN KEY ("promotion_product_id") REFERENCES "promotion_product_internet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ui_element_internet_association" ADD CONSTRAINT "ui_element_internet_association_ui_element_id_fkey" FOREIGN KEY ("ui_element_id") REFERENCES "ui_elements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ui_element_tv_association" ADD CONSTRAINT "ui_element_tv_association_promotion_product_id_fkey" FOREIGN KEY ("promotion_product_id") REFERENCES "promotion_product_tv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ui_element_tv_association" ADD CONSTRAINT "ui_element_tv_association_ui_element_id_fkey" FOREIGN KEY ("ui_element_id") REFERENCES "ui_elements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ui_element_voice_association" ADD CONSTRAINT "ui_element_voice_association_promotion_product_id_fkey" FOREIGN KEY ("promotion_product_id") REFERENCES "promotion_product_voice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ui_element_voice_association" ADD CONSTRAINT "ui_element_voice_association_ui_element_id_fkey" FOREIGN KEY ("ui_element_id") REFERENCES "ui_elements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ui_element_equipment_association" ADD CONSTRAINT "ui_element_equipment_association_promotion_product_id_fkey" FOREIGN KEY ("promotion_product_id") REFERENCES "promotion_product_equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ui_element_equipment_association" ADD CONSTRAINT "ui_element_equipment_association_ui_element_id_fkey" FOREIGN KEY ("ui_element_id") REFERENCES "ui_elements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
