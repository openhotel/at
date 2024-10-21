export type ConfigTypes = {
  version: string;
  port: number;
  auth: {
    api: string;
    key: string;
    token: string;
  };
  ovh: {
    appKey: string;
    appSecret: string;
    consumerKey: string;
  };
};
