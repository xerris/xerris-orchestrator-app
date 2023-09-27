/* eslint-disable no-console */
import { LifeCycles, registerApplication, start } from "single-spa";

const authModule = "@xerris/auth-app";
const calendarModule = "@xerris/calendar-app";
const sideBarModule = "@xerris/sidebar-app";
const homeModule = "@xerris/home-app";

export function runSpas() {
  registerApplication({
    name: "@xerris/auth-app",
    app: () => System.import<LifeCycles>(authModule),
    activeWhen: [(location) => location.pathname === "/"],
  });

  registerApplication({
    name: "@xerris/calendar-app",
    app: () =>
      System.import<LifeCycles>(
        /* @vite-ignore */
        calendarModule
      ),
    activeWhen: [(location) => location.pathname === "/calendar"],
  });

  registerApplication({
    name: "@xerris/sidebar-app",
    app: () => System.import<LifeCycles>(sideBarModule),
    activeWhen: [(location) => location.pathname !== "/"],
  });

  registerApplication({
    name: "@xerris/home-app",
    app: () => System.import<LifeCycles>(homeModule),
    activeWhen: ["/home"],
  });

  // registerApplication({
  //   name: "@xerris/pricing-calculator",
  //   app: () => System.import("@xerris/pricing-calculator"),
  //   activeWhen: ["/pricing-calculator"],
  // });

  start();
}

runSpas();
