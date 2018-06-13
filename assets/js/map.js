// Add basemap
var OSM = new ol.layer.Tile({
    title: 'OpenStreetMap',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
});

var bingRoads = new ol.layer.Tile({
    title: 'Bing Maps - Roads',
    type: 'base',
    visible: false,
    source: new ol.source.BingMaps({
        key: 'AgyifPDfXg47i2reCsF1jUuyudaxgUWbN93sYLchBznYvbX8snt9RJZBx2BmmPZq',
        imagerySet: 'Road'
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

var stamenToner = new ol.layer.Tile({
    title: 'Stamen Toner',
    type: 'base',
    visible: false,
    source: new ol.source.Stamen({
        layer: 'toner'
    })
});

// Add map
var map = new ol.Map({
    target: document.getElementById('map'),
    // interactions: ol.interaction.defaults({mouseWheelZoom: false}).extend([i]),
    layers: [
        new ol.layer.Group({
            title: 'Basemaps',
            layers: [OSM, stamenToner, bingAerialWithLabels, bingRoads]
        })/*,
          new ol.layer.Group({
            title: 'Overlay Layers',
            layers: []
        })*/
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([9.87, 46.17]),
        zoom: 16
    }),
    controls: ol.control.defaults().extend([
        new ol.control.ScaleLine(),
        new ol.control.FullScreen()/*,
        new ol.control.OverviewMap(),
        new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326'
        })*/
    ])
});

// Additional comand
// Button for change the layer
var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);
/*
var elementPopup = document.getElementById('popup');

var popup = new ol.Overlay({
    element: elementPopup
});
map.addOverlay(popup);
*/
/*
// Extra

// Other basemap

var stamenWatercolor = new ol.layer.Tile({
    title: 'Stamen Watercolor',
    type: 'base',
    visible: false,
    source: new ol.source.Stamen({
        layer: 'watercolor'
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

// Example for add vector as GeoJSON
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




// Extra function

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

// Remove info after moving
map.on('pointermove', function (e) {
    if (e.dragging) {
        $(elementPopup).popover('destroy');
        return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

// Show coordinate of mouse position
map.on('click', function (event) {
    document.getElementById('get-feature-info').innerHTML = '';
    var viewResolution = (map.getView().getResolution());
    var url = ECU_roads.getSource().getGetFeatureInfoUrl(event.coordinate,
        viewResolution, 'EPSG:3857', {'INFO_FORMAT': 'text/html'});
    if (url)
        document.getElementById('get-feature-info').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
});


// Scrolling comand block scrolling with mouse, possible to scroll only pushing the alt command
var i = new ol.interaction.MouseWheelZoom();
var oldFn = i.handleEvent;
i.handleEvent = function(e) {
    var type = e.type;
    if (type !== "wheel" && type !== "wheel" ) {
        return true;
    }

    if (!e.originalEvent.altKey) {
        return true;
    }

    oldFn.call(this,e);
};

*/
