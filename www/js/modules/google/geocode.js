/**
 *
 * @type {{api_key: null, $: null, geocodeLatLon: Function}}
 */
var google_geocode = {
    /**
     *
     */
    api_key: null,

    /**
     *
     */
    $: null,

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

            if (this.$) {
                return $.ajax({type: "GET", url: url, async: false}).responseText;
            } else {
                // @todo
            }
        } else {
            // @todo
        }
    }
};
