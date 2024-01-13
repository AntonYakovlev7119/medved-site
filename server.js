require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("medvedDB.db");

const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const clientRoute = require("./routes/clientRoute");
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");
const ApiError = require("./models/Error");
const Content = require("./models/Content");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/test", async (req, res) => {
  const content = await Content.getProducts();
  const data = Object.entries(content);
  res.json("fd");
  // res.render("__blocks/cart", { products: cart });
  // res.json(content);
});

app.post("/test", async (req, res) => {});

app.get("/", authMiddleware, async (req, res, next) => {
  try {
    // const error = new Error("Ошибка");
    // error.code = 404;
    // console.log(error.code);
    // throw error;
    const content = await Content.getPageContent(["index", "all"]);
    res.render("index", {
      content,
      req,
    });
    
  } catch (err) {
    return next(new ApiError(err));
  }
});

app.get("/catalog", authMiddleware, async (req, res) => {
  try {
    const content = await Content.getPageContent(["all"]);
    const products = await Content.getProducts();

    res.render("./pages/catalog", {
      content,
      products,
      req,
    });
  } catch (err) {
    return next(new ApiError(err));
  }
});

app.get("/contacts", authMiddleware, async (req, res) => {
  try {
    const content = await Content.getPageContent(["contacts", "all"]);

    res.render("./pages/contacts", {
      content,
      req,
    });
  } catch (err) {
    return next(new ApiError(err));
  }
});

app.use(authRoute);
app.use("/admin", adminRoute);
app.use(clientRoute);

//Обработка ошибок
app.use(errorHandler);

app.use((req, res) => {
  res.render("error", { err: 404, message: "Страница не найдена" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
