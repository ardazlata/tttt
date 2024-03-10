
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