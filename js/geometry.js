
$(document).ready(function () {
    // Initialize the map
    initializeMap();
    handleURLParameters();

    // Initialize Select2 (if used elsewhere)
    $('.select2').select2();
});


function initializeMap() {
    // Initialize the map
    var map = L.map("map", {
        center: [18.32, 73.44],
        zoom: 18,
        minZoom: 9,
        maxZoom: 20,
        zoomControl: false,
        scrollWheelZoom: true,
        editable: false// Enable Leaflet.Editable
    });

    // Define tile layers
    var googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        maxZoom: 25,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
    });

    var Esri_WorldImagery = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 25
    });

    var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 21
    }).addTo(map);

    // Define WMS layers
    var baseURL = "https://iwmsgis.pmc.gov.in/geoserver/PMC_test/wms";

    var plot1_layouts_test = L.tileLayer.wms(baseURL, {
        layers: "plot1_layouts_test",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        opacity: 1
    });

    map.on("zoomend", function () {
        if (map.getZoom() > 17.2) {
            if (!map.hasLayer(googleSat)) {
                map.removeLayer(osm);
                map.addLayer(googleSat);
            }
        } else {
            if (!map.hasLayer(osm)) {
                map.removeLayer(googleSat);
                map.addLayer(osm);
            }
        }
    });


    var drawnItems = new L.FeatureGroup().addTo(map); // Create and add drawn items to the map

    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems // Set the editable group for drawing tools
        },
        draw: {
            polygon: {
                shapeOptions: {
                    color: "red", // Set the polygon border color
                },
                icon: new L.DivIcon({
                    iconSize: new L.Point(6, 6), // Set the icon size
                    className: "leaflet-div-icon", // Icon class
                }),
            },
            polyline: false,
            rectangle: false,
            circle: false,
            marker: false,
        }
    });
    map.addControl(drawControl);
    
    // Loop through all layers on the map and find the GeoJSON layers
    map.eachLayer(function(layer) {
        if (layer instanceof L.GeoJSON) {
            console.log("Found GeoJSON layer:", layer);
    
            // Iterate through each feature in the GeoJSON and add it to the drawnItems feature group
            layer.eachLayer(function(subLayer) {
                drawnItems.addLayer(subLayer); // Add each feature to drawnItems so it can be edited
            });
        }
    });
    
    // Handle the event when a new drawing is created
    map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
      
        // Add the newly created layer (polygon) to drawnItems for editing
        drawnItems.addLayer(layer);
    
        // Calculate the area of the polygon (using turf.js)
        if (layer instanceof L.Polygon) {
            var area = turf.area(layer.toGeoJSON());
            var areaText = 'Area: ' + (area).toFixed(2) + ' sq m'; // Area in square meters
            layer.bindPopup(areaText).openPopup();
        }
    
        var polygonId = 'polygon_' + L.stamp(layer); // Unique ID for each polygon
        layer.polygonId = polygonId;
    });
    
    // Event for editing existing polygons
    map.on('draw:edited', function (e) {
        var layers = e.layers;
        layers.eachLayer(function (layer) {
            if (layer instanceof L.Polygon) {
                var area = turf.area(layer.toGeoJSON());
                var areaText = 'Area: ' + (area).toFixed(2) + ' sq m'; // Area in square meters
                layer.setPopupContent(areaText);
                layer.openPopup();
            }
        });
    });
    
    // Event for deleting polygons
    map.on('draw:deleted', function (e) {
        var layers = e.layers;
        layers.eachLayer(function (layer) {
            if (layer.polygonId) {
                delete drawnPolygons[layer.polygonId]; // Delete from the drawnPolygons object
            }
        });
    });
    

    // Layer control
    var WMSlayers = {
        "Esri": Esri_WorldImagery,
        "Satellite": googleSat,
        "OSM": osm,
    };

    L.control.layers(WMSlayers, {
        "Plot Layouts": plot1_layouts_test
    }).addTo(map);

    // Store map in window for global access
    window.map = map;
    window.plot1_layouts_test = plot1_layouts_test;
    window.highlightLayer = null;
    window.currentHighlightLayer = null;
}

/**
 * Handles URL parameters to filter and fetch data.
 */
