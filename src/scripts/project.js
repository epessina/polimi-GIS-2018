import $ from "jquery"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import nav from "../scripts/navbar";


$(() => {

    console.log("jQuery is ready");

    nav()

});

// $(function () {
//
//     var qGis       = $('#qgis');
//     const qGisText = "<p><a href=\"https://www.qgis.org/it/site/\" target=\"_blank\">QGIS</a> is" +
//         " an open source desktop Geographic Information System that allows to create, edit," +
//         " visualize and publish geospatial information.<br>The main usage in our project was the" +
//         " visualization and the cleaning of the dataset in order to take in consideration only" +
//         " the buildings in the centre of Sondrio.</p>";
//
//     var geoServer     = $('#geoserver');
//     var geoServerText = "<p><a href=\"http://geoserver.org/\" target=\"_blank\">GeoServer</a>" +
//         " is an open source server for sharing geospatial data." +
//         " It is designed for interoperability and it allows to publish data from any" +
//         " major spatial data source using open standards.<br>All the layers in our" +
//         " WebGIS are datasets published on GeoServer as WMS or WFS.</p>";
//
//     var openLayers     = $('#openlayers');
//     var openLayersText = "<p><a href=\"https://openlayers.org/\" target=\"_blank\">OpenLayers</a> is" +
//         " an open source software that allows to put dynamic" +
//         " maps in any web page. It can display map tiles, vector data and markers" +
//         " loaded from any source.<br>Our WebGIS is created entirely using OpenLayers.</p>";
//
//     var haleStudio     = $('#hale');
//     var haleStudioText = "<p><a href=\"https://www.wetransform.to/products/halestudio/\" target=\"_blank\">Hale Studio</a>" +
//         " is an open source software for fast and interactive" +
//         " data transformation.<br>We used this software to transform the dataset from" +
//         " CENED to the INSPIRE compliant format.</p>";
//
//     var text_div = $('.technology-text');
//
//     // The page loads with the icon of qGis selected.
//     qGis.addClass('selected-tech');
//     text_div.append(qGisText);
//
//     /**
//      * This function removes the class <code>selected-tech</code> from all the icons and removes
//      * the text explaining the technology.
//      */
//     function clean() {
//         qGis.removeClass('selected-tech');
//         geoServer.removeClass('selected-tech');
//         openLayers.removeClass('selected-tech');
//         haleStudio.removeClass('selected-tech');
//
//         text_div.find("p").remove();
//     }
//
//     /**
//      * This function adds to one technology the class <code>selected-tech</code> and shows the
//      * text that explain that technology.
//      *
//      * @param tech the selected technology.
//      * @param text the text that explains that technology.
//      */
//     function add(tech, text) {
//         clean();
//         $(tech).addClass('selected-tech');
//         text_div.append(text);
//     }
//
//     // The following code adds to all the technologies a .click function that is fired when the
//     // user clicks on it. When that action is performed, the function add is fired.
//
//     qGis.click(function () {
//         add(qGis, qGisText)
//     });
//
//     geoServer.click(function () {
//         add(geoServer, geoServerText)
//     });
//
//     openLayers.click(function () {
//         add(openLayers, openLayersText)
//     });
//
//     haleStudio.click(function () {
//         add(haleStudio, haleStudioText)
//     });
//
// });
