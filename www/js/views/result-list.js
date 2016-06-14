var resultList = {
    /**
     *
     */
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
     * @param index
     * @param entityId
     * @param name
     * @param distance
     * @returns {string}
     */
    getHTML_Block: function(index, entityId, name, distance) {
        var html = "";

        if (resultList.app.getPreferredUnit() == resultList.app.KILOMETER_SEARCH_UNIT) {
            resultList.app.showAlert("Km", null, "info", "ok");
        }

        if (resultList.app.getPreferredUnit() == resultList.app.MILE_SEARCH_UNIT) {
            resultList.app.showAlert("Mi", null, "info", "ok");
        }

        return html;
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

            // entityId
            // name
            // contactPhone
            // locationAddress
            // lat
            // lng

            var detail = currentVenue.detail;

            var entityId = detail["entityId"];
            var name = detail["name"];

            var html = resultList.getHTML_Block(i, entityId, name, distance);

            $("#result-list__nav").append(html);
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
