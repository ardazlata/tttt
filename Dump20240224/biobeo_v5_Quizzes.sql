
CREATE TABLE `Quizzes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poi_id` int DEFAULT NULL,
  `question` text NOT NULL,
  `option_a` varchar(255) NOT NULL,
  `option_b` varchar(255) NOT NULL,
  `option_c` varchar(255),
  `option_d` varchar(255),
  `correct_option` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `poi_id` (`poi_id`),
  CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`poi_id`) REFERENCES `POIs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `quizzes_chk_1` CHECK ((`correct_option` in (_utf8mb4'A',_utf8mb4'B',_utf8mb4'C')))
) 