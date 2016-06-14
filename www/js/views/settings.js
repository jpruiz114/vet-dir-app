var settings = {
    app: null,

    /**
     *
     */
    initSettingsView: function() {
        $("#settings-back-link").click(
            function() {
                settings.app.changeView("welcome", 0, null);
            }
        );

        /* ***** */

        // Set the kilometer search unit.
        $("#set-pre-sea-uni-kil").val(settings.app.KILOMETER_SEARCH_UNIT);

        // Set the mile search unit.
        $("#set-pre-sea-uni-mil").val(settings.app.MILE_SEARCH_UNIT);

        /* ***** */

        // Set the english language.
        $("#set-pre-lan-eng").val(settings.app.LANGUAGE_ENGLISH_CODE);

        // Set the spanish language.
        $("#set-pre-lan-spa").val(settings.app.LANGUAGE_SPANISH_CODE);
    },

    /**
     * Function that goes to the settings view.
     */
    goToSettings: function() {
        settings.app.changeView("settings", 0, settings.goToSettingsCallback);
    },

    /**
     *
     * @param viewName
     */
    goToSettingsCallback: function(viewName) {
        if (null != viewName) {
            // Fix the view header.
            settings.app.fixViewHeader(viewName);

            /* ***** */

            // Load the preferred search radius.
            var preferredSearchRadius = settings.app.getPreferredSearchRadius();

            // Set the preferred search radius.
            $("#settings-pre-sea-rad").val(preferredSearchRadius);

            /* ***** */

            // Load the preferred unit.
            var preferredUnit = settings.app.getPreferredUnit();

            // Set the preferred unit.
            $("#settings-pre-sea-uni").val(preferredUnit);

            /* ***** */

            // Load the preferred language.
            var preferredLanguage = settings.app.getPrefLang();

            // Set the preferred language.
            $("#settings-pre-lan").val(preferredLanguage);
        } else {
            // @todo
        }
    }
};
