/**
 *
 * @type {{api_key: null, geocodeLatLon: Function}}
 */
var google_geocode = {
    /**
     *
     */
    api_key: null,

    /**
     *
     * @param lat
     * @param lon
     */
    geocodeLatLon: function(lat, lon) {
        if (this.api_key) {
            var url = "";
            url += "https://maps.googleapis.com/maps/api/geocode/json";
            url += "?";
            url += "latlng" + "=" + lat + "," + lon;
            url += "&";
            url += "key" + "=" + this.api_key;

            var request = new XMLHttpRequest();

            request.open("GET", url, true);

            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    if(request.status == 200) {
                        var result = JSON.parse(request.responseText);

                        return result;
                    }
                }
            };

            request.send(null);
        }
    }
};