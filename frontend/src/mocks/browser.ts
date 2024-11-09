/* eslint-disable */

import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  worker
    .start({
      onUnhandledRequest: "bypass",
    })
    .catch(console.error);
}
