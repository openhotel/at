export type ConfigTypes = {
  version: string;
  port: number;
  auth: {
    api: string;
    token: string;
  };
  ovh: {
    appKey: string;
    appSecret: string;
    consumerKey: string;
  };
};
