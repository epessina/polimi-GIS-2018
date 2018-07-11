// Add layers

var vectorSource = new ol.source.Vector({
    loader: function (extent, resolution, projection) {
        var url = 'http://ows3.como.polimi.it:8080/geoserver/user01_18/ows?service=WFS' +
            '&version=1.0.0&request=GetFeature&typeName=user01_18:CENED_2.0_sondrio&' +
            'outputFormat=text/javascript&srsname=EPSG:4326&format_options=callback:loadFeatures';
        $.ajax({url: url, dataType: 'jsonp'});
    }
});

var geojsonFormat = new ol.format.GeoJSON();

function loadFeatures(response) {
    vectorSource.addFeatures(geojsonFormat.readFeatures(response));
}

var building_point = new ol.layer.Vector({
    title: 'Cened 2.0+ data (Sondrio)',
    source: vectorSource,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(58, 255, 81)',
            width: 5
        })
    })
});
/*
var point = new ol.layer.Image({
    title: 'sondrio point wms',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:CENED_2.0_sondrio'}
    })
});*/

var geotermal = new ol.layer.Image({
    title: 'Geothermal plants',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:geotermal_sondrio'}
    })
});

var hydraulic = new ol.layer.Image({
    title: 'Hydraulic regolation works',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:hydraulic_sondrio'}
    })
});

var dams = new ol.layer.Image({
    title: 'Dams',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:dams_sondrio'}
    })
});

var province = new ol.layer.Image({
    title: 'Province boundary',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:sondrio_boundary'}
    }),
    visible: false,
    opacity: 0.2
});

var building_footprint = new ol.layer.Image({
    title: 'Building footprint',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:Sondrio_building_footprint'}
    })
});

var point_lecco = new ol.layer.Image({
    title: 'Cened 2.0+ data (Lecco province)',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user03_18:CENED_2.0_LECCO'}
    }),
    visible: false
});

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
    // interactions: ol.interaction.defaults({mouseWheelZoom: false}).extend([i])
    layers: [
        new ol.layer.Group({
            title: 'Basemaps',
            layers: [stamenToner, bingAerialWithLabels, bingRoads, OSM]
        }),
        new ol.layer.Group({
            title: 'Overlay Layers',
            layers: [province, point_lecco, building_footprint, geotermal, hydraulic, dams, building_point]
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([9.87, 46.17]),
        zoom: 16
    }),
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

// Additional comand
// Button for change the layer
var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);

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

/*
var elementPopup = document.getElementById('popup');

var popup = new ol.Overlay({
    element: elementPopup
});
map.addOverlay(popup);
*/

/*
// Extra

// Extra function



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
