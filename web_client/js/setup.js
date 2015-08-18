girder.wrap(girder.views.ItemView, 'initialize', function (initialize, settings) {
    initialize.call(this, settings);
    this.on('g:rendered', function () {
        var meta = this.model.get('meta') || {};
        var fileColl = this.fileListWidget.collection;

        var initCornerstoneView = _.bind(function () {
            var el = $('<div>', {
                class: 'g-cornerstone-demo-container'
            }).prependTo(this.$('.g-item-info'));

            new girder.views.cornerstone_demo_CornerstoneView({
                parentView: this,
                item: this.model,
                files: this.fileListWidget.collection,
                el: el
            }).render();
        }, this);

        var fetchNextFileListPage = _.bind(function () {
            fileColl.pageLimit += 100; // Increase page window each time.
            fileColl.once('g:changed', function () {
                if (fileColl.hasNextPage()) {
                    fetchNextFileListPage();
                } else {
                    initCornerstoneView();
                }
            }).fetchNextPage();
        }, this);

        if (_.has(meta, 'Cornerstone')) {
            if (fileColl.hasNextPage()) {
                fileColl.append = true; // Only works in append mode.
                fetchNextFileListPage();
            } else {
                initCornerstoneView();
            }
        }
    }, this);
});
