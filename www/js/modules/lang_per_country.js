var lang_per_country = {
    /**
     *
     */
    ENGLISH_LANGUAGE_CODE: "en",

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
z