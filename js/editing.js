$(document).ready(async function () {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var cql_filter = `id IN ('${id}')`;
    let lastDigits = id.split('.').pop();
    console.log(id, lastDigits);

    // Fetch data
    const geojsonData = await getData(cql_filter);
    const jsonh = geojsonData[0][0];
    const grossplotArea = parseFloat(jsonh.caseinformation_grossplotarea);  // Fetch grossplot area
    const geojsonFeature = {
        "type": "Feature",
        "properties": jsonh,
        "geometry": jsonh.geometry
    };

    console.log(geojsonFeature);

    // Display the data in the table
    displayTable(jsonh);

    geojsonLayer = L.geoJSON(geojsonFeature, {
        style: {
            color: 'blue',
            weight: 2,
            opacity: 0.65
        },
        onEachFeature: function (feature, layer) {
            var area = turf.area(layer.toGeoJSON());
            const areaPopup = `Area: ${(area).toFixed(2)} sq m`;
            layer.bindPopup(areaPopup);  // Bind the popup with the area information
        }
    }).addTo(map);

    if (geojsonLayer.getLayers().length) {
        map.fitBounds(geojsonLayer.getBounds());  // Adjust map to fit the geojsonLayer
    }

    // Update drawControl to reference geojsonLayer as the featureGroup
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: geojsonLayer,  // Enable editing on the existing GeoJSON layer
            remove: true
        },
        draw: {
            polygon: true,  // Enable polygon drawing
            marker: false,
            polyline: false,
            circle: false,
            rectangle: false,
            circlemarker: false
        }
    });
    map.addControl(drawControl);  // Add updated draw control with geojsonLayer

    // Handle the creation of new layers (polygons)
    map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        geojsonLayer.addLayer(layer);  // Add the new drawn layer to the existing GeoJSON layer
        console.log("New layer created:", layer.toGeoJSON());

        // Calculate the area of the newly created polygon
        var area = turf.area(layer.toGeoJSON());
        const areaPopup = `Area: ${(area).toFixed(2)} sq m`;

        // Check if the drawn area is within 10% of the gross plot area
        validateArea(area, grossplotArea);

        // Set the popup with the area information
        layer.bindPopup(areaPopup).openPopup();

        // Zoom to the new layer after it's created
        map.fitBounds(geojsonLayer.getBounds());
    });

    // Handle editing of layers
    map.on('draw:edited', function (event) {
        var layers = event.layers;
        layers.eachLayer(function (layer) {
            var area = turf.area(layer.toGeoJSON());
            const areaPopup = `Area: ${(area).toFixed(2)} sq m`;

            // Check if the drawn area is within 10% of the gross plot area
            validateArea(area, grossplotArea);

            // Update the popup content with the new area
            layer.bindPopup(areaPopup).openPopup();
        });

        // Zoom to fit edited layers
        map.fitBounds(geojsonLayer.getBounds());
    });

    // Handle deletion of layers
    map.on('draw:deleted', function (event) {
        var layers = event.layers;
        layers.eachLayer(function (layer) {
            console.log("Deleted layer: ", layer.toGeoJSON());
        });

        // Zoom to fit remaining layers after deletion
        if (geojsonLayer.getLayers().length) {
            map.fitBounds(geojsonLayer.getBounds());
        }
    });

    // Save button click handler
    $('#saveButton').click(function () {
        // console.log(geojsonLayer, "geojsonLayer");


        let allLayersValid = true;


        geojsonLayer.eachLayer(function (layer) {
            var geojson = layer.toGeoJSON();
            var coordinates = geojson.geometry.coordinates;


            var area = turf.area(geojson);
            var isValid = validateArea(area, grossplotArea);
            if (!isValid) {
                allLayersValid = false;  // If any layer is invalid, set the flag to false
            }

            // saveFeature(coordinates, lastDigits, jsonh.token);
        });
        if (allLayersValid) {
            // Proceed to save if all layers are valid
            geojsonLayer.eachLayer(function (layer) {
                var geojson = layer.toGeoJSON();
                var coordinates = geojson.geometry.coordinates;
                saveFeature(coordinates, lastDigits, jsonh.token);
            });
        } else {
            // Show an alert or prevent saving if any layer is invalid
            showAlertPopup("Cannot save: Some areas are not within the allowed 10% range of the gross plot area.");        }
    });
});

// Function to fetch data
async function getData(filter) {
    console.log("Fetching data with filter:", filter);
    const layers = ["PMC_test:plot1_layouts_test"];
    const layerDetails = ["token", "ownerinformation_firstname", "ownerinformation_address", "ownerinformation_contactdetails", "caseinformation_applyfor", "caseinformation_proposaltype", "caseinformation_tdrzone", "area", "caseinformation_area", "caseinformation_grossplotarea", "entry_timestamp"];

    const promises = layers.map(layerName => {
        const url = `https://iwmsgis.pmc.gov.in/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${encodeURIComponent(layerName)}&CQL_FILTER=${encodeURIComponent(filter)}&outputFormat=application/json`;
        console.log("WFS URL:", url);

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

    return Promise.all(promises);
}

// Function to display table data
function displayTable(data) {
    const tableBody = $('#workTableData');
    tableBody.empty();

    if (!data) {
        tableBody.append('<tr><td colspan="2">No data available.</td></tr>');
        return;
    }

    // Loop through each property of the data and append to the table
    for (const [key, value] of Object.entries(data)) {
        if (key !== "geometry") {  // Avoid showing the geometry data
            tableBody.append(`<tr><td>${key}</td><td>${value}</td></tr>`);
        }
    }
}



// Function to save the feature (geometry and id)
function saveFeature(geometry, id, tokenredirect) {
    const geoJSON = {
        type: 'Polygon',
        coordinates: geometry // This should be an array of coordinate arrays
    };
    var drawnArea = turf.area(geoJSON);
    $.ajax({
        type: "GET",
        url: "APIS/updateData.php",
        data: {
            geometry: JSON.stringify(geoJSON),
            area: drawnArea,
            id: id
        },
        success: function (data) {
            alert("saved", data);
            setTimeout(function () {
                window.location.href = `geometry.html?token=${tokenredirect}`;
            }, 5000);
        }
    });
}

// Function to validate the drawn area against the gross plot area
function validateArea(drawnArea, grossplotArea) {
    // Calculate 10% of the gross plot area
    var allowedDifference = grossplotArea * 0.10;

    // Calculate the min and max allowable areas (±10% range)
    var minAllowedArea = grossplotArea - allowedDifference;
    var maxAllowedArea = grossplotArea + allowedDifference;

    // Check if the drawn area is within the 10% range
    if (drawnArea < minAllowedArea || drawnArea > maxAllowedArea) {
        showAlertPopup(`The drawn area does not fall within the ±10% range of the provided gross plot area.`);   
             return false;
    } else {
        console.log("Validation passed: Drawn area is within 10% of the gross plot area.");
        return true;
    }
}
function showAlertPopup(message) {
    $('#alertMessage').text(message);  // Set the message in the modal body
    $('#alertModal').modal('show');    // Show the modal popup


   // Close the modal when either the OK button or close button is clicked
   $('#alertModal .btn-primary, #alertModal .close').off('click').on('click', function() {
    $('#alertModal').modal('hide'); // Hide the modal
});

}
