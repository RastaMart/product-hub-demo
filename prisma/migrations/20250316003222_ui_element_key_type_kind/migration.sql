-- CreateTable
CREATE TABLE "ui_element_key_types" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'text',

    CONSTRAINT "ui_element_key_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ui_element_key_types_key_key" ON "ui_element_key_types"("key");
