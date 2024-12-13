/*
  Warnings:

  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `category_recommend` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recommendation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `image` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `descripton` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `akuakultur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `descripton` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `health` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `descripton` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fish` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `indicator_environment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fish_id` INTEGER NOT NULL,
    `temperature_from` INTEGER NOT NULL,
    `temperature_until` INTEGER NOT NULL,
    `salinity_from` INTEGER NOT NULL,
    `salinity_until` INTEGER NOT NULL,
    `oxygen_from` INTEGER NOT NULL,
    `oxygen_until` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `indicator_food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fish_id` INTEGER NOT NULL,
    `age` INTEGER NOT NULL,
    `food` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);

-- AddForeignKey
ALTER TABLE `recommendation` ADD CONSTRAINT `recommendation_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category_recommend`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `indicator_environment` ADD CONSTRAINT `indicator_environment_fish_id_fkey` FOREIGN KEY (`fish_id`) REFERENCES `fish`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `indicator_food` ADD CONSTRAINT `indicator_food_fish_id_fkey` FOREIGN KEY (`fish_id`) REFERENCES `fish`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
DROP INDEX `User_email_key` ON `user`;
