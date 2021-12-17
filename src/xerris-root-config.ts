/* eslint-disable no-console */
import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa/auth-app",
  app: () => System.import("@xerris/auth-app"),
  activeWhen: [(location) => location.pathname === "/"],
});

registerApplication({
  name: "@xerris/sidebar-app",
  app: () => System.import("@xerris/sidebar-app"),
  activeWhen: [(location) => location.pathname !== "/"],
});

registerApplication({
  name: "@xerris/calendar-app",
  app: () => System.import("@xerris/calendar-app"),
  activeWhen: ["calendar"],
});

start({
  urlRerouteOnly: true,
});
