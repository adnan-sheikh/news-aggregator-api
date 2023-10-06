import "dotenv/config";
import express from "express";
import { registerUser } from "./handler/user.js";
import { db } from "./db/index.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", registerUser);
app.get("/users", (req, res) => {
  return res.json(Object.values(db.users));
});

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server started at port:${PORT}`);
});
