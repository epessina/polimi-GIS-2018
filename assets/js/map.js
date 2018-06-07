/* Add basemap */
var OSM = new ol.layer.Tile({
    title: 'OpenStreetMap',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
});
/*
var bingRoads = new ol.layer.Tile({
    title: 'Bing Maps - Roads',
    type: 'base',
    visible: false,
    source: new ol.source.BingMaps({
        key: 'AgyifPDfXg47i2reCsF1jUuyudaxgUWbN93sYLchBznYvbX8snt9RJZBx2BmmPZq',
        imagerySet: 'Road'
    })
});

var bingAerial = new ol.layer.Tile({
    title: 'Bing Maps - Aerial',
    type: 'base',
    visible: false,
    source: new ol.source.BingMaps({
        key: 'AgyifPDfXg47i2reCsF1jUuyudaxgUWbN93sYLchBznYvbX8snt9RJZBx2BmmPZq',
        imagerySet: 'Aerial'
    })
});

var bingAerialWithLabels = new ol.layer.Tile({
    title: 'Bing Maps - Aerial with Labels',
    type: 'base',
    visible: false,
    source: new ol.source.BingMaps({
        key: 'AgyifPDfXg47i2reCsF1jUuyudaxgUWbN93sYLchBznYvbX8snt9RJZBx2BmmPZq',
        imagerySet: 'AerialWithLabels'
    })
});


var stamenWatercolor = new ol.layer.Tile({
    title: 'Stamen Watercolor',
    type: 'base',
    visible: false,
    source: new ol.source.Stamen({
        layer: 'watercolor'
    })
});
var stamenToner = new ol.layer.Tile({
    title: 'Stamen Toner',
    type: 'base',
    visible: false,
    source: new ol.source.Stamen({
        layer: 'toner'
    })
});
*/
/*
var geojsonFormat = new ol.format.GeoJSON();

function loadFeatures(response) {
    vectorSource.addFeatures(geojsonFormat.readFeatures(response));
}

var ECU_rails = new ol.layer.Vector({
    title: 'Ecuador railways',
    source: vectorSource,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(58, 255, 81)',
            width: 4
        })
    })
});
*/
 /* Add map */
var map = new ol.Map({
    target: document.getElementById('map'),
    layers: [
        new ol.layer.Group({
            title: 'Basemaps',
            layers: [OSM]
        })/*,
          new ol.layer.Group({
            title: 'Overlay Layers',
            layers: []
        })*/
    ],
    view: new ol.View({center: ol.proj.fromLonLat([9.87, 46.17]),
        zoom: 16}),
    controls: ol.control.defaults().extend([
        new ol.control.ScaleLine(),
        new ol.control.FullScreen(),
        new ol.control.OverviewMap(),
        new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326'
        })
    ])
});

/* Add comand*/
var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);

var elementPopup = document.getElementById('popup');

var popup = new ol.Overlay({
    element: elementPopup
});
map.addOverlay(popup);
/*
map.on('click', function(event) {
    var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
        return feature;
    });
    if (feature != null) {
        var pixel = event.pixel;
        var coord = map.getCoordinateFromPixel(pixel);
        popup.setPosition(coord);
        $(elementPopup).attr('title', 'Ecuador railways');
        $(elementPopup).attr('data-content', '<b>Id: </b>' + feature.get('FID_rail_d') +
            '</br><b>Description: </b>' + feature.get('F_CODE_DES'));
        $(elementPopup).popover({'placement': 'top', 'html': true});
        $(elementPopup).popover('show');
    }
});
*/

map.on('pointermove', function(e) {
    if (e.dragging) {
        $(elementPopup).popover('destroy');
        return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});


map.on('click', function(event) {
    document.getElementById('get-feature-info').innerHTML = '';
    var viewResolution = (map.getView().getResolution());
    var url = ECU_roads.getSource().getGetFeatureInfoUrl(event.coordinate,
        viewResolution, 'EPSG:3857', {'INFO_FORMAT': 'text/html'});
    if (url)
        document.getElementById('get-feature-info').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
});