require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Rotaların import edilmesi
const routeRoutes = require("./Routes/routeRoutes");
const poiRoutes = require("./Routes/poiRoutes"); // POI için oluşturduğunuz rota
const quizRoutes = require("./Routes/quizRoutes"); // Quiz için oluşturduğunuz rota
const answerRoutes = require("./Routes/answerRoutes"); // Cevaplar için oluşturduğunuz rota
const userRoutes = require("./Routes/userRoutes"); // Kullanıcı rotaları
const statisticsRoutes = require("./Routes/statisticsRoutes"); // İstatistikler için rota

const app = express();

// CORS middleware'ini kullanarak tüm originlerden gelen isteklere izin ver
app.use(cors());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kullanıcı rotalarının uygulamaya eklenmesi
app.use("/api/users", userRoutes);

// Diğer rotaların uygulamaya eklenmesi
app.use("/api/routes", routeRoutes);
app.use("/api/pois", poiRoutes); // POI için oluşturduğunuz rota
app.use("/api/quizzes", quizRoutes); // Quiz için oluşturduğunuz rota
app.use("/api/answers", answerRoutes); // Cevaplar için oluşturduğunuz rota
app.use("/api/statistics", statisticsRoutes); // İstatistikler için rota

console.log(  process.env.HOST_NAME,
 process.env.USER_NAME,
  process.env.PW,
 process.env.DB_NAME);
// Server'ın başlatılması
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
