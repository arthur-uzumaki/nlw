/*
  Warnings:

  - A unique constraint covering the columns `[userId,poolId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_poolId_key" ON "Participant"("userId", "poolId");
