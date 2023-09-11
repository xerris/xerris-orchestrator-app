/* eslint-disable no-console */
import { registerApplication, start } from "single-spa";

const authModule = "@xerris/auth-app";

export function runSpas() {
  registerApplication({
    name: "@xerris/auth-app",
    app: () =>
      import(
        /* @vite-ignore */
        authModule
      ),
    activeWhen: [(location) => location.pathname === "/"],
  });

  start();
}

runSpas();

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
