# answer problem

Body =>
PoiId | QuizId
array [] : int with the answers like [1,2,4,3,2,1] // optionId
Header =>
token must be send with the user

response in json
{
"success":"true",
"message":"any message that answer submitted",

<!-- Optional -->

"calculate the points of this quiz" => "points":4,
"total":10
}

---

Database configuration in mysql and it is nativw sql

###

Answer model

---

# Changes to code

- mysql2 instead of mysql

---

route -> pois
poi -> point on the map
point itself has a quiz ti be answered
quiz => multi question "quiz in db is one question"
to get all questions **"SELECT \* FROM QUIZZES WHERE POIID=?"**
each quiz aka question has one correct answer stored in

---
- [x] new schema
status
"username unique" "pois"
get status for all -> return username poi score 
---

/api/statistics
topScores
allScores



---
submit answer can have previous