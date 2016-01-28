module.exports = function(config) {
    "use strict";
    config.set({
        autoWatch: false,
        basePath: "",
        browsers: ["PhantomJS"],
        colors: true,
        files: [
            "www/js/index.js", /* The file with the widget logic */
            "test/*.test.js" /* The file with the tests */
        ],
        frameworks: ["chai", "mocha"],
        // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        port: 9876,
        /*reporters: ["progress", "verbose"],*/
        reporters: ["verbose"], /* verbose to see the detail of each test */
        singleRun: true
    });
};
