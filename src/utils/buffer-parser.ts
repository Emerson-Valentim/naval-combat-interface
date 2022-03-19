import { Buffer } from "buffer";

export const parseBuffer = (message: any) =>
  Buffer.from(JSON.stringify(message));