function handleURLParameters() {
    var urlParams = new URLSearchParams(window.location.search);
    var villageName = urlParams.get('token');
    console.log("villageName:", villageName);

    if (!villageName) {
        alert("No token provided in the URL.");
        return;
    }

    var filter = "token = '" + villageName + "'";
    console.log("CQL_FILTER:", filter);

    // Set WMS parameters with the filter
    window.plot1_layouts_test.setParams({ CQL_FILTER: filter, maxZoom: 19.5, styles: "plot1_layouts_test" }).addTo(window.map);

    // Fetch data based on the filter
    getData(filter);
}



function getData(filter) {
    console.log("Fetching data with filter:", filter);
    const layers = ["PMC_test:plot1_layouts_test"];
    const layerDetails = ["token", "ownerinformation_firstname", "ownerinformation_address", "ownerinformation_contactdetails", "caseinformation_applyfor", "caseinformation_proposaltype", "caseinformation_tdrzone", "area", "caseinformation_area", "caseinformation_grossplotarea", "entry_timestamp"];

    const promises = layers.map(layerName => {
        const url = `https://iwmsgis.pmc.gov.in/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${encodeURIComponent(layerName)}&CQL_FILTER=${encodeURIComponent(filter)}&outputFormat=application/json`;
        console.log("WFS URL:", url);
        $('#table-container').show();

        return $.getJSON(url).then(data => {
            return data.features.map(feature => {
                const properties = feature.properties;
                let filteredData = {};
                layerDetails.forEach(key => {
                    filteredData[key] = properties[key] || "";
                });
                filteredData.geometry = feature.geometry;
                return filteredData;
            });
        }).catch(error => {
            console.error("Error fetching data from WFS:", error);
            return [];
        });
    });

    Promise.all(promises).then(results => {
        const flattenedResults = results.flat();
        console.log("Fetched Data:", flattenedResults);
        paginateResults(flattenedResults);
    }).catch(error => {
        console.error("An error occurred:", error);
    });
}

// let highlightLayer = null;


function paginateResults(data) {
    const itemsPerPage = 1;
    let currentPage = 1;

    function displayPage(page) {
        console.log("Displaying page:", page);
        const tableBody = $('#workTableData');
        tableBody.empty();

        if (data.length === 0) {
            tableBody.append('<tr><td colspan="2">No data available.</td></tr>');
            return;
        }

        const start = (page - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, data.length);
        const item = data[start];

        // Check if 'area' and 'caseinformation_grossplotarea' are equal
        const area = parseFloat(item.area);
        const grossPlotArea = parseFloat(item.caseinformation_grossplotarea);

        if (area !== grossPlotArea) {
            const message = "Gross plot area and drawn area are not equal. Please edit.";
            console.warn(message); // Logs to the console
            // Highlight the discrepancy in the table
            tableBody.append('<tr><td colspan="2" style="color:red; text-align: center;">' + message + '</td></tr>');
        }

        for (const [key, value] of Object.entries(item)) {
            if (key !== "geometry") {
                const displayValue = (key === 'area' || key === 'caseinformation_grossplotarea') ? parseFloat(value).toFixed(2) : value;
                tableBody.append(`<tr><td>${key}</td><td>${displayValue}</td></tr>`);
            }
        }

        // Add Edit Button
        const editButton = $('<button class="btn btn-primary">Edit</button>');
        if (area !== grossPlotArea) {
            // Enable Edit button
            editButton.prop('disabled', false);
        } else {
            // Disable Edit button if no discrepancy
            editButton.prop('disabled', true);
        }

        editButton.on('click', function () {
            if (area !== grossPlotArea) {
                openModal(item);
            } else {
                alert("No discrepancies found. Editing is not required.");
            }
        });

        const editRow = $('<tr></tr>').append(
            $('<td colspan="2" class="text-center"></td>').append(editButton)
        );
        tableBody.append(editRow);

        // Highlight feature on the map
        highlightFeature(item.geometry);

        // Update pagination controls
        updatePagination(page);
    }

    function updatePagination(page) {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const pagination = $('#pagination-controls');
        pagination.empty();

        // Previous Button
        const prevBtn = $('<button class="btn btn-secondary me-2">&laquo; Prev</button>');
        if (page === 1) prevBtn.prop('disabled', true);
        prevBtn.on('click', function () {
            if (page > 1) displayPage(page - 1);
        });
        pagination.append(prevBtn);

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = $(`<button class="btn btn-outline-primary me-2">${i}</button>`);
            if (i === page) pageBtn.addClass('active');
            pageBtn.on('click', function () {
                displayPage(i);
            });
            pagination.append(pageBtn);
        }

        // Next Button
        const nextBtn = $('<button class="btn btn-secondary">&raquo; Next</button>');
        if (page === totalPages) nextBtn.prop('disabled', true);
        nextBtn.on('click', function () {
            if (page < totalPages) displayPage(page + 1);
        });
        pagination.append(nextBtn);
    }


    function highlightFeature(geometry) {
        // Remove existing highlightLayer if any
        if (highlightLayer) {
            map.removeLayer(highlightLayer);
        }

        highlightLayer = L.geoJSON(geometry, {
            style: {
                color: '#FF0000',
                weight: 3
            },
            // editable: false // Make it editable
        }).addTo(window.map);

        // Store the current highlight layer globally
        window.currentHighlightLayer = highlightLayer;

        // Fit map to the highlighted feature
        window.map.fitBounds(highlightLayer.getBounds());
    }

    // Display the first page initially
    displayPage(currentPage);
}


