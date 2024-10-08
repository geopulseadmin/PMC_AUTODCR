
var map, geojson;
const API_URL = "http://localhost/PMC/autodcr/";
// const API_URL = "https://iwmsgis.pmc.gov.in/geopulse/autodcr/";
// const API_URL = "http://localhost/PMC-Project/";

// Add Basemap
var map = L.map("map", {
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
    }).addTo(map);

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
    }).addTo(map);



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
    }).addTo(map);

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
    PlotBoundary_Layer.addTo(map);
  }
  

var control = new L.control.layers(baseLayers, WMSlayers).addTo(map);
control.setPosition('topright');

// Remove the default zoom control
map.zoomControl.remove();

L.control.zoom({
    position: 'bottomright'
}).addTo(map);




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

//Pop-Up show
const layerDetails = {
    "AutoDCR:plotboundary": ["id", "token",  "selectedvillage", "selectedguts", "entry_timestamp"], 
  };
  
  map.on("contextmenu", async (e) => {
    let bbox = map.getBounds().toBBoxString();
    let size = map.getSize();
  
    for (let layer in layerDetails) {
        let selectedKeys = layerDetails[layer];
        let urrr = `https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=${layer}&STYLES&LAYERS=${layer}&exceptions=application%2Fvnd.ogc.se_inimage&INFO_FORMAT=application/json&FEATURE_COUNT=50&X=${Math.round(e.containerPoint.x)}&Y=${Math.round(e.containerPoint.y)}&SRS=EPSG%3A4326&WIDTH=${size.x}&HEIGHT=${size.y}&BBOX=${bbox}`;
  
        try {
            let response = await fetch(urrr);
            let html = await response.json();
  
            var htmldata = html.features[0].properties;
            let txtk1 = "";
            for (let key of selectedKeys) {
                if (htmldata.hasOwnProperty(key)) {
                    let value = htmldata[key];
                    txtk1 += "<tr><td>" + key + "</td><td>" + value +"</td></tr>";
                }
            }
  
            let detaildata1 = "<div style='max-height: 350px; max-height: 250px;'><table  style='width:110%;' class='popup-table' >" + txtk1 + "</td></tr><tr><td>Co-Ordinates</td><td>" + e.latlng + "</td></tr></table></div>";
  
            L.popup().setLatLng(e.latlng).setContent(detaildata1).openOn(map);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
  });