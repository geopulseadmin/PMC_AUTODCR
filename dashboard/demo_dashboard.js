var map, geojson;
const API_URL = "http://localhost/autodcr/";
// const API_URL = "https://iwmsgis.pmc.gov.in/geopulse/autodcr/";
// const API_URL = "http://localhost/PMC-Project/";
const  main_url = "http://iwmsgis.pmc.gov.in:8080/geoserver1/"
const workspace = "AutoDCR"
const layerName = "plotboundary"
// Add Basemap
var map = L.map("map", {
        center:[18.52, 73.89],
        zoom: 11,
        minZoom: 10,
        maxZoom: 18,
        boxZoom: true,
        trackResize: true,
        wheelPxPerZoomLevel: 40,
        zoomAnimation: true,
        
});


var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    // attribution:
    //   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        // attribution:
        //   "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
);
var baseLayers = {};

var PlotBoundary_Layer = L.tileLayer
  .wms("http://iwmsgis.pmc.gov.in:8080/geoserver1/AutoDCR/wms", {
        layers: "plotboundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    }).addTo(map);


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

// .addTo(map);


// for only gut showing
var Revenue_Layer1 = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Revenue_1",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
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
    });


var WMSlayers = {
    "OSM": osm,
    "Esri": Esri_WorldImagery,
    "Satellite": googleSat,
     Plot:PlotBoundary_Layer,
    Revenue: Revenue_Layer,
    PLU: PLU_Layer,
    DPRoad: DPRoad_Layer,
    Boundary: Boundary_Layer,
    Village: Village_Boundary


};

function refreshWMSLayer() {
    // Remove the layer from the map
    map.removeLayer(PlotBoundary_Layer);
    // Add the layer again
    PlotBoundary_Layer.addTo(map);
  }
  

var control = new L.control.layers(baseLayers, WMSlayers).addTo(map);
control.setPosition('topright');


map.zoomControl.remove();
L.control.zoom({
    position: 'bottomright' // Change position to bottom right
}).addTo(map);

// Add scale control
L.control.scale({
  position: 'bottomleft' // Change position to bottom right
}).addTo(map);



// ----------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
  var columns = { "village_name": "Village Name", "gut_no": "Gut Number", "token": "Token" };
  var select = document.getElementById("search_type");

  // Populate dropdown with column names
  for (var key in columns) {
    if (columns.hasOwnProperty(key)) {
      var option = document.createElement("option");
      option.text = columns[key]; // Use columns[key] to get the column name
      option.value = key; // Use key as the value (e.g., Work_ID, Budget_Code)
      select.appendChild(option);
    }
  }

  // Initialize selected value variable
  let selectedValue;

  // Event listener for dropdown change
  $("#search_type").change(function () {
    var selectedValue = $(this).val();
    var layerName = 'plotboundary';
    var workspace = 'AutoDCR';
    console.log(selectedValue, "lllllllllll");

    function getValues(callback) {
      var geoServerURL = `${main_url}${workspace}/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=${layerName}&propertyName=${selectedValue}&outputFormat=application/json`;
      console.log(geoServerURL, "geoServerURLsearch");

      $.getJSON(geoServerURL, function (data) {
        var villageNames = new Set();

        // Populate the Set with village names
        $.each(data.features, function (index, feature) {
          var villageName = feature.properties.village_name;
          if (typeof villageName === 'string' && villageName !== null) {
            villageNames.add(villageName);
          }
        });

        // Convert the Set to an array
        var uniqueVillageNames = Array.from(villageNames);
        callback(uniqueVillageNames);
      });
    }

    getValues(function (data) {
      autocomplete(document.getElementById("searchInputDashboard"), data);
    });
  });

  // autocomplete function
  function autocomplete(input, arr) {
    let currentFocus;
    input.addEventListener("input", function () {
      let list, item, i, val = this.value.toLowerCase(); // Convert input value to lowercase for case-insensitive comparison
      closeAllLists();
      if (!val) return false;
      currentFocus = -1;
      list = document.createElement("ul");
      list.setAttribute("id", "autocomplete-list");
      list.setAttribute("class", "autocomplete-items");

      document.getElementById("autocompleteSuggestions").appendChild(list);

      console.log(list, "kkkkkkkkkkkkkkkkkkkkk");
      for (i = 0; i < arr.length; i++) {
        if (arr[i].toLowerCase().includes(val)) { // Check if the suggestion contains the input value
          item = document.createElement("li");
          item.innerHTML = arr[i].replace(new RegExp(val, 'gi'), (match) => `<strong>${match}</strong>`); // Highlight matching letters
          item.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          item.addEventListener("click", function () {
            selectedValue = this.getElementsByTagName("input")[0].value; // Store the selected value

            var searchtypefield = $("#search_type").val();

            let cqlFilter;

            cqlFilter = `${searchtypefield} IN ('${selectedValue}')`;

            PlotBoundary_Layer.setParams({
              CQL_FILTER: cqlFilter,
              maxZoom: 19.5,
            });

            PlotBoundary_Layer.addTo(map).bringToFront();

            fitbous(cqlFilter);

            input.value = selectedValue;
            closeAllLists();
          });
          list.appendChild(item);
        }
      }
    });

    input.addEventListener("keydown", function (e) {
      let x = document.getElementById("autocomplete-list");
      if (x) x = x.getElementsByTagName("li");
      if (e.keyCode === 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode === 38) { // up
        currentFocus--;
        addActive(x);
      } else if (e.keyCode === 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) {
            selectedValue = x[currentFocus].getElementsByTagName("input")[0].value; // Store the selected value
            input.value = selectedValue;
            closeAllLists();
          }
        }
      }
    });

    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== input) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }
});

function fitbous(filter) {
  var layers = ["AutoDCR:plotboundary"];
  var bounds = null;

  var processLayer = function (layerName, callback) {
    var urlm =
      main_url + "ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
      layerName +
      "&CQL_FILTER=" +
      filter +
      "&outputFormat=application/json";

    $.getJSON(urlm, function (data) {
      var geojson = L.geoJson(data);
      var layerBounds = geojson.getBounds();
      if (bounds) {
        bounds.extend(layerBounds);
      } else {
        bounds = layerBounds;
      }
      callback();
    });
  };

  var layersProcessed = 0;
  layers.forEach(function (layerName) {
    processLayer(layerName, function () {
      layersProcessed++;
      if (layersProcessed === layers.length) {
        // Apply the combined bounds to the map after all layers are processed
        if (bounds) {
          map.fitBounds(bounds);
        }
      }
    });
  });
}
// ---------------------------------

function fitbous(filter) {
  var layers = ["AutoDCR:plotboundary"];
  var bounds = null;

  var processLayer = function (layerName, callback) {
    var urlm =
      main_url + "ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
      layerName +
      "&CQL_FILTER=" +
      filter +
      "&outputFormat=application/json";

    $.getJSON(urlm, function (data) {
      var geojson = L.geoJson(data);
      var layerBounds = geojson.getBounds();
      if (bounds) {
        bounds.extend(layerBounds);
      } else {
        bounds = layerBounds;
      }
      callback();
    });
  };

  var layersProcessed = 0;
  layers.forEach(function (layerName) {
    processLayer(layerName, function () {
      layersProcessed++;
      if (layersProcessed === layers.length) {
        // Apply the combined bounds to the map after all layers are processed
        if (bounds) {
          map.fitBounds(bounds);
        }
      }
    });
  });
}


const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(500).send(error);
    }
  });
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});