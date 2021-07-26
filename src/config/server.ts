import express from "express";
import path from "path";

const app = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("<h1>Welcome to your simple server! Awesome right</h1>");
});

app.get("/overview", (req, res) =>
  res.send("<h1>This will be the overview result page</h1>")
);

app.listen(PORT, () => console.log(`hosting @${PORT}`));
