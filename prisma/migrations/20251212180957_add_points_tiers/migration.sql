-- CreateTable
CREATE TABLE "points_tiers" (
    "id" TEXT NOT NULL,
    "min_amount_cents" INTEGER NOT NULL,
    "max_amount_cents" INTEGER,
    "points_awarded" INTEGER NOT NULL,
    "label" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "points_tiers_pkey" PRIMARY KEY ("id")
);
