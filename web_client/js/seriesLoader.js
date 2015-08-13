// http://www.henryalgus.com/reading-binary-files-using-jquery-ajax/
$.ajaxTransport('+binary', function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {
        return {
            // create new XMLHttpRequest
            send: function (headers, callback) {
                // setup all variables
                var xhr = new XMLHttpRequest(),
                    url = options.url,
                    type = options.type,
                    async = options.async || true,
                    // blob or arraybuffer. Default is blob
                    dataType = options.responseType || 'blob',
                    data = options.data || null,
                    username = options.username || null,
                    password = options.password || null;

                xhr.addEventListener('load', function () {
                    var data = {};
                    data[options.dataType] = xhr.response;
                    // make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                // setup custom headers
                for (var i in headers ) {
                    xhr.setRequestHeader(i, headers[i] );
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});



    function createImageObject(dataSet, imageId, frame)
    {
        if(frame === undefined) {
            frame = 0;
        }

        var isColor = _.contains([
            'RGB',
            'PALETTE COLOR',
            'YBR_FULL',
            'YBR_FULL_422',
            'YBR_PARTIAL_422',
            'YBR_PARTIAL_420',
            'YBR_RCT'
        ],  dcm.string('x00280004'));

        return isColor;
        if(isColor === false) {
            return cornerstoneWADOImageLoader.makeGrayscaleImage(imageId, dataSet, dataSet.byteArray, photometricInterpretation, frame);
        } else {
            return cornerstoneWADOImageLoader.makeColorImage(imageId, dataSet, dataSet.byteArray, photometricInterpretation, frame);
        }
    }

var myHandler = function (imageId) {
    var promise = $.Deferred();

    girder.restRequest({
        path: 'file/' + imageId + '/download',
        dataType: 'binary',
        responseType: 'arraybuffer',
        processData: false
    }).done(function (resp) {
        // TODO convert response into Image
        var dcm = dicomParser.parseDicom(new Uint8Array(resp));
        console.log(createImageObject(dcm));
        promise.resolve(image);
    }).error(function (resp) {
        promise.reject(resp);
    });

    return promise;
};

cornerstone.registerImageLoader('girderDicom', myHandler);
