const logger = window.console;

const debug = import.meta.env.DEV
  ? logger
  : {
      log() {},
      error() {},
      dir() {},
    };
export default debug;
