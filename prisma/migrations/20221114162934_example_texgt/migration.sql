/*
  Warnings:

  - Added the required column `text` to the `Example` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Example" ADD COLUMN     "text" TEXT NOT NULL;
