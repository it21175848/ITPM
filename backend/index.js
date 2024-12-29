const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const axios = require("axios");

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  // Get or create user on Chat Engine!
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "ee636980-d163-4cfd-a1ac-bef5724c06ad" } }
    );

    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

const PORT = 3001;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to start the server: ${err.message}`);
  } else {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
  }
});