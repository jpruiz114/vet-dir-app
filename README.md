# VetDir

A PhoneGap Android App designed to find pet friendly places arround you.

A PHP based API is consumed by this app.

## Build & Validation Automation with Grunt

:bulb: Install the command line interface for Grunt
`npm install -g grunt-cli`

:bulb: Install the latest version of Grunt in your project folder
`npm install grunt --save-dev`

:bulb: Install the **grunt-contrib-copy** package
`npm install grunt-contrib-copy --save-dev`

:bulb: Install the **grunt-contrib-csslint** package
`npm install grunt-contrib-csslint --save-dev`

:bulb: Install the **grunt-contrib-sass** package
`npm install grunt-contrib-sass --save-dev`

:bulb: Install the **grunt-jsonlint** package
`npm install grunt-jsonlint --save-dev`

:bulb: Install the **grunt-jsvalidate** package
`npm install grunt-jsvalidate --save-dev`

:bulb: Install the **grunt-xml-validator** package
`npm install grunt-xml-validator --save-dev`

:bulb: Install the **load-grunt-tasks** package
`npm install load-grunt-tasks --save-dev`

* Notice that the **node_modules** folder was excluded from the repository in the **.gitignore** file.

## Testing

### Karma

:bulb: Install the command line interface for Karma
`npm install -g karma-cli`

### Dependencies

:bulb: Install the **chai** package
`npm install chai --save-dev`

:bulb: Install the **grunt-karma** package
`npm install grunt-karma --save-dev`

:bulb: Install the **karma** package
`npm install karma --save-dev`

:bulb: Install the **karma-chai** package
`npm install karma-chai --save-dev`

:bulb: Install the **karma-firefox-launcher** package
`npm install karma-firefox-launcher --save-dev`

:bulb: Install the **karma-mocha** package
`npm install karma-mocha --save-dev`

:bulb: Install the **karma-phantomjs-launcher** package
`npm install karma-phantomjs-launcher --save-dev`

:bulb: Install the **karma-sinon** package
`npm install karma-sinon --save-dev`

:bulb: Install the **karma-verbose-reporter** package
`npm install karma-verbose-reporter --save-dev`

:bulb: Install the **mocha** package
`npm install mocha --save-dev`

:bulb: Install the **phantomjs** package
`npm install phantomjs --save-dev`

:bulb: Install the **sinon** package
`npm install sinon --save-dev`

To check that Karma is installed:

`karma --version`

To init Karma:

`karma init`

That should create the karma.conf.js Setup the config file. Then write a test.

To run Karma:

`karma start`

## Notes about mobile devices debug with weinre:

Install weinre:
`npm install weinre`

Start weinre service like this:
`weinre --httpPort pppp --boundHost xx.xx.xx.xx`

Add this to the app:
<script src="http://xx.xx.xx.xx:pppp/target/target-script-min.js#anonymous"></script>

Check connected instances here:
http://xx.xx.xx.xx:pppp/

## Android terminal commands

In order to launch the Android Virtual Device tool:
`android avd`

In order to launch the Android SDK:
`android sdk`

## Language

### bcp 47

A bcp 47 validator:

http://schneegans.de/lv/

## For donations

https://supporter.60devs.com/

[![Support](https://supporterhq.com/api/b/ecd6772531401b42c1b98278c0b5e1f7)](https://supporterhq.com/give/ecd6772531401b42c1b98278c0b5e1f7)

