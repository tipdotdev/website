import winston, { createLogger } from "winston";

const log = createLogger({
    level: "info",
    format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.colorize()),
    transports: [new winston.transports.Console()]
});

export default log;
