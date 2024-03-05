const debug = require("debug")("app:server");
const app = require("./server");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  debug(`Server is running on port ${port}`);
});
