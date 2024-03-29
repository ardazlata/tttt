CREATE TABLE `UsersWithPrivilige` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL, 
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('teacher','admin') NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);
