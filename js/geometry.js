// js/geometry.js

// Ensure the script runs after the DOM is fully loaded
$(document).ready(function () {
    // Initialize the map
    initializeMap();
    handleURLParameters();
    // $('#generatePdfBtn').on('click', printPage); // Already handled via onclick in HTML

    // Initialize Print Function
    function printPage() {
        window.print();
    }

    // Initialize Select2 (if used elsewhere)
    $('.select2').select2();
});

/**
 * Initializes the Leaflet map with specified options and layers.
 */
function initializeMap() {
    // Initialize the map
    var map = L.map("map", {
        center: [18.32, 73.44],
        zoom: 18,
        minZoom: 9,
        maxZoom: 20,
        zoomControl: false,
        scrollWheelZoom: true
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
    var baseURL = "https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms";

    var plot1_layouts_test = L.tileLayer.wms(baseURL, {
        layers: "Plot_Layout",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        opacity: 1
    });
    map.on("zoomend", function() {
        if (map.getZoom() > 17.2) {
          if (!map.hasLayer( googleSat)) {
            map.removeLayer(osm);
            map.addLayer( googleSat);
          }
        } else {
          if (!map.hasLayer(osm)) {
            map.removeLayer( googleSat  );
            map.addLayer(osm);
          }
        }
      });
   
    // Initialize Feature Group to store editable layers
    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);
    window.editableLayers = editableLayers; // Store globally for access in other functions

    // Initialize Leaflet Draw Control
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: editableLayers,
            edit: true, // Disable default edit button
            remove: true // Disable default delete button
        },
        draw: false // Disable all draw options
    });
    map.addControl(drawControl);

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

/**
 * Fetches data from WFS based on the provided filter.
 * @param {string} filter - The CQL filter to apply.
 */
function getData(filter) {
    console.log("Fetching data with filter:", filter);
    const layers = ["AutoDCR:Plot_Layout"];
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

let highlightLayer = null;

/**
 * Paginates and displays results in the table.
 * @param {Array} data - The data to display.
 */
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
            // alert(message); // Displays an alert to the user

            // Highlight the discrepancy in the table
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
        if (highlightLayer) {
            window.map.removeLayer(highlightLayer);
        }
        highlightLayer = L.geoJSON(geometry, {
            style: {
                color: '#FF0000',
                weight: 3
            }
        }).addTo(window.map);
        window.map.fitBounds(highlightLayer.getBounds());
    }

    // Display the first page initially
    displayPage(currentPage);
}

/**
 * Opens the modal with feature details and enables editing.
 * @param {Object} item - The data item to edit.
 */
function openModal(item) {
    const modalBody = $('#modalBody');
    modalBody.empty();

    for (const [key, value] of Object.entries(item)) {
        if (key !== "geometry") {
            modalBody.append(`<p><strong>${key}:</strong> ${value}</p>`);
        }
    }

    const infoModal = new bootstrap.Modal(document.getElementById('editFeatureModal'));
    infoModal.show();

    // Handle Save Changes Button
    $('#saveFeatureBtn').off('click').on('click', function () {
        // Trigger the editing mode
        enableEditing(item);
        infoModal.hide();
    });
}

let currentHighlightLayer = null;

/**
 * Highlights and prepares a feature for editing.
 * @param {Object} geometry - The GeoJSON geometry to highlight.
 */
function highlightFeature(geometry) {
    if (currentHighlightLayer) {
        window.map.removeLayer(currentHighlightLayer);
        window.editableLayers.removeLayer(currentHighlightLayer);
    }

    currentHighlightLayer = L.geoJSON(geometry, {
        style: {
            color: '#FF0000',
            weight: 3
        }
    }).addTo(window.map);

    // Add to editable layers for editing
    window.editableLayers.addLayer(currentHighlightLayer);

    window.map.fitBounds(currentHighlight_layer.getBounds());
}

/**
 * Enables editing for the highlighted feature.
 * @param {Object} item - The data item to edit.
 */
function enableEditing(item) {
    if (!currentHighlightLayer) {
        alert("No feature is highlighted for editing.");
        return;
    }

    // Enable editing using Leaflet Draw's editing capabilities
    currentHighlightLayer.editing.enable();

    // Change the style to indicate edit mode
    currentHighlightLayer.setStyle({
        color: '#0000FF',
        weight: 3,
        dashArray: '5, 5'
    });

    // Inform the user
    alert("You can now edit the geometry on the map. After editing, click 'Save Changes'.");

    // Listen for the edit event
    currentHighlightLayer.on('edit', function (e) {
        handleGeometryEdit(e, item);
    });
}

