/* eslint-disable no-console */
import { LifeCycles, registerApplication, start } from "single-spa";

registerApplication({
  name: "@xerris/auth-app",
  app: () =>
    import(
      /* webpackIgnore: true */
      "http://localhost:9002/src/xerris-auth-app.ts"
    ),
  activeWhen: [(location) => location.pathname === "/"],
});

// registerApplication({
//   name: "@xerris/sidebar-app",
//   app: () => System.import("@xerris/sidebar-app"),
//   activeWhen: [(location) => location.pathname !== "/"],
// });

// registerApplication({
//   name: "@xerris/calendar-app",
//   app: () => System.import("@xerris/calendar-app"),
//   activeWhen: ["calendar"],
// });

// registerApplication({
//   name: "@xerris/pricing-calculator",
//   app: () => System.import("@xerris/pricing-calculator"),
//   activeWhen: ["/pricing-calculator"],
// });

// registerApplication({
//   name: "@xerris/home-app",
//   app: () => System.import("@xerris/home-app"),
//   activeWhen: ["/home"],
// });

start({
  urlRerouteOnly: true,
});
