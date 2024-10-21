import { ConfigTypes } from "shared/types/config.types.ts";

export const CONFIG_DEFAULTS: ConfigTypes = {
  version: "latest",
  port: 9120,
  auth: {
    api: "http://localhost:2024/api/v2",
    key: "PRIVATE_KEY",
    token: "PRIVATE_TOKEN",
  },
  ovh: {
    appKey: "",
    appSecret: "",
    consumerKey: "",
  },
};