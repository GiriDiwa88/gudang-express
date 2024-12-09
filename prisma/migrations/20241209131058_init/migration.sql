-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "nama_item" TEXT NOT NULL,
    "jenis_item" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
