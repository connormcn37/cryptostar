//import uuid from "uuid-js";
//import queue from "shuffled-priority-queue";
//import Promise from "bluebird";
import md5 from "blueimp-md5";
import serialize from "serialize-javascript";
//import base64 from 'base64-js'
import lzwCompress from "./lzwCompress";
import convert from "binstring";
//import bsEncoder from 'bs58'
import SimpleCryptoJS from "simple-crypto-js";
//import { Serialize, Deserialize } from 'cerialize';
// import { ENCRYPTION_KEY } from "../configs/secrets";

import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.commandControl initiated : ",
    new Date().toISOString()
  );

const R = require("ramda");

const TODAY = new Date().toISOString();
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
  ? process.env.ENCRYPTION_KEY
  : "Super-Secret-Key";
const encoder = new SimpleCryptoJS(ENCRYPTION_KEY);

export const encrypt = message => {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.commandControl encrypt message : ",
      message
    );
  if (!message) return message;
  try {
    const cmp = (x, y) => x.a === y.a;
    const msgString = serialize(message);
    const compressed = JSON.stringify(lzwCompress.pack(msgString));
    const hexbytes = convert(compressed, { in: "binary", out: "hex" });
    const encoded = encoder.encrypt(hexbytes);

    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "2.commandControl encrypt VERIFIED : ",
        (R.equals(msgString, lzwCompress.unpack(JSON.parse(compressed))) ===
          R.isEmpty(
            R.differenceWith(
              cmp,
              compressed,
              convert(hexbytes, { in: "hex", out: "bytes" })
            )
          )) ===
          R.equals(hexbytes, encoder.decrypt(encoded))
      );
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "3.commandControl encrypt encoded : ",
        encoded
      );
    return encoded;
  } catch (e) {
    LOG.log("[" + CLIENT_HOST + "]", "4.commandControl encrypt error : ", e);
    return null;
  }
};

export const decrypt = message => {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.commandControl decrypt message : ",
      message
    );
  if (!message) return message;
  try {
    const decodedMsg = encoder.decrypt(message);
    const converted = convert(decodedMsg, { in: "hex", out: "binary" });
    const decoded = JSON.parse(lzwCompress.unpack(JSON.parse(converted)));
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "2.commandControl decrypt decoded ==> ",
        decoded
      );
    return decoded;
  } catch (e) {
    //    if (DEBUG)
    LOG.error("[" + CLIENT_HOST + "]", "3.commandControl decrypt error : ", e);
    return null;
  }
};

if (DEBUG) {
  const DEBUG_VALIDATE = { date: TODAY };
  const DEBUG_md5Today = md5(DEBUG_VALIDATE);
  const DEBUG_validateEncrypt = encrypt(DEBUG_VALIDATE);
  const DEBUG_validateDecrypt = decrypt(DEBUG_validateEncrypt);
  const DEBUG_md5Validate = md5(DEBUG_validateDecrypt);

  LOG.log(
    "[" + CLIENT_HOST + "]",
    "1.commandControl VALIDATION : ",
    DEBUG_VALIDATE
  );
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "2.commandControl VALIDATION encrypted : ",
    DEBUG_validateEncrypt
  );
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "3.commandControl VALIDATION md5 : ",
    DEBUG_md5Today,
    DEBUG_md5Validate
  );
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "4.commandControl VALIDATION decrypted : ",
    DEBUG_VALIDATE,
    DEBUG_validateDecrypt
  );
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "5.commandControl VALIDATION : ",
    R.equals(DEBUG_VALIDATE, DEBUG_validateDecrypt)
  );
}
