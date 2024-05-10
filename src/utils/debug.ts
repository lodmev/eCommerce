const logger = window.console;
const debug = {
  executeIfDev(func: () => void) {
    if (import.meta.env.DEV) func();
  },
  log(...data: unknown[]) {
    this.executeIfDev(() => logger.log(...data));
  },
  error(...data: unknown[]) {
    this.executeIfDev(() => logger.error(...data));
  },
  dir(...data: unknown[]) {
    this.executeIfDev(() => logger.dir(...data));
  },
};

export default debug;
