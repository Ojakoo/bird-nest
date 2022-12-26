
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://assignments.reaktor.com"
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const request: AxiosRequestConfig = {
    url: "/birdnest/drones",
    method: "GET",
    responseType: "document",
  };
  const response = await axiosInstance.request<ResponseType>(request);
  res.json({ data: response.data })
};