document.addEventListener('DOMContentLoaded', function () {
    var originalMap, newMap;

    function initializeMaps() {
 

        // Initialize the new map
        var newMap = L.map("newMap", {
    center: [18.52, 73.89],
    zoom: 11,
    minZoom: 12,
    maxZoom: 18,
    boxZoom: true,
    trackResize: true,
    wheelPxPerZoomLevel: 40,
    zoomAnimation: true,

});
        // newMap = L.map('newMap').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(newMap);
       
    }

    // Trigger map resize when the modal is shown
    $('#dataPageModal').on('shown.bs.modal', function () {
        initializeMaps();
    
        newMap.invalidateSize();
    });
});

document.addEventListener('DOMContentLoaded', function () {

var newMap, geojson;
// const API_URL = "http://localhost/PMC/autodcr/";
// const API_URL = "https://iwmsgis.pmc.gov.in/geopulse/autodcr/";
// const API_URL = "http://localhost/PMC-Project/";

// Add Basemap
function initializeMaps() {
var newMap = L.map("newMap", {
        center:[18.52, 73.89],
        zoom: 12,
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
    }).addTo(newMap);

var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
    }
);
var baseLayers = {
    "OSM": osm,
    "Esri": Esri_WorldImagery,
    "Satellite": googleSat,
};

var PlotBoundary_Layer = L.tileLayer
  .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "plotboundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    }).addTo(newMap);



// for only gut showing
var Revenue_Layer1 = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Revenue_1",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        maxZoom: 19.9,
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
        maxZoom: 19.9,
        // attribution: "Revenue",
        opacity: 1,
    });


var JE_Names = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "JE_Names",
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
    }).addTo(newMap);

var TDR_Zones = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "TDR_Zones",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var TOD_Zones = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "TOD_Zones",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });




var PMC_Reservation = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "PMC_Reservation",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var Red_Blue = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Red_Blue",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var Yerwada_Jail = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Yerwada_Jail",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });


var Railway_Buffer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Railway_Buffer",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var PMC_Lake = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Lake",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var Monuments = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Monuments",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var Village_Boundary = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Village_Boundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    }).addTo(newMap);



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

var Garden = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Garden",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });
var DevelopmentRestriction = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "DevelopmentRestriction",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });


var WMSlayers = {
   
    Boundary: Boundary_Layer,
    Village: Village_Boundary,
    Revenue: Revenue_Layer1,
    JE_Names: JE_Names,
    TDR_Zones: TDR_Zones,
    TOD_Zones: TOD_Zones,
    PMC_Reservation: PMC_Reservation,
    Garden: Garden,
    DevelopmentRestriction: DevelopmentRestriction,
    Yerwada_Jail : Yerwada_Jail,
    Red_Blue:Red_Blue,
    Railway_Buffer:Railway_Buffer,
    PMC_Lake:PMC_Lake,
    Monuments:Monuments,
    Aviation: aviation

};

function refreshWMSLayer() {

    map.removeLayer(PlotBoundary_Layer);
    PlotBoundary_Layer.addTo(newMap);
  }
  

var control = new L.control.layers(baseLayers, WMSlayers).addTo(newMap);
control.setPosition('topright');

// Remove the default zoom control
newMap.zoomControl.remove();

L.control.zoom({
    position: 'bottomright'
}).addTo(newMap);




$(document).ready(function () {
    refreshWMSLayer();

    var lastInsertedId = localStorage.getItem('lastInsertedPlotBoundaryId');
    var coordinatesString  = localStorage.getItem('coordinates')
    var boundss = localStorage.getItem('bounds')
  
    
    var coordinatesArray = boundss.split(",").map(Number);

    // var coordinatesArray = coordinatesString.split(",").map(String);//Changed Number to String PH

    console.log(coordinatesArray ,"okkkkkkk");


    var coords = [];
    while (coordinatesArray.length > 0) {
    coords.push(coordinatesArray.splice(0, 2).reverse());
   }
  console.log(coords,"hhhhhhhhh",bounds,"bounds");

  var bounds = L.latLngBounds(coords);
  console.log('bounds1111',bounds);
 map.fitBounds(bounds);

 })

}   
    // Trigger map resize when the modal is shown
    $('#dataPageModal').on('shown.bs.modal', function () {
        initializeMaps();
    
        newMap.invalidateSize();
    });
});


