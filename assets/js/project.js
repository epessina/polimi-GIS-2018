/**
 * This function is called once all the DOM elements are ready to be used.
 * It controls the behavior of the icons of the main technology. When the mouse enters or leaves
 * one of the icons the <code>.hover()</code> function of <i>jQuery</i> is fired and it shows or
 * hides the description of the technology.
 */
$(function () {

    // Use strict mode to "secure" the script from syntax errors
    "use strict";

    var qGis       = $('#qgis');
    var geoServer  = $('#geoserver');
    var openLayers = $('#openlayers');
    var haleStudio = $('#hale');
    var text       = $('.technology-text');

    qGis.hover(
        function () {
            // Appends to the div with class *text* this piece of html code.
            text.append("<p>QGIS is an open source desktop Geographic Information System that" +
                " allows to create, edit, visualize and publish geospatial information.<br>The" +
                " main usage in our project was the visualization and the cleaning of the dataset" +
                " in order to take in consideration only the buildings in the centre of" +
                " Sondrio.</p>");
        }, function () {
            // Find the paragraph in the div with class *text* and removes it.
            text.find("p").remove();
        }
    );

    geoServer.hover(
        function () {
            text.append("<p>GeoServer is an open source server for sharing geospatial data." +
                " It is design for interoperability and it allows to publish data from any" +
                " major spatial data source using open standards.<br>All the layers in our" +
                " WebGIS are datasets published on GeoServer as WMS or WFS.</p>");
        }, function () {
            text.find("p").remove();
        }
    );

    openLayers.hover(
        function () {
            text.append("<p>OpenLayers is an open source software that allows to put dynamic" +
                " maps in any web page. It can display mop tiles, vector data and markers" +
                " loaded from any source.<br>Our WebGIS is created entirely using OpenLayers.</p>");
        }, function () {
            text.find("p").remove();
        }
    );

    haleStudio.hover(
        function () {
            text.append("<p>Hale Studio is an open source software for fast and interactive" +
                " data transformation.<br>We used this software to transform the dataset from" +
                " CENED to the INSPIRE compliant format.</p>");
        }, function () {
            text.find("p").remove();
        }
    );

});