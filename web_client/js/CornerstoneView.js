(function () {
    girder.views.cornerstone_demo_CornerstoneView = girder.View.extend({
        initialize: function (settings) {
            this.files = settings.files;
            this.item = settings.item;
        },

        render: function () {
            this.$el.html(girder.templates.cornerstone_demo_viewer());
            this._initCornerstone();
        },

        _initCornerstone: function () {
            
        }
    });

})();