function openModal(item) {
    const modalBody = $('#modalBody');
    modalBody.empty();

    for (const [key, value] of Object.entries(item)) {
        if (key !== "geometry") {
            // modalBody.append(`<p><strong>${key}:</strong> ${value}</p>`);
            modalBody.append(`<div class="form-group">
                <label for="${key}"><strong>${key}:</strong></label>
                <input type="text" class="form-control" id="${key}" value="${value}">
            </div>`);
        }
    }

    const infoModal = new bootstrap.Modal(document.getElementById('editFeatureModal'));
    infoModal.show();


}

let currentHighlightLayer = null;




function updateTableWithItem(item) {
    // Assuming itemsPerPage is 1, find the first row and update it
    const tableBody = $('#workTableData');
    tableBody.empty();

    const area = parseFloat(item.area);
    const grossPlotArea = parseFloat(item.caseinformation_grossplotarea);

    if (area !== grossPlotArea) {
        const message = "Gross plot area and drawn area are not equal. Please edit.";
        console.warn(message); // Logs to the console
        tableBody.append('<tr><td colspan="2" style="color: red; text-align: center;">' + message + '</td></tr>');
    }

    for (const [key, value] of Object.entries(item)) {
        if (key !== "geometry") {
            const displayValue = (key === 'area' || key === 'caseinformation_grossplotarea') ? parseFloat(value).toFixed(2) : value;
            tableBody.append(`<tr><td>${key}</td><td>${displayValue}</td></tr>`);
        }
    }

    // Add Edit Button
    const editButton = $('<button class="btn btn-primary">Edit</button>');
    if (area !== grossPlotArea) {
        // Enable Edit button
        editButton.prop('disabled', false);
    } else {
        // Disable Edit button if no discrepancy
        editButton.prop('disabled', true);
    }

    editButton.on('click', function () {
        if (area !== grossPlotArea) {
            openModal(item);
        } else {
            alert("No discrepancies found. Editing is not required.");
        }
    });

    const editRow = $('<tr></tr>').append(
        $('<td colspan="2" class="text-center"></td>').append(editButton)
    );
    tableBody.append(editRow);
}









$(document).ready(function () {


    // var geojsonData = geojsonLayer.toGeoJSON();
    // console.log(geojsonData,"lllllllllllllllllllllllllll")
    // const layer = e.layer;
    // console.log( editableLayers)
   
    $('#saveButton').click(function () {
     
        const dataToSave = {
          
            key1: 'value1',
            key2: 'value2',
        };
        saveFeature(dataToSave);
    });
});


function saveFeature(data) {
    console.log("Saving edited feature:", data);
    // alert(data)
    fetch('APIS/save-feature.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Feature saved successfully!');
            // Make sure the save button is visible again if hidden
            document.getElementById('saveButton').style.display = 'block';
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
}
