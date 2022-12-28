import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// For api fetch
function checkPilots() {
  // write drone get logic here,
  // check for violations
  // data needs to be retained for 10 minutes
  console.log("Fetching data from API");
}

let data = [
  {
    name: "ASD",
    emailAddress: "ASD",
    phoneNumber: "ASD",
  },
  {
    name: "JAS",
    emailAddress: "JAS",
    phoneNumber: "JAS",
  },
];

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      console.log(req.path);

      if (req.path === "/api/pilots") {
        return res.json(data);
      }
      return handle(req, res);
    });

    // setInterval(checkPilots, 2000);

    server.listen(3000, (err?: any) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

export default app;
