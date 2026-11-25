-- Links each task to the user who created it.
-- Run once on a database created from an older schema.sql.
-- Existing tasks get UserId = NULL and will not appear for any user.

ALTER TABLE `items`
  ADD COLUMN `UserId` int DEFAULT NULL,
  ADD KEY `IX_items_UserId` (`UserId`),
  ADD CONSTRAINT `FK_items_users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;
