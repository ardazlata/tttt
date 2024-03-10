
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