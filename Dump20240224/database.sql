
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL, 
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('teacher','student') NOT NULL DEFAULT 'student',
  `total_score` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) 
-- --------------------------------------------------------------
CREATE TABLE `Routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `is_adult` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`id`)
)
-- --------------------------------------------------------------

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
-- --------------------------------------------------------------

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

-- --------------------------------------------------------------

CREATE TABLE `Answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_id` int DEFAULT NULL,  -- quiz is a question
  `user_id` int NOT NULL,
  `selected_option` char(1) NOT NULL,
  `isCorrect` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_id` (`quiz_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `Quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) 
-- --------------------------------------------------------------

CREATE TABLE `User_POI_Visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `poi_id` int NOT NULL,
  `visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `score` int DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `poi_id` (`poi_id`),
  CONSTRAINT `user_poi_visits_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_poi_visits_ibfk_2` FOREIGN KEY (`poi_id`) REFERENCES `POIs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) 