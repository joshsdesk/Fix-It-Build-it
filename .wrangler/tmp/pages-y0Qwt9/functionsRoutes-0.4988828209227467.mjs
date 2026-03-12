import { onRequestPost as __api_contact_ts_onRequestPost } from "/mnt/Playground/Projects/Projects/Fix-It-Build-it/functions/api/contact.ts"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_ts_onRequestPost],
    },
  ]