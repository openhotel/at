import { RequestType, getPathRequestList } from "@oh/utils";

import { versionRequest } from "./version.request.ts";
import { postCreateRequest } from "./create.request.ts";

export const requestV1List: RequestType<unknown>[] = getPathRequestList({
  requestList: [versionRequest, postCreateRequest],
  pathname: "/api/v1",
});
