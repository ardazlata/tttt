
CREATE TABLE `POIs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `route_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `pois_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `Routes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) 