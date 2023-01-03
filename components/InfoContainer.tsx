import { PilotInfo } from "@models/PilotInfo";
import React from "react";

const InfoContainer: React.FC<PilotInfo> = ({
  fullname,
  phoneNumber,
  email,
  lastSeen,
  smallestDistance,
}) => (
  <div className="container-sm m-4 min-w-full rounded-2xl border-2 p-2 shadow">
    <p>Name: {fullname}</p>
    <p>Phone: {phoneNumber}</p>
    <p>Email: {email}</p>
    <p>Distance: {smallestDistance.toFixed(2)}m</p>
    <p>Last seen: {lastSeen.toLocaleTimeString("fi-FI")}</p>
  </div>
);

export default InfoContainer;
