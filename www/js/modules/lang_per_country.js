/**
 *
 * @type {{SPANISH_LANGUAGE_CODE: string, COUNTRY_NAME_COLOMBIA: string, getLanguagePerCountry: Function}}
 */
lang_per_country = {
    /**
     *
     */
    SPANISH_LANGUAGE_CODE: "es",

    /**
     *
     */
    COUNTRY_NAME_COLOMBIA: "Colombia",

    /**
     *
     * @param countryName
     * @returns {*}
     */
    getLanguagePerCountry: function(countryName) {
        var language;

        if (countryName) {
            if (countryName == this.COUNTRY_NAME_COLOMBIA) {
                language = this.SPANISH_LANGUAGE_CODE;
            }
        }

        return language;
    }
};
