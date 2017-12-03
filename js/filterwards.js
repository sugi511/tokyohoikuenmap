window.FilterWard = function() {
};

/**
 * 区役所geojsonファイルを読み込み、filterWards配列に格納する
 * @return {[type]} [description]
 */
FilterWard.prototype.loadWardJson = function()
{
    var defd = new $.Deferred();
    // 区役所JSONデータ読み込み〜セレクトボックス追加
    $.getJSON(
        "data/cityhall.geojson",
        function(data){
            for(var i=0; i<data.features.length; i++) {
                _name = data.features[i].properties.name.replace(/役所/, "");
                _lat  = data.features[i].properties.lat;
                _lon  = data.features[i].properties.lon;
                filterWards.push(
                    {name: _name, lat: _lat, lon: _lon}
                    );
            }
            defd.resolve();
        }).fail(function(){
            console.log('cityhall data load failed.');
            defd.reject('load error.');
        });
    return defd.promise();

};

/**
 * 区役所セレクトボックスに要素を追加する
 * @param  array moveToList [description]
 * @return {[type]}            [description]
 */
FilterWard.prototype.appendToFilterWard = function(filterWards)
{
    nesting = [];
    for(i=0; i < filterWards.length; i++) {
        //$('#filterWards').append(nesting);
        nesting.push($('<option>').html(filterWards[i].name).val(i));
    }
    if(nesting !== "") {
        $('#filterWards').append(nesting);
    }
};
