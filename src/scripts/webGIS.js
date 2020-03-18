import $ from "jquery"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css'

import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from "ol/layer/Group";
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import Stamen from "ol/source/Stamen";
import BingMaps from "ol/source/BingMaps";
import { defaults } from 'ol/control';
import LayerSwitcher from "ol-layerswitcher/dist/ol-layerswitcher";
import { Vector } from 'ol/source';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import Style from "ol/style/Style";
import RegularShape from "ol/style/RegularShape";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

import nav from "../scripts/navbar";
import ScaleLine from "ol/control/ScaleLine";
import FullScreen from "ol/control/FullScreen";
import OverviewMap from "ol/control/OverviewMap";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";


/** Key for accessing the Bing maps. */
const BING_KEY = "AgyifPDfXg47i2reCsF1jUuyudaxgUWbN93sYLchBznYvbX8snt9RJZBx2BmmPZq";


$(() => {

    // Initialize the navigation bar
    nav();

    // Initialize the map
    initMap();

});


/** Initializes the map. */
function initMap() {

    // Array of basemaps
    const baseMaps = [
        new TileLayer({
            title  : "Bing Maps - Aerial with Labels",
            type   : "base",
            visible: false,
            source : new BingMaps({ key: BING_KEY, imagerySet: "AerialWithLabels" })
        }),
        new TileLayer({
            title  : "Bing Maps - Roads",
            type   : "base",
            visible: false,
            source : new BingMaps({ key: BING_KEY, imagerySet: "Road" })
        }),
        new TileLayer({ title: "Stamen Toner", type: "base", visible: false, source: new Stamen({ layer: "toner" }) }),
        new TileLayer({ title: "OpenStreetMap", type: "base", visible: true, source: new OSM() }),
    ];

    // Array of overlay layers
    const overlayLayers = [
        new VectorLayer({
            title        : "Cened 2.0+ data (Sondrio)",
            source       : loadSource("Cened_2"),
            style        : new Style({
                image: new RegularShape({
                    fill  : new Fill({ color: '#03C7EA' }),
                    stroke: new Stroke({ color: '#000000', width: 1 }),
                    points: 8,
                    radius: 5,
                    angle : Math.PI
                })
            }),
            maxResolution: 15
        })
    ];


    // Array of map controls
    const controls = [
        new ScaleLine(),
        new FullScreen(),
        new OverviewMap(),
        new LayerSwitcher(),
        new MousePosition({ coordinateFormat: createStringXY(4), projection: "EPSG:4326" })
    ];


    // Map object
    const map = new Map({
        target  : "map",
        layers  : [
            new LayerGroup({ title: "Basemaps", layers: baseMaps }),
            new LayerGroup({ title: "Overlay Layers", layers: overlayLayers }),
        ],
        view    : new View({ center: fromLonLat([9.87405, 46.16944]), zoom: 16 }),
        controls: defaults().extend(controls)
    });


    // Popup to display the data of the WFS layer
    map.addOverlay(new Overlay({ element: document.getElementById('popup') }))

}


/**
 * Loads a local GeoJSON file as source for a vector layer.
 *
 * @param {string} name - The name of the file
 * @returns {Vector} The vector layer.
 */
function loadSource(name) {

    return new Vector({ url: `assets/vectors/${name}.geojson`, format: new GeoJSON() })

}


// var map = new ol.Map({
//     layers: [
//         new ol.layer.Group({
//             title: 'Overlay Layers',
//             layers: [province, municipality, point_lecco, building_footprint,
//                 geothermal, hydraulic, dams, building_point]
//         })
//     ],
// });


