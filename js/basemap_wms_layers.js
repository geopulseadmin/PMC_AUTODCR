var map, geojson;
// const API_URL = "https://iwmsgis.pmc.gov.in/geopulse/autodcr/";
const API_URL = "http://localhost/autodcr";

// Add Basemap
var map = L.map("map", {
    center: [18.52, 73.89],
    zoom: 11,
    minZoom: 10,
    maxZoom: 18,
    boxZoom: true,
    trackResize: true,
    wheelPxPerZoomLevel: 40,
    zoomAnimation: true,

});


// var map = L.map("map", {}).setView([18.52, 73.895], 12, L.CRS.EPSG4326);

var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
}).addTo(map);

var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 20,
    }
);
var baseLayers = {};

// .addTo(map);


// for only gut showing
var Revenue_Layer1 = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Revenue_1",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });




    var Revenue_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Revenue_1",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });



var PLU_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "PLU_Ward",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });


var DPRoad_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "DP_Ward_Road",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var Boundary_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "PMC_Boundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    }).addTo(map);

var Village_Boundary = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Village_Boundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    }).addTo(map);



var aviation = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Aviation_data",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });
// .addTo(map);


var WMSlayers = {
    "OSM": osm,
    "Esri": Esri_WorldImagery,
    "Satellite": googleSat,
    Boundary: Boundary_Layer,
    Aviation: aviation,
    Village: Village_Boundary,
    Revenue: Revenue_Layer1,
    PLU: PLU_Layer,
    DPRoad: DPRoad_Layer,

};


var control = new L.control.layers(baseLayers, WMSlayers).addTo(map);
control.setPosition('topright');



