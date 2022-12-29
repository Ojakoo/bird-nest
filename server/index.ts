import express from "express";
import next from "next";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Types
type APIgetArgs = {
  url: string;
  responseType: "json" | "document";
  urlParams?: {
    serialNumber: string;
  };
};

type FrontendPilotInfo = {
  fullname: string;
  phoneNumber: string;
  email: string;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://assignments.reaktor.com",
});

const APIget = async ({ url, responseType }: APIgetArgs) => {
  const request: AxiosRequestConfig = {
    url: url,
    method: "GET",
    responseType: responseType,
  };
  const response = await axiosInstance.request(request);

  return response.data;
};

// For api fetch
const checkPilots = async () => {
  reqCounter += 1;
  console.log(
    `Request number ${reqCounter} completed on ${new Date().toLocaleString()}`
  );

  const droneData = await APIget({
    url: "/birdnest/drones",
    responseType: "document",
  });

  const offendingSerialNumbers: Array<string> = [];

  // Parse data and check if there are any offending drones

  // Fetch the pilot data and add to server storage
  // If pilot was seen (found in local) just update time stamp

  // for (const serialNumber of offendingSerialNumbers) {
  //   console.log("?");
  //   const pilot = await APIget({
  //     url: "/birdnest/pilots/:serialNumber",
  //     responseType: "json",
  //     urlParams: {
  //       serialNumber: serialNumber,
  //     },
  //   });
  // }

  // we could check if entry is 10min old here but we can also
  // drop old data while doing ssr, this however might lead to
  // cases where swr fetches old cached data.

  console.log(
    `Request number ${reqCounter} completed on ${new Date().toLocaleString()}`
  );
};

// Data array for storage
let pilotInfo: Array<FrontendPilotInfo> = [
  {
    fullname: "ASD",
    email: "ASD",
    phoneNumber: "ASD",
  },
  {
    fullname: "JAS",
    email: "JAS",
    phoneNumber: "JAS",
  },
];

// for debug and deploy monitoring
let reqCounter = 0;

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      if (req.path === "/api/pilots") {
        return res.json(pilotInfo);
      }
      return handle(req, res);
    });

    setInterval(checkPilots, 10000);

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
