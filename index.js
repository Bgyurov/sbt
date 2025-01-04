const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const setupViewEngine = require("./config/view-engine");
const initDatabase = require("./config/database-init");
const PORT = process.env.PORT;
const app = express();
setupViewEngine(app);

app.use(
  session({
    secret: "yourSecretKey",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.set("trust proxy", true);
app.set("trust proxy", "loopback");
app.use(cookieParser());
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

initDatabase()
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((err) => console.error(err));
