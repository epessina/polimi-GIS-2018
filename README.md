# Harmonizing data flows in Energy Saving EU policies for Sondrio province

### Table of Contents

- [Introduction](#introduction)
- [INSPIRE](#inspire)
- [The project](#the-project)
- [Transformation](#transformation)
- [webGIS](#webgis)
- [Main technologies](#main-technologies)
- [About us](#about-us)
- [License](#license)


### Introduction

The work presented in this website is part of a project called [giCASES](http://www.gicases.eu/) whose objective is to
create a *University-Enterprise Alliance for a Spatially Enabled Society*. 

This Knowledge Alliance is co-funded by the Erasmus+ programme of the European Union that involves various European 
universities – and [Politecnico di Milano](https://www.polimi.it/) among them - with the purpose of reducing the gap
between the knowledge students obtain while studying and the knowledge required once they start working.
 
The idea is that this goal can be achieved through a collaboration with relevant companies presenting real life cases
 for the students to solve.

For this project, the students of the Geographic Information System course of professor Brovelli teamed up with 
[Epsilon Italia](https://www.epsilon-italia.it/) to develop the case study [CS5 - Harmonizing data flows in Energy
 Saving EU policies](http://www.gicases.eu/harmonizing-data-flows-in-energy-saving-eu-policies/).


### INSPIRE

The cornerstone of the project is the [INSPIRE Directive](https://inspire.ec.europa.eu/) with a focus on how states of
the European Union are required to transform their data into an *INSPIRE compliant format*.

This will lead to the creation of a common spatial data infrastructure, enabling the sharing of spatial information
between organisations and countries all over Europe and assisting them in policy-making across boundaries.
 

### The project

The main goal of the project was to harmonize data flows related to energy saving policies for buildings located in
the centre of **Sondrio**, one of the provincial capital of Lombardy region in Italy. 

In particular, the two objectives of the work were:
- to perform a transformation of the [CENED](http://www.cened.it/) (Certificazione ENergetica degli EDifici) dataset
according to the extended *INSPIRE Building 2D core data model*;
- to show the CENED dataset of Sondrio together with additional ancillary information using a WebGIS.


### Transformation

Before starting the actual work, an understanding of the main goal of the INSPIRE Directive and the study of both the
source data model and sets given from CENED and the target data model and schema from INSPIRE were required.

Once those knowledge was acquired, the first step in harmonizing the data was to link the simpler source data model to
the more complex target data model, matching attributes and values. 

In order to visualize the attributes needed from the target data model and the corresponding attributes in the source
data model, a *mapping table* was created and, based on that, we were able to perform the transformation using [Hale
Studio](https://www.wetransform.to/products/halestudio/), an open source data transformation. 

The final output was a `GML` (Geography Markup Language) file, which can be downloaded here (??????). 


### WebGIS

The last part of the project consisted in creating a WebGIS to visualize the transformed data along with various
basemaps and ancillary datasets related to the energy topic, all published as `WMS` or `WFS` using 
[GeoServer](http://geoserver.org/).

Using [OpenLayers](https://openlayers.org/) we set up a WebGIS that shows a visualization of the original CENED
dataset - consisting in a selection of *103 buildings* in the centre of Sondrio -, the boundaries of the municipality
and of the province and the building footprint. 

As ancillary layers one can find the dams, the *hydraulic regulation works and the geothermal plants* in the area. The
choice had fallen upon those constructions because they either provide or have the potential to provide electric or heat
energy for housing. 

The map is completed by the CENED dataset of Lecco and a choice of four different basemaps.


### Main technologies

- [QGIS](https://www.qgis.org/it/site/): an open source desktop Geographic Information System that allows to create,
edit, visualize and publish geospatial information. The main usage in our project was the visualization and the cleaning
of the dataset in order to take in consideration only the buildings in the centre of Sondrio.

- [GeoServer](http://geoserver.org/): an open source server for sharing geospatial data. It is design for
interoperability and it allows to publish data from any major spatial data source using open standards. All the layers
in our WebGIS are datasets published on GeoServer as WMS or WFS.

- [OpenLayers](https://openlayers.org/): OpenLayers is an open source software that allows to put dynamic in any web
page. It can display map tiles, vector data and markers loaded from any source. Our WebGIS is created entirely using
OpenLayers.

- [Hale Studio](https://www.wetransform.to/products/halestudio/): an open source software for fast and interactive
data transformation. We used this software to transform the dataset from CENED to the INSPIRE compliant format.


### About us

This repository contains the project of the course *Geographic Information System* teached at Politecnico di Milano by
Professor Brovelli in the academic year 2017/2018.

The group is composed three Master degree students of Politecnico di Milano: 
[Lorenzo Stucchi](mailto:lorenzo.stucchi@mail.polimi.it), 
[Edoardo Pessina](mailto:edoardo.pessina@polimi.it) and
[Mathias Vestgaard](mailto:mathiasundehim.vestgard@mail.polimi.it).


### License
[MIT](https://choosealicense.com/licenses/mit/) © [Politecnico di Milano](https://www.polimi.it/)
