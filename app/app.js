const express = require("express");

const SERVER_PORT = 8000;
const app = new express();

app.use("/", express.static("dist"));

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
