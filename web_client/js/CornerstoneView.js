girder.views.cornerstone_demo_CornerstoneView = girder.View.extend({
    initialize: function (settings) {
        this.files = settings.files;
        this.item = settings.item;
        this.imageIds = _.map(this.files.models, function (file) {
            // HACK see https://github.com/chafey/cornerstoneWADOImageLoader/issues/16
            return 'dicomweb://' + window.location.host + file.downloadUrl();
        });
    },

    render: function () {
        this.$el.html(girder.templates.cornerstone_demo_viewer());
        this._initCornerstone();
    },

    _initCornerstone: function () {
        var renderer = this.$('.g-render-target')[0];
        cornerstone.enable(renderer);
        cornerstoneTools.mouseInput.enable(renderer);
        cornerstoneTools.mouseWheelInput.enable(renderer);

        cornerstone.loadAndCacheImage(this.imageIds[0]).then(function (image) {
            cornerstone.displayImage(renderer, image);
            cornerstoneTools.wwwc.activate(renderer, 1);
            cornerstoneTools.stackScroll.activate(renderer, 1);
            cornerstoneTools.stackScrollWheel.activate(renderer);
        });
    }
});
