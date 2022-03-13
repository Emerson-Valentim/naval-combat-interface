import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import { Url } from "url";

const httpAgent = new HttpAgent({
  keepAlive: true,
  maxSockets: 10,
});

const httpsAgent = new HttpsAgent({
  keepAlive: true,
  maxSockets: 10,
});

export const getAgent = (_parsedURL: Pick<Url, "protocol">) =>
  _parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
