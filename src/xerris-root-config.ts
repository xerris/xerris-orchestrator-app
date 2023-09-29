/* eslint-disable no-console */
import { LifeCycles, registerApplication, start } from "single-spa";

const calendarModule = "@xerris/calendar-app";

export function runSpas() {
  registerApplication({
    name: "@xerris/calendar-app",
    app: () =>
      System.import<LifeCycles>(
        /* @vite-ignore */
        calendarModule
      ),
    activeWhen: [(location) => location.pathname === "/"],
  });

  start();
}

runSpas();
