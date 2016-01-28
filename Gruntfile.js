module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.initConfig({
		copy: {
			main: {
				files: [
					{src: ["www/locales/en/translation.json"], dest: "www/locales/dev/translation.json"}
				]
			}
		},
		csslint: {
			validateIndexCSS: {
				options: {
					csslintrc: ".csslintrc"
				},
				src: ["www/css/index.css"]
			}
		},
		jsvalidate: {
			options: {
				globals: {},
				esprimaOptions: {},
				verbose: true
			},
			index: {
				files: {
					src: ["www/js/index.js"]
				}
			},
			bcp_47: {
				files: {
					src: ["www/js/modules/bcp_47.js"]
				}
			},
			google: {
				files: {
					src: ["www/js/modules/google/geocode.js"]
				}
			}
		},
		jsonlint: {
			checkConfig: {
				src: ["www/config.json"]
			},
			checkTranslationFiles: {
				src: ["www/locales/*/*.json"]
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
	
	grunt.registerTask("default", ["copy", "csslint", "jsvalidate", "jsonlint", "sass", "xml_validator"]);
};
