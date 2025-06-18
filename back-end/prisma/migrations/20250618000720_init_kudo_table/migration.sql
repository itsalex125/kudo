-- CreateTable
CREATE TABLE "Card" (
    "boardId" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "gif" TEXT NOT NULL,
    "delete" BOOLEAN NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("boardId")
);
