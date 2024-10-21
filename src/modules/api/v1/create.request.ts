import { System } from "modules/system/main.ts";
import {
  RequestType,
  getIpFromRequest,
  compareIps,
  RequestMethod,
  getIpFromUrl,
} from "@oh/utils";
import { PROTO_DID_REGEX } from "shared/consts/at.consts.ts";

export const postCreateRequest: RequestType<unknown> = {
  method: RequestMethod.POST,
  pathname: "/create",
  func: async (request, url) => {
    const { auth } = System.getConfig();

    const token = request.headers.get("token");

    const ip = await getIpFromUrl(auth.api);
    const remoteIp = getIpFromRequest(request);

    if (!remoteIp || !ip || !compareIps(ip, remoteIp) || auth.token !== token)
      return Response.json({ status: 403 }, { status: 403 });

    const { username, did } = await request.json();

    if (!username || !did || !new RegExp(PROTO_DID_REGEX).test(did))
      return Response.json({ status: 403 }, { status: 403 });

    await System.ovh.updateRecord(username, did);

    return Response.json({ status: 200 }, { status: 200 });
  },
};
