import { customAlphabet } from "nanoid";

export default (host) => {
  const nanoid = customAlphabet("1234567890abcdefghi", 10);
  const shortCode = nanoid();

  return { shortCode, shortUrl: `http://${host}/api/${shortCode}` };
};
