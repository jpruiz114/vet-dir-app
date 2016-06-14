var app = {
	/**
	 *
	 */
	appJustLoaded: 1,

	/**
	 *
	 */
	google_geocode: null,

	/**
	 *
	 */
	bcp_47: null,

	/**
	 *
	 */
	lang_per_country: null,

	/**
	 *
	 */
	resultList: null,

	/**
	 *
	 */
	settings: null,

	/**
	 *
	 */
	initialize: function() {
		this.bindEvents();
	},

	/**
	 *
	 */
	bindEvents: function() {
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},

	/**
	 *
	 */
	onDeviceReady: function() {
		document.addEventListener("backbutton", app.goBackButtonHandler, true);

		// Load the app config.
		app.loadConfig();
	},
	
	/* ***** */

	/**
	 *
	 * @param viewName
	 * @returns {*|jQuery}
	 */
	viewHasBeenFixed: function(viewName) {
		if (null != viewName) {
			if ($("#" + viewName).length) {
				var viewFixed = $("#" + viewName).data("view-fixed");

				return viewFixed;
			} else {
				// @todo
			}
		} else {
			// @todo
		}
	},

	/**
	 *
	 * @param viewName
	 */
	setViewAsFixed: function(viewName) {
		if (null != viewName) {
			if ($("#" + viewName).length) {
				$("#" + viewName).data("view-fixed", 1);
			} else {
				// @todo
			}
		} else {
			// @todo
		}
	},
	
	/* ***** */

	/**
	 *
	 */
	addNewVenue: function() {
		app.showAlert("addNewVenue", null, "info", "ok");
		
		
	},
	
	/* ***** */

	/**
	 *
	 * @param viewName
	 */
	welcomeCallback: function(viewName) {
		if (null != viewName) {
			// Fix the view header.
			app.fixViewHeader(viewName);
		} else {
			// @todo
		}
	},
	
	/* ***** */

	/**
	 *
	 */
	loadConfig: function() {
		$.getJSON("config.json", app.loadConfigCallback);
	},

	/**
	 *
	 * @param json
	 */
	loadConfigCallback: function(json) {
		var api_base_path = json.config.api_base_path;
		app.setApiBasePath(api_base_path);
		
		var pet_service_category_id = json.foursquare.categories.pet_service_category_id;
		app.setFsPetServiceCategory(pet_service_category_id);
		
		var pet_store_category_id = json.foursquare.categories.pet_store_category_id;
		app.setFsPetStoreCategory(pet_store_category_id);
		
		var veterinarian_category_id = json.foursquare.categories.veterinarian_category_id;
		app.setFsVeterinarianCategory(veterinarian_category_id);

		if (app.google_geocode) {
			var google_geocode_api_token = json.google.geocode.api_token;
			app.google_geocode.api_key = google_geocode_api_token;

			// Pass a reference for the jQuery object.
			app.google_geocode.$ = $;
		} else {
			// @todo
		}

		app.defaultVariables(
			function() {
				// Load the language.
				app.initLangFeature();
			}
		);
	},
	
	/* ***** */

	/**
	 *
	 */
	apiBasePath: "",

	/**
	 *
	 * @param _apiBasePath
	 */
	setApiBasePath: function(_apiBasePath) {
		this.apiBasePath = _apiBasePath;
	},

	/**
	 *
	 * @returns {string}
	 */
	getApiBasePath: function() {
		return this.apiBasePath;
	},
	
	/* ***** */

	/**
	 *
	 */
	fsPetServiceCategory: "",

	/**
	 *
	 * @param _fsPetServiceCategory
	 */
	setFsPetServiceCategory: function(_fsPetServiceCategory) {
		this.fsPetServiceCategory = _fsPetServiceCategory;
	},

	/**
	 *
	 * @returns {string}
	 */
	getFsPetServiceCategory: function() {
		return this.fsPetServiceCategory;
	},
	
	/* ***** */

	/**
	 *
	 */
	fsPetStoreCategory: "",

	/**
	 *
	 * @param _fsPetStoreCategory
	 */
	setFsPetStoreCategory: function(_fsPetStoreCategory) {
		this.fsPetStoreCategory = _fsPetStoreCategory;
	},

	/**
	 *
	 * @returns {string}
	 */
	getFsPetStoreCategory: function() {
		return this.fsPetStoreCategory;
	},
	
	/* ***** */

	/**
	 *
	 */
	fsVeterinarianCategory: "",

	/**
	 *
	 * @param _fsVeterinarianCategory
	 */
	setFsVeterinarianCategory: function(_fsVeterinarianCategory) {
		this.fsVeterinarianCategory = _fsVeterinarianCategory;
	},

	/**
	 *
	 * @returns {string}
	 */
	getFsVeterinarianCategory: function() {
		return this.fsVeterinarianCategory;
	},
	
	/* ***** */

	/**
	 *
	 */
	initLangFeature: function() {
		// Get the preferred language from the local storage.
		var preferredLanguage = app.getPrefLang();

		if (preferredLanguage) {
			app.setup_i18n(preferredLanguage);
		} else {
			if (navigator.globalization !== undefined) {
				/**
				 * Returns the BCP-47 compliant language identifier tag to the successCallback with a properties object as a parameter.
				 * That object should have a value property with a String value.
				 * If there is an error getting the language, then the errorCallback executes with a GlobalizationError object as a parameter.
				 * The error's expected code is GlobalizationError.UNKNOWN_ERROR.
				 */
				navigator.globalization.getPrefLang(app.globalizationGetPreferredLangSuccess, app.globalizationGetPreferredLangError);
			} else {
				app.showAlert("navigator.globalization is undefined", null, "Alert", "ok");
			}
		}
	},

	/**
	 *
	 * @param language
	 */
	globalizationGetPreferredLangSuccess: function(language) {
		if (language) {
			var languageValue = language.value;
			//app.showAlert("languageValue" + " = " + languageValue, null, "languageValue", "ok");

			/**
			 * If there's a bcp_47 handler.
			 */
			if (app.bcp_47) {
				var parseResult = app.bcp_47.parse(languageValue);
				//app.showAlert(parseResult, null, "parseResult", "ok");

				var languageCode = parseResult.langtag.language.language;
				//app.showAlert(languageCode, null, "languageCode", "ok");

				if (languageCode) {
					app.setup_i18n(languageCode);
				} else {
					app.setup_i18n(app.LANGUAGE_ENGLISH_CODE);
				}
			} else {
				// @todo
			}
		} else {
			app.setup_i18n(app.LANGUAGE_ENGLISH_CODE);
		}
	},

	/**
	 *
	 */
	globalizationGetPreferredLangError: function() {
		app.setup_i18n(app.LANGUAGE_ENGLISH_CODE);
	},
	
	/**
	 * Function that starts the i18n feature with the given language.
	 */
	setup_i18n: function(language) {
		if (null == language) {
			language = app.LANGUAGE_ENGLISH_CODE;
		}

		app.setPrefLang(language);

		var options = {lng: language, resGetPath: "locales/__lng__/__ns__.json"};

		i18n.init(options, app.callback_i18n);
	},

	/**
	 *
	 * @param err
	 * @param t
	 */
	callback_i18n: function(err, t) {
		// i18n the welcome view.
		$("#welcome").i18n();

		// i18n the settings view.
		$("#settings").i18n();

		// i18n the result list view.
		$("#result-list").i18n();

		// Save the text object for later usage.
		app.setTextObject(t);

		//var appName = t("app.name");

		/* ***** */

		if (app.appJustLoaded) {
			app.appJustLoaded = 0;

			app.initializeViews(
				function() {
					// Go to the main view.
					app.changeView("welcome", 4000, app.welcomeCallback);
				}
			)
		}
	},
	
	/* ***** */

	/**
	 *
	 * @param callback
	 */
	initializeViews: function(callback) {
		// Init the settings view.
		app.settings.initSettingsView();

		// Init the result list view.
		app.resultList.initResultListView();

		// If a callback function was provided, call it.
		if (callback) {
			callback();
		}
	},

	/* ***** */

	/**
	 *
	 */
	textObject: "",

	/**
	 *
	 * @param _textObject
	 */
	setTextObject: function(_textObject) {
		this.textObject = _textObject;
	},

	/**
	 *
	 * @returns {string}
	 */
	getTextObject: function() {
		return this.textObject;
	},
	
	/* ***** */

	/**
	 *
	 * @param viewName
	 * @param timeout
	 * @param callbackFn
	 */
	changeView: function(viewName, timeout, callbackFn) {
		if (null == timeout) {
			timeout = 0;
		}

		if (null != viewName) {
			// Check if the view exists.
			
			if ($("#" + viewName).length) {
				setTimeout(
					function() {
						$(".active").fadeOut();
						$(".active").removeClass("active");

						$("#" + viewName).fadeIn();
						$("#" + viewName).addClass("active");

						if (null != callbackFn) {
							callbackFn(viewName);
						}
					},
					timeout
				);
			} else {
				// @todo
			}
		} else {
			// @todo
		}
	},
	
	/* ***** */

	/**
	 *
	 * @param numberOfBeeps
	 */
	playBeep: function(numberOfBeeps) {
		if (null != numberOfBeeps) {
			if (numberOfBeeps > 0) {
				navigator.notification.beep(numberOfBeeps);
			} else {
				// @todo
			}
		} else {
			// @todo
		}
	},

	/**
	 *
	 * @param message
	 * @param callbackFunction
	 * @param title
	 * @param buttonLabel
	 */
	showAlert: function(message, callbackFunction, title, buttonLabel) {
		navigator.notification.alert(message, callbackFunction, title, buttonLabel);
	},

	/**
	 *
	 * @param time
	 */
	vibrate: function(time) {
		if (null != time) {
			if (time > 0) {
				navigator.notification.vibrate(time);
			} else {
				// @todo
			}
		} else {
			// @todo
		}
	},
	
	/* ***** */

	/**
	 * Method that allows to find a veterinarian venue.
	 */
	findVeterinarian: function() {
		var venueCategory = this.getFsVeterinarianCategory();
		
		this.findVenue(venueCategory);
	},

	/**
	 * Method that allows to find a pet service venue.
	 */
	findPetService: function() {
		var venueCategory = this.getFsPetServiceCategory();
		
		this.findVenue(venueCategory);
	},

	/**
	 * Method that allows to find a pet store venue.
	 */
	findPetStore: function() {
		var venueCategory = this.getFsPetStoreCategory();
		
		this.findVenue(venueCategory);
	},

	/**
	 *
	 * @param venueCategory
	 */
	findVenue: function(venueCategory) {
		//app.showAlert("venueCategory" +  " = " + venueCategory, null, "info", "ok");

		if (null == venueCategory) {
			// @todo
		} else {
			if (navigator.onLine) {
				/**
				 * Config param that stores the api base path.
				 * @type {*|string}
				 */
				var apiBasePath = app.getApiBasePath();
				//app.showAlert("apiBasePath" +  " = " + apiBasePath, null, "info", "ok");

				if (null == apiBasePath) {
					// @todo
				} else {
					// Get the current location.

					if (navigator.geolocation) {
						var geolocationOptions = {};

						navigator.geolocation.getCurrentPosition(
							/**
							 * successCallback function.
							 * @param currentPosition
							 */
							function(currentPosition) {
								/**
								 * Current latitude.
								 * @type {Number}
								 */
								var lat = currentPosition.coords.latitude;
								//app.showAlert("lat" +  " = " + lat, null, "info", "ok");

								/**
								 * Current longitude.
								 * @type {Number}
								 */
								var lng = currentPosition.coords.longitude;
								//app.showAlert("lng" +  " = " + lng, null, "info", "ok");

								/**
								 * Unit used to search for the venues.
								 */
								var unit = app.getPreferredUnit();
								//app.showAlert("unit" +  " = " + unit, null, "info", "ok");

								/**
								 * Radius where the venues of the given category will be searched.
								 */
								var distance = app.getPreferredSearchRadius();
								//app.showAlert("distance" +  " = " + distance, null, "info", "ok");

								var requestURL = "";
								requestURL += apiBasePath;
								requestURL += "v1/venues/";
								requestURL += venueCategory;
								requestURL += "/params/";
								requestURL += "lat" + "=" + lat;
								requestURL += "&";
								requestURL += "lng" + "=" + lng;
								requestURL += "&";
								requestURL += "unit" + "=" + unit;
								requestURL += "&";
								requestURL += "distance" + "=" + distance;

								//app.showAlert("requestURL" +  " = " + requestURL, null, "info", "ok");

								$.ajax({
									dataType: "json",
									type: "GET",
									url: requestURL,
									success: function(data) {
										if (data.length == 0) {
											app.showAlert("No data found", null, "info", "ok");
										} else {
											app.resultList.goToResultList(data);
										}
									}
								});
							},
							/**
							 * errorCallback function.
							 */
							function() {

							},
							/**
							 * options.
							 */
							geolocationOptions
						);
					} else {
						// @todo
					}
				}
			} else {
				// Get the text object.
				var t = app.getTextObject();

				// Get the title.
				var title = t("app-messages.no-network-connection-msg-title");

				// Get the message.
				var message = t("app-messages.no-network-connection-msg-txt");

				// Get the button label.
				var btn = t("app-messages.no-network-connection-msg-btn");

				// Show the alert.
				app.showAlert(message, null, title, btn);
			}
		}
	},
	
	/* ***** */

	/**
	 *
	 */
	goBackButtonHandler: function() {
		app.showAlert("goBackButtonHandler", null, "info", "ok");
	},

	/* ***** */

	/*getScreenWidth: function() {
		return screen.width;
	},*/

	/*getScreenHeight: function() {
		return screen.height;
	},*/
	
	/* ***** */

	/**
	 *
	 */
	KILOMETER_SEARCH_UNIT: "Kilometers",

	/**
	 *
	 */
	MILE_SEARCH_UNIT: "Miles",

	/**
	 *
	 * @param preferredUnit
	 */
	setPreferredUnit: function(preferredUnit) {
		localStorage.setItem("vet_dir_setting_preferred_unit", preferredUnit);
	},

	/**
	 *
	 */
	getPreferredUnit: function() {
		return localStorage.getItem("vet_dir_setting_preferred_unit");
	},

	/**
	 *
	 */
	DEFAULT_SEARCH_RADIUS: 2,

	/**
	 *
	 * @param preferredSearchRadius
	 */
	setPreferredSearchRadius: function(preferredSearchRadius) {
		localStorage.setItem("vet_dir_setting_preferred_search_radius", preferredSearchRadius);
	},

	/**
	 *
	 */
	getPreferredSearchRadius: function() {
		return localStorage.getItem("vet_dir_setting_preferred_search_radius");
	},

	/* ***** */

	/**
	 *
	 */
	LANGUAGE_ENGLISH_CODE: "en",

	/**
	 *
	 */
	LANGUAGE_SPANISH_CODE: "es",

	/**
	 *
	 * @param preferredLanguage
	 */
	setPrefLang: function(preferredLanguage) {
		localStorage.setItem("vet_dir_setting_preferred_language", preferredLanguage);
	},

	/**
	 *
	 */
	getPrefLang: function() {
		return localStorage.getItem("vet_dir_setting_preferred_language");
	},

	/* ***** */

	/**
	 *
	 * @param callback
	 */
	defaultVariables: function(callback) {
		var preferredUnit = app.getPreferredUnit();

		if (null == preferredUnit) {
			app.setPreferredUnit(app.KILOMETER_SEARCH_UNIT);
		}

		/* ***** */

		var preferredSearchRadius = app.getPreferredSearchRadius();

		if (null == preferredSearchRadius) {
			app.setPreferredSearchRadius(app.DEFAULT_SEARCH_RADIUS);
		}

		/* ***** */

		var preferredLanguage = app.getPrefLang();
		//app.showAlert("preferredLanguage" + " = " + preferredLanguage, null, "Alert", "ok");

		if (null == preferredLanguage) {
			// Geolocate based on the current lat and lon

			if (app.google_geocode) {
				navigator.geolocation.getCurrentPosition(
					function(position) {
						var lat = position.coords.latitude;

						var lng = position.coords.longitude;

						var result = app.google_geocode.geocodeLatLon(lat, lng);

						var jsonResult = JSON.parse(result);

						var resultsBlock = jsonResult.results;

						var country = null;

						for(var i in resultsBlock) {
							var currentResult = resultsBlock[i];

							var formattedAddress = currentResult.formatted_address;

							var types = currentResult.types;

							for (var j in types) {
								var currentType = types[j];

								if (currentType == "country") {
									//app.showAlert("formattedAddress" + " = " + formattedAddress, null, "result", "ok");

									country = formattedAddress;

									break;
								}
							}

							if (country) {
								break;
							}
						}

						if (country) {
							if (app.lang_per_country) {
								preferredLanguage = app.lang_per_country.getLanguagePerCountry(country);

								if (!preferredLanguage) {
									// If no preferred language was found, then use english as default.
									preferredLanguage = app.LANGUAGE_ENGLISH_CODE;
								}
							} else {
								// @todo
							}
						} else {
							// If no country was found, then use english as default.
							preferredLanguage = app.LANGUAGE_ENGLISH_CODE;
						}

						/* ***** */

						app.setPrefLang(preferredLanguage);

						/* ***** */

						if (callback) {
							callback();
						}
					},
					function(error) {
						var errorCode = error.code;
						var errorMessage = error.message;

						var message = "Error code: " + errorCode + ", Error message: " + errorMessage;

						app.showAlert(message, null, "Error", "ok");

						/* ***** */

						preferredLanguage = app.LANGUAGE_ENGLISH_CODE;
						app.setPrefLang(preferredLanguage);

						/* ***** */

						if (callback) {
							callback();
						}
					}
				);
			} else {
				// @todo
			}
		} else {
			preferredLanguage = app.LANGUAGE_ENGLISH_CODE;
			app.setPrefLang(preferredLanguage);

			/* ***** */

			if (callback) {
				callback();
			}
		}
	},

	/* ***** */

	/**
	 *
	 * @param viewName
	 */
	fixViewHeader: function(viewName) {
		if (null != viewName) {
			// The slide stuff for the welcome view happens here.

			// Check the data-view-fixed attribute - http://www.w3schools.com/tags/att_global_data.asp
			var viewFixed = app.viewHasBeenFixed(viewName);
			//app.showAlert("viewFixed" + " = " + viewFixed, null, "Alert", "ok");

			if (viewFixed) {
				//app.showAlert("View header already fixed", null, "Alert", "ok");

				return;
			}

			// Get the title container.
			var topBar = $("#" + viewName + " " + ".top-bar");

			// Get the title container height.
			var topBarHeight = $(topBar).height();

			var cssHeight = "calc(100% - " + topBarHeight + "px)";

			$("#" + viewName + " " + "#" + viewName + "__nav").css("height", cssHeight);

			$("#" + viewName + " " + "#" + viewName + "__nav").css("overflow-y", "scroll");

			$("#" + viewName + " " + "#" + viewName + "__nav").css("-webkit-overflow-scrolling", "touch");

			// Fix the icons containers to have their height equal to the title.
			$("#" + viewName + " " + ".icon-beside-title").css("height", topBarHeight + "px");

			app.setViewAsFixed(viewName);
		} else {
			// @todo
		}
	}

	/* ***** */
};
