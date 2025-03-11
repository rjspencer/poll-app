import { AppLoadContext } from "@remix-run/cloudflare";

export const isAdmin = (context: AppLoadContext, key?: string) => {
  return key && key === context.cloudflare.env.ADMIN_KEY;
};
