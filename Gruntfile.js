module.exports = function (grunt) {
    var target = 'clients/web/static/built/plugins/cornerstone_demo/plugin.min.js';
    var jsFiles = grunt.config.get('uglify.plugin_cornerstone_demo.files');

    jsFiles[target] = [
        'plugins/cornerstone_demo/bower_components/dicomParser/dist/dicomParser.js',
        'plugins/cornerstone_demo/bower_components/cornerstone/dist/cornerstone.js',
        'plugins/cornerstone_demo/bower_components/cornerstoneMath/dist/cornerstoneMath.js',
        'plugins/cornerstone_demo/bower_components/cornerstoneTools/dist/cornerstoneTools.js'
    ].concat(jsFiles[target]);
    grunt.config.set('uglify.plugin_cornerstone_demo.files', jsFiles);
};
