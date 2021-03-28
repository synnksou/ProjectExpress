
const logger = require('pino')({
    base: null,
    prettyPrint: true
});
const moment = require("moment-timezone");
moment.tz.setDefault("Europe/Paris");
moment.locale('fr');

/**
 * Base implementation of logger writing in console.
 */
class Logger {
    constructor() {
        this.logger = logger;
    }

    /**
     * Logs an info message.
     *
     * @param {...object} args arguments to be relayed for logging
     */
    info(args) {
      this.logger.info({ ...args, date: moment().format('DD-MM-YYYY HH:mm:ss') });
    }

    warn(args) {
      this.logger.warn({ ...args, date: moment().format('DD-MM-YYYY HH:mm:ss') });
    }

    error(args) {
      this.logger.error({ ...args, date: moment().format('DD-MM-YYYY HH:mm:ss') } );
    }

    debug(args) {
      this.logger.debug({ ...args, date: moment().format('DD-MM-YYYY HH:mm:ss') });
    }

    trace(args) {
      this.logger.trace({ ...args, date: moment().format('DD-MM-YYYY HH:mm:ss') });
    }
}

module.exports = new Logger();