/**
 * Handles the geometry edit event.
 * @param {Object} e - The edit event.
 * @param {Object} item - The data item being edited.
 */
function handleGeometryEdit(e, item) {
    // Get the edited layer
    var layer = e.target;

    // Get the new geometry
    var newGeometry = layer.toGeoJSON().geometry;

    // Update the item's geometry
    item.geometry = newGeometry;

    // Recalculate the area using Turf.js (ensure Turf.js is included)
    var polygon = turf.polygon(newGeometry.coordinates);
    var area = turf.area(polygon); // Area in square meters

    // Update the item's area fields
    item.area = area.toFixed(2); // Rounded to 2 decimal places
    item.caseinformation_grossplotarea = area.toFixed(2); // Adjust as per your logic

    // Update the table to reflect changes
    updateTableWithItem(item);

    // Reset the style
    layer.setStyle({
        color: '#FF0000',
        weight: 3
    });

    // Disable editing
    layer.editing.disable();

    // Remove the edit event listener to prevent multiple triggers
    layer.off('edit');

    alert("Geometry and areas have been updated successfully.");

}

/**
 * Updates the table with the updated item data.
 * @param {Object} item - The updated data item.
 */
function updateTableWithItem(item) {
   
    // Assuming itemsPerPage is 1, find the first row and update it
    const tableBody = $('#workTableData');
    tableBody.empty();

    const area = parseFloat(item.area);
    const grossPlotArea = parseFloat(item.caseinformation_grossplotarea);

    if (area !== grossPlotArea) {
        const message = "Gross plot area and drawn area are not equal. Please edit.";
        console.warn(message); // Logs to the console
        // No need to alert again
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

/**
 * (Optional) Sends a WFS-T Update request to the server with the updated feature.
 * Uncomment and implement if you wish to persist changes to the server.
 * 
 * function sendWFSUpdate(item) {
 *     // Construct the WFS-T XML payload
 *     const wfsUpdate = `
 *         <wfs:Transaction service="WFS" version="1.1.0"
 *             xmlns:wfs="http://www.opengis.net/wfs"
 *             xmlns:ogc="http://www.opengis.net/ogc"
 *             xmlns:gml="http://www.opengis.net/gml"
 *             xmlns:auto="http://www.yournamespace.com/auto">
 *             <wfs:Update typeName="AutoDCR:Plot_Layout">
 *                 <wfs:Property>
 *                     <wfs:Name>the_geom</wfs:Name>
 *                     <wfs:Value>
 *                         <gml:Polygon srsName="EPSG:4326">
 *                             <gml:exterior>
 *                                 <gml:LinearRing>
 *                                     <gml:coordinates>
 *                                         ${convertGeometryToGML(item.geometry)}
 *                                     </gml:coordinates>
 *                                 </gml:LinearRing>
 *                             </gml:exterior>
 *                         </gml:Polygon>
 *                     </wfs:Value>
 *                 </wfs:Property>
 *                 <!-- Add other properties if needed -->
 *                 <ogc:Filter>
 *                     <ogc:PropertyIsEqualTo>
 *                         <ogc:PropertyName>token</ogc:PropertyName>
 *                         <ogc:Literal>${item.token}</ogc:Literal>
 *                     </ogc:PropertyIsEqualTo>
 *                 </ogc:Filter>
 *             </wfs:Update>
 *         </wfs:Transaction>
 *     `;
 *
 *     // Send the request via AJAX
 *     $.ajax({
 *         url: "https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wfs",
 *         type: "POST",
 *         dataType: "xml",
 *         data: wfsUpdate,
 *         contentType: "text/xml",
 *         success: function (response) {
 *             console.log("WFS-T Update successful:", response);
 *             alert("Feature updated successfully on the server.");
 *         },
 *         error: function (xhr, status, error) {
 *             console.error("WFS-T Update failed:", error);
 *             alert("Failed to update feature on the server.");
 *         }
 *     });
 * }
 *
 * function convertGeometryToGML(geometry) {
 *     // Simple conversion for Polygon
 *     if (geometry.type === "Polygon") {
 *         let coordinates = geometry.coordinates[0].map(coord => coord.join(" ")).join(" ");
 *         return `<gml:coordinates>${coordinates}</gml:coordinates>`;
 *     }
 *     // Handle other geometry types as needed
 *     return "";
 * }
 */

