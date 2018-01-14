import { LOG, CLIENT_HOST } from "../api/logremote";
// import { ENCRYPTION_KEY } from "../configs/secrets";
import SecureLS from "secure-ls";
import { DEBUG } from "../configs/localconfigs";
//const DEBUG=true;

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
  ? process.env.ENCRYPTION_KEY
  : "Super-Secret-Key";
const aes_c = new SecureLS({
  encodingType: "aes",
  encryptionSecret: ENCRYPTION_KEY
});

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.storage initialize : ",
    new Date().toISOString()
  );
export const storageGetItem = key => {
  if (DEBUG)
    LOG.log("[" + CLIENT_HOST + "]", "1.storage storageGetItem : ", key);
  return aes_c.get(key);
};
export const storageSetItem = (key, value) => {
  if (DEBUG)
    LOG.log("[" + CLIENT_HOST + "]", "1.storage storageSetItem : ", key, value);
  return aes_c.set(key, value);
};
export const storageTest = (key, data) => {
  let ae = aes_c.AES.encrypt(JSON.stringify(data), "");
  let bde = aes_c.AES.decrypt(ae.toString(), "");
  let de = JSON.parse(bde.toString(aes_c.enc._Utf8));

  storageSetItem(key, data);

  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "-------- vvv AES Compressed vvv --------"
    );
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "encrypt : ",
      ae,
      ae.toString().length,
      "\ndecrypt : ",
      bde,
      bde.toString().length,
      "\ntoString : ",
      de,
      de.length
    );
  if (DEBUG) LOG.log("[" + CLIENT_HOST + "]", data, data.length);
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      localStorage.getItem(key),
      localStorage.getItem(key).length
    );
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      storageGetItem(key),
      storageGetItem(key).length
    );
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "-------- ^^^ AES Compressed ^^^ --------"
    );
};
