import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;
const app = express();

app.get("/", (_, res) => {
  return res.send("Welcome to the News Aggregator!");
});

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server started at port:${PORT}`);
});
