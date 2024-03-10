CREATE TABLE `Routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `is_adult` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`id`)
)