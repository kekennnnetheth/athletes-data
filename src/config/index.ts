import express from "express";
import path from "path";
import { Pool } from "pg";

const app = express();
const PORT: string | number = process.env.PORT || 5000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.send("<h1>Welcome to your simple server! Awesome right</h1>");
});

app.get("/overview", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    const results = { results: result ? result.rows : null };
    console.log(results);
    res.render("pages/overview", results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get("/2400m_run", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM "2400m_run"`);
    const results = { results: result ? result.rows : null };
    console.log(results);
    res.render("pages/2400m-run", results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.listen(PORT, () => console.log(`hosting @${PORT}`));
