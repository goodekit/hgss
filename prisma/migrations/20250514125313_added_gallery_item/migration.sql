-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);
