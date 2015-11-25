module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);
	
	grunt.initConfig({
		csslint: {
			validateIndexCSS: {
				options: {
					csslintrc: ".csslintrc"
				},
				src: ["www/css/index.css"]
			}
		},
		jsvalidate: {
			options:{
				globals: {}, esprimaOptions: {}, verbose: true
			},
			targetName:{
				files:{
					src:["www/js/index.js"]
				}
			}
		},
		jsonlint: {
			checkConfig: {
				src: ["www/config.json"]
			},
			checkEnUsTranslation: {
				src: ["www/locales/en-US/translation.json"]
			}
		},
		sass: {
			dist: {
				options: {
					style: "compressed"
				},
				files: {
					"www/css/index.css" : "www/scss/index.scss"
				}
			}
		},
		xml_validator: {
			checkPhoneGapConfig: {
				src: ["config.xml"]
			}
		}
	});
	
	grunt.registerTask("default", ["csslint", "jsvalidate", "jsonlint", "sass", "xml_validator"]);
};
