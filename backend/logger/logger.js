const log4js = require("log4js");

log4js.configure({
    appenders: {
        request: {
        type: "dateFile",
        filename: "log_files/peershare.log",
        alwaysIncludePattern: true,
        pattern: '.yyyy-MM-dd',
        },
        response: {
        type: "dateFile",
        filename: "log_files/peershare.log",
        alwaysIncludePattern: true,
        pattern: '.yyyy-MM-dd',
        },
    },
    categories: {
        default: { appenders: ["request"], level: "error" },
        request: { appenders: ["request"], level: "info" },
        response: { appenders: ["response"], level: "info" },
    },
});

const request = log4js.getLogger("request");
const response = log4js.getLogger("response");

module.exports = {
    request: request,
    response: response,
    express: log4js.connectLogger(log4js.getLogger("request"), {
        level: log4js.levels.INFO,
    }),
};
