import Gun from "gun";
import "gun/lib/path";
import UUID from "uuid/v4";
import { DATA_FILE, DEVICE_ID } from "../configs/localconfigs";
import { CLOUD_MEMORIES } from "../configs/clientMemories";

Gun.log.squelch = true;

const GLOBAL_STATE_ID = DEVICE_ID ? DEVICE_ID : UUID();
const gun = Gun({
  file: DATA_FILE,
  peers: CLOUD_MEMORIES
});

gun.on("out", { get: { "#": { "*": "" } } });

const gunLocal = Gun();

const appState = gunLocal.get(GLOBAL_STATE_ID);
const cloudState = gun.get(GLOBAL_STATE_ID);

export default { Gun, gun, appState, cloudState };
