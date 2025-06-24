-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_bookingId_fkey`;

-- AlterTable
ALTER TABLE `bookings` MODIFY `status` ENUM('PENDING', 'BOOKED', 'COMPLETED', 'CANCELED') NOT NULL;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
