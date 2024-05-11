const logger = window.console;

const executeIfDev = (func: () => void) => {
  if (import.meta.env.DEV) func();
};
const debug = {
  log(...data: unknown[]) {
    executeIfDev(() => logger.log(...data));
  },
  error(...data: unknown[]) {
    executeIfDev(() => logger.error(...data));
  },
  dir(...data: unknown[]) {
    executeIfDev(() => logger.dir(...data));
  },
};
export default debug;
