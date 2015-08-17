girder.views.cornerstone_demo_CornerstoneView = girder.View.extend({
    events: {
        'contextmenu .g-render-target': '_ignore',
        'mousedown .g-render-target': '_ignore',
        'selectstart .g-render-target': '_ignore',
        'mousewheel .g-render-target': '_ignore',
        'input .g-slice-slider': function (e) {
            this.changeSlice(window.parseInt(e.target.value, 10));
        }
    },

    _ignore: function () {
        return false;
    },

    initialize: function (settings) {
        this.files = settings.files;
        this.item = settings.item;
        this.imageIds = _.map(this.files.models, function (file) {
            return 'dicomweb:' + file.downloadUrl();
        });
    },

    render: function () {
        this.$el.html(girder.templates.cornerstone_demo_viewer());
        this._initCornerstone();
    },

    _initCornerstone: function () {
        var renderer = this.$('.g-render-target')[0];
        var range = this.$('.g-slice-slider')[0];

        range.min = range.value = 0;
        range.step = 1;
        range.max = this.imageIds.length - 1;

        this.stack = {
            currentImageIdIndex: 0,
            imageIds: this.imageIds
        };

        cornerstone.enable(renderer);

        cornerstone.loadAndCacheImage(this.imageIds[0]).then(_.bind(function (image) {
            cornerstoneTools.mouseInput.enable(renderer);
            cornerstoneTools.mouseWheelInput.enable(renderer);
            cornerstone.displayImage(renderer, image);
            cornerstoneTools.wwwc.activate(renderer, 4); // right click for window/level
            cornerstoneTools.addToolState(renderer, 'stack', this.stack);
            cornerstoneTools.stackPrefetch.enable(renderer);
            cornerstoneTools.stackScroll.activate(renderer, 1);
            cornerstoneTools.stackScrollWheel.activate(renderer);
        }, this));
    },

    changeSlice: function (index) {
        var renderer = this.$('.g-render-target')[0];

        if (this.stack.currentImageIdIndex !== index) {
            cornerstone.loadAndCacheImage(this.stack.imageIds[index]).then(_.bind(function (image) {
                this.stack.currentImageIdIndex = index;
                cornerstone.displayImage(renderer, image);
                cornerstoneTools.addToolState(renderer, 'stack', this.stack);
            }, this));
        }
    }
});
