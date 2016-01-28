//app.showAlert("This is the message", null, "Alert title", "Button label");
//app.playBeep(2);
//app.vibrate(1000);

/* ***** */

//var deviceCordova = device.cordova;
//app.showAlert("deviceCordova" +  " = " + deviceCordova, null, "Alert title", "Button label");

//var devicePlatform = device.platform;
//app.showAlert("devicePlatform" +  " = " + devicePlatform, null, "Alert title", "Button label");

//var deviceUUID = device.uuid;
//app.showAlert("deviceUUID" +  " = " + deviceUUID, null, "Alert title", "Button label");

//var deviceVersion = device.version;
//app.showAlert("deviceVersion" +  " = " + deviceVersion, null, "Alert title", "Button label");

//var deviceModel = device.model;
//app.showAlert("deviceModel" +  " = " + deviceModel, null, "Alert title", "Button label");

//var screenW = app.getScreenWidth();
//app.showAlert("screenW" +  " = " + screenW, null, "Alert title", "Button label");

//var screenH = app.getScreenHeight();
//app.showAlert("screenH" +  " = " + screenH, null, "Alert title", "Button label");

// @todo: Set a loop that gets the coordinates every x seconds.
navigator.geolocation.getCurrentPosition(app.geolocateSuccess, app.geolocateError);

geolocateSuccess: function(position) {
	var lat = position.coords.latitude;
	//app.showAlert("lat" +  " = " + lat, null, "info", "ok");

	var lng = position.coords.longitude;
	//app.showAlert("lng" +  " = " + lng, null, "info", "ok");

	var alt = position.coords.altitude;
	//app.showAlert("alt" +  " = " + alt, null, "info", "ok");

	var acc = position.coords.accuracy;
	//app.showAlert("acc" +  " = " + acc, null, "info", "ok");

	var altAcc = position.coords.altitudeAccuracy;
	//app.showAlert("altAcc" +  " = " + altAcc, null, "info", "ok");

	var heading = position.coords.heading;
	//app.showAlert("heading" +  " = " + heading, null, "info", "ok");

	var speed = position.coords.speed;
	//app.showAlert("speed" +  " = " + speed, null, "info", "ok");

	var timestamp = position.timestamp;
	//app.showAlert("timestamp" +  " = " + timestamp, null, "info", "ok");
}

geolocateError: function(error) {
	var errorCode = error.code;
	var errorMessage = error.message;

	var message = "Error code: " + errorCode + ", Error message: " + errorMessage;

	app.showAlert(message, null, "Error", "ok");
}