/*
    Old version

// Loads the WFS of the buildings using ajax to make an asynchronous request.
var vectorSource = new ol.source.Vector({
    loader: function (extent, resolution, projection) {
        var url = 'http://ows3.como.polimi.it:8080/geoserver/ows?service=WFS' +
            '&version=2.0.0&request=GetFeature&typeName=user01_18:CENED_2.0_sondrio&' +
            'outputFormat=text/javascript&srsname=EPSG:900913&format_options=callback:loadFeatures';
        $.ajax({url: url, dataType: 'jsonp'});
    }
});

var geoJsonFormat = new ol.format.GeoJSON();

function loadFeatures(response) {
    vectorSource.addFeatures(geoJsonFormat.readFeatures(response));
}

var building_point = new ol.layer.Vector({
    title: 'Cened 2.0+ data (Sondrio)',
    source: vectorSource,
    style: new ol.style.Style({
        image: new ol.style.RegularShape({
            fill: new ol.style.Fill({color: '#03C7EA'}),
            stroke: new ol.style.Stroke({color: '#000000', width: 1}),
            points: 8, // number of vertex
            radius: 5,
            angle: Math.PI
        })
    }),
    maxResolution: 15
});

// Loads the WMS of the geothermal plants.
var geothermal = new ol.layer.Image({
    title: 'Geothermal plants',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:geotermal_sondrio'}
    }),
    maxResolution: 100
});

// Loads the WMS of the hydraulic regulation works.
var hydraulic = new ol.layer.Image({
    title: 'Hydraulic regulation works',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:hydraulic_sondrio'}
    }),
    maxResolution: 50
});

// Loads the WMS of the dams.
var dams = new ol.layer.Image({
    title: 'Dams',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:dams_sondrio'}
    }),
    maxResolution: 50

});

// Loads the WMS of the municipality boundary.
var municipality = new ol.layer.Image({
    title: 'Municipality boundary',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:sondrio_mun'}
    }),
    opacity: 0.5,
    minResolution: 5,
    maxResolution: 150
});

// Loads the WMS of the province boundary.
var province = new ol.layer.Image({
    title: 'Province boundary',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:sondrio_boundary'}
    }),
    opacity: 0.4,
    minResolution: 20,
    maxResolution: 1000,
    visible: true
});

// Loads the WMS of the building footprint.
var building_footprint = new ol.layer.Image({
    title: 'Building footprint',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user01_18:Sondrio_building_footprint'}
    }),
    maxResolution: 5
});

// Loads the WMS of the dataset of Lecco from Group 5.
var point_lecco = new ol.layer.Image({
    title: 'Cened 2.0+ data (Lecco province)',
    source: new ol.source.ImageWMS({
        url: 'http://ows3.como.polimi.it:8080/geoserver/wms',
        params: {'LAYERS': 'user03_18:CENED_2.0_LECCO'}
    }),
    visible: false,
    maxResolution: 100
});
*/

/*
map.on('click', function (event) {
    var feature = map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
        return feature;
    });
    if (feature != null) {
        var pixel = event.pixel;
        var coord = map.getCoordinateFromPixel(pixel);
        popup.setPosition(coord);
        $(elementPopup).attr('title', 'Cened 2.0+ Info');

        var text;
        if (feature.get('RIQ_CLASSE').length === 0)
            text = "-";
        else
            text = feature.get('RIQ_CLASSE');

        $(elementPopup).attr('data-content',
            '<b>Building Address: </b>' + feature.get('INDIRIZZO') +
            '</br><b>Id Certification: </b>' + feature.get('COD_APE') +
            '</br><b>Date Certification: </b>' + feature.get('DATA_INS') +
            '</br><b>Energetic Class: </b>' + feature.get('CLASSE_ENE') +
            '</br><b>New Energetic Class Proposed: </b>' + text
        );
        $(elementPopup).popover({'placement': 'top', 'html': true});
        $(elementPopup).popover('show');
    }
});

map.on('pointermove', function (e) {
    if (e.dragging) {
        $(elementPopup).popover('destroy');
        return;
    }
    var pixel                    = map.getEventPixel(e.originalEvent);
    var hit                      = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});
*/
