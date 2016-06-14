var resultList = {
    app: null,

    /**
     *
     */
    initResultListView: function() {
        $("#result-list__back-link").click(
            function() {
                app.changeView("welcome", 0, null);
            }
        );
    },

    /**
     *
     * @param data
     */
    goToResultList: function(data) {
        $("#result-list__nav").empty();

        for (var i in data) {
            var currentVenue = data[i];

            var distance = currentVenue.distance;

            var detail = currentVenue.detail;

            // entityId
            // name
            // contactPhone
            // locationAddress
            // lat
            // lng


        }

        app.changeView("result-list", 0, resultList.goToResultListCallback);
    },

    /**
     *
     * @param viewName
     */
    goToResultListCallback: function(viewName) {
        if (null != viewName) {
            // Fix the view header.
            app.fixViewHeader(viewName);


        } else {
            // @todo
        }
    }
};
