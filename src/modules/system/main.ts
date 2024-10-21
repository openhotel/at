import { ConfigTypes, Envs } from "shared/types/main.ts";
import { getConfig as $getConfig, update } from "@oh/utils";
import { CONFIG_DEFAULTS } from "shared/consts/config.consts.ts";
import { api } from "./api.ts";
import { ovh } from "./ovh.ts";

export const System = (() => {
  let $config: ConfigTypes;
  let $envs: Envs;

  const $ovh = ovh();
  const $api = api();

  const load = async (envs: Envs) => {
    $envs = envs;
    $config = await $getConfig<ConfigTypes>({
      defaults: CONFIG_DEFAULTS,
    });

    const isDevelopment = $envs.version === "development";

    if (
      !isDevelopment &&
      (await update({
        targetVersion: $config.version,
        version: envs.version,
        repository: "openhotel/at",
        log: console.log,
        debug: console.debug,
      }))
    )
      return;

    await $ovh.load();
    $api.load();
  };

  const getConfig = () => $config;
  const getEnvs = () => $envs;

  return {
    load,
    getConfig,
    getEnvs,

    api: $api,
    ovh: $ovh,
  };
})();
