girder.wrap(girder.views.ItemView, 'initialize', function (initialize, settings) {
    initialize.call(this, settings);
    this.on('g:rendered', function () {
        var meta = this.model.get('meta') || {};

        if (_.has(meta, 'Cornerstone')) {
            var el = $('<div>', {
                class: 'g-cornerstone-demo-container'
            }).prependTo(this.$('.g-item-info'));

            new girder.views.cornerstone_demo_CornerstoneView({
                parentView: this,
                item: this.model,
                files: this.fileListWidget.collection,
                el: el
            }).render();
        }
    }, this);
});
