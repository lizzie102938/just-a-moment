/*
  Warnings:

  - You are about to drop the column `place_name` on the `bucketlist_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bucketlist_items" DROP COLUMN "place_name",
ADD COLUMN     "placename" VARCHAR(100);
