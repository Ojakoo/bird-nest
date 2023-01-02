import express from "express";
import next from "next";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { XMLParser } from "fast-xml-parser";
import { PilotInfo } from "@models/PilotInfo";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const parser = new XMLParser();

// Types
type APIgetArgs = {
  url: string;
  responseType: "json" | "document";
};

type Drone = {
  serialNumber: string;
  model: string;
  manufacturer: string;
  mac: string;
  ipv4: string;
  ipv6: string;
  firmware: string;
  positionY: number;
  positionX: number;
  altitude: number;
};

type Pilot = {
  pilotId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdDt: Date;
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
  const droneData = await APIget({
    url: "/birdnest/drones",
    responseType: "document",
  });

  // Parse data and check if there are any offending drones
  const drones: Array<Drone> = parser.parse(droneData).report.capture.drone;

  for (const drone of drones) {
    // Calculate distance
    // 100 meter radius, origin at position 250000,250000
    const distance = Math.sqrt(
      Math.pow(250 - drone.positionX / 1000, 2) +
        Math.pow(250 - drone.positionY / 1000, 2)
    );

    // Get data of offending pilots
    if (distance <= 100) {
      try {
        const pilot: Pilot = await APIget({
          url: `/birdnest/pilots/${drone.serialNumber}`,
          responseType: "json",
        });

        // if pilotInfo has existing instance and distance is smaller use that
        const existingEntry = pilotInfo.get(pilot.pilotId);

        // use set to add and update enries
        pilotInfo.set(pilot.pilotId, {
          fullname: `${pilot.firstName} ${pilot.lastName}`,
          email: pilot.email,
          phoneNumber: pilot.phoneNumber,
          lastSeen: new Date(),
          smallestDistance:
            existingEntry && distance > existingEntry.smallestDistance
              ? existingEntry.smallestDistance
              : distance,
        });
      } catch (error) {
        // TODO: make better error handling
        console.log("error");
      }
    }
  }

  console.log(pilotInfo);

  // we could check if entry is 10min old here but we can also
  // drop old data while doing ssr, this however might lead to
  // cases where swr fetches old cached data.
};

// Data map for storage, pilotID as key
let pilotInfo = new Map<string, PilotInfo>();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      if (req.path === "/api/pilots") {
        const returnArray: Array<PilotInfo> = [];

        pilotInfo.forEach((value) => {
          returnArray.push(value);
        });

        return res.json(returnArray);
      }
      return handle(req, res);
    });

    setInterval(checkPilots, 2000);

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
