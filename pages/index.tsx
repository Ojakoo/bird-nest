import { NextPage } from "next";
import useSWR from "swr";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { PilotInfo } from "@models/PilotInfo";
import InfoContainer from "@components/InfoContainer";

type FetcherArgs = {
  url: string;
};

type SWRReturn = {
  data: Array<PilotInfo>;
  error?: any;
};

const axiosInstance: AxiosInstance = axios.create({});

const fetcher = async ({ url }: FetcherArgs) => {
  const request: AxiosRequestConfig = {
    url: url,
    method: "GET",
    responseType: "json",
  };
  const response = await axiosInstance.request(request);

  const pilots = response.data.map((pilot: PilotInfo) => ({
    ...pilot,
    lastSeen: new Date(pilot.lastSeen),
  }));

  return pilots;
};

const Home: NextPage<null> = () => {
  const { data: pilots, error: error }: SWRReturn = useSWR(
    { url: "api/pilots" },
    fetcher,
    {
      refreshInterval: 2000,
    }
  );

  // if (error) return <div>Lol</div>;

  if (!pilots) return <div>Loading</div>;

  console.log(pilots);

  return (
    <>
      <h1 className="p-10 text-2xl">Offending pilots information:</h1>
      <div className="flex w-1/3 flex-wrap">
        {pilots.map((pilot) => (
          <InfoContainer key={pilot.fullname} {...pilot} />
        ))}
      </div>
    </>
  );
};

export default Home;
