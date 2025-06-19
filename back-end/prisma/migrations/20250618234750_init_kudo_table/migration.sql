-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "boardId" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "gif" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("boardId")
);
