var map = L.map("map", {
  center: [18.52, 73.89],
  zoom: 12,
  minZoom: 11,
  maxZoom: 20,
  boxZoom: true,
  trackResize: true,
  wheelPxPerZoomLevel: 40,
  zoomAnimation: true
});

var googleSat = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
  }
);

var stamen = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
).addTo(map);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
);

// var PlotBoundary_Layer = L.tileLayer.wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
//   layers: "Plot_Layout",
//   // layers: "plotboundary",
//   format: "image/png",
//   transparent: true,
//   tiled: true,
//   version: "1.1.0",
//   opacity: 1
// }).addTo(map);

var Revenue_Layer = L.tileLayer.wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
  layers: "Revenue_1",
  format: "image/png",
  transparent: true,
  tiled: true,
  version: "1.1.0",
  opacity: 1
});

var Revenue_Layer1 = L.tileLayer.wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
  layers: "Revenue_1",
  format: "image/png",
  transparent: true,
  tiled: true,
  version: "1.1.0",
  opacity: 1
}).addTo(map);

var PLU_Layer = L.tileLayer.wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
  layers: "PLU_Ward",
  format: "image/png",
  transparent: true,
  tiled: true,
  version: "1.1.0",
  opacity: 1
});

var DPRoad_Layer = L.tileLayer.wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
  layers: "DP_Ward_Road",
  format: "image/png",
  transparent: true,
  tiled: true,
  version: "1.1.0",
  opacity: 1
});

var Boundary_Layer = L.tileLayer.wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
  layers: "PMC_Boundary",
  format: "image/png",
  transparent: true,
  tiled: true,
  version: "1.1.0",
  opacity: 1
}).addTo(map);

var Village_Boundary = L.tileLayer.wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
  layers: "Village_Boundary",
  format: "image/png",
  transparent: true,
  tiled: true,
  version: "1.1.0",
  opacity: 1
});


var Village_Boundary1 = L.tileLayer.wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
  layers: "Village_Boundary1",
  format: "image/png",
  transparent: true,
  tiled: true,
  version: "1.1.0",
  opacity: 1
});


var Plot_Layout = L.tileLayer.wms(
"https://iwmsgis.pmc.gov.in/geoserver/wms",
{
  layers: "Plot_Layout",
  format: "image/png",
  transparent: true,
  tiled: true,
  version: "1.1.0",
  maxZoom: 21,
  opacity: 1,
}
).addTo(map);

var Zone_layer = L.tileLayer.wms(
"https://iwmsgis.pmc.gov.in/geoserver/wms",
{
  layers: "Zone_layer",
  format: "image/png",
  transparent: true,
  tiled: true,
  version: "1.1.0",
  maxZoom: 21,
  opacity: 1,
}
).addTo(map);

var TDR_Zones = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "TDR_Zones",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        opacity: 1,
    });

var PMC_Reservation = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "PMC_Reservation",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });

var Red_Blue = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Red_Blue",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });

var Yerwada_Jail = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Yerwada_Jail",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });


var Railway_Buffer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Railway_Buffer",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });

var PMC_Lake = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Lake",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });
    var JE_Names = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "JE_Names",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });


var Monuments = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Monuments",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });




    var aviation = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Aviation_data",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });

var Garden = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Garden",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });
var DevelopmentRestriction = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "DevelopmentRestriction",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });




var baseLayers = {
  "OSM": osm,
  "Esri": Esri_WorldImagery,
  "Satellite": googleSat,
  "stamen": stamen,
};


var overlayLayers = {
  // "Plot": PlotBoundary_Layer,
  "Boundary": Boundary_Layer,
  "Village": Village_Boundary,
  "Zone_layer":Zone_layer,
  "Plot_Layout":Plot_Layout,
  "Revenue":Revenue_Layer1,
  "JE_Names": JE_Names,
  "TDR_Zones": TDR_Zones,
 "TOD_Zones":TOD_Zones,
  "PMC_Reservation": PMC_Reservation,
  "Garden": Garden,
  "DevelopmentRestriction": DevelopmentRestriction,
  "Yerwada_Jail": Yerwada_Jail,
  "Red_Blue": Red_Blue,
  "Railway_Buffer": Railway_Buffer,
  "PMC_Lake": PMC_Lake,
  "Monuments": Monuments,
  "Aviation": aviation
};

L.control.layers(baseLayers, overlayLayers).addTo(map);

map.on("zoomend", function() {
  if (map.getZoom() > 17.2) {
    if (!map.hasLayer( googleSat)) {
      map.removeLayer(stamen);
      map.addLayer( googleSat);
    }
  } else {
    if (!map.hasLayer(stamen)) {
      map.removeLayer( googleSat  );
      map.addLayer(stamen);
    }
  }
});
