const app = require("./app");
const { PORT } = process.env;

app.listen(PORT, (req, res) => {
  console.log(`app is running at ${PORT}`);
});
