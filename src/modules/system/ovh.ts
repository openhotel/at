import ovhApp from "ovh";
import { System } from "modules/system/main.ts";

export const ovh = () => {
  let $app: ovhApp;

  const load = async () => {
    $app = ovhApp(System.getConfig().ovh);
    await $app.requestPromised("GET", "/me");
  };

  const updateRecord = async (username: string, did: string) => {
    const domain = "openhotel.club";
    const subDomain = `_atproto.${username}`;
    const target = `"did=did:plc:${did}"`;

    const zoneEntries = await $app.requestPromised(
      "GET",
      `/domain/zone/${domain}/record`,
    );
    const entries = await Promise.all(
      zoneEntries.map((entryId: number) =>
        $app.requestPromised("GET", `/domain/zone/${domain}/record/${entryId}`),
      ),
    );

    const foundEntry = entries.find(
      (entry: any) => entry.subDomain === subDomain,
    );

    await $app.requestPromised(
      foundEntry ? "PUT" : "POST",
      `/domain/zone/${domain}/record` + (foundEntry ? `/${foundEntry.id}` : ""),
      {
        fieldType: "TXT",
        subDomain,
        target,
      },
    );

    await $app.requestPromised("POST", `/domain/zone/${domain}/refresh`);
  };

  return {
    load,
    updateRecord,
  };
};
