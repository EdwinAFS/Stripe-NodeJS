const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.engine(
	".hbs",
	expressHandlebars.engine({
		defaultLayout: "main",
		layoutsDir: path.join(app.get("views"), "layouts"),
		partialsDir: path.join(app.get("views"), "partials"),
		extname: ".hbs",
	})
);
app.set("view engine", ".hbs");

app.use(require("./routes/index"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT, () => {
	console.log("Server on port", process.env.PORT);
});
