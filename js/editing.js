var map, geojsonLayer;

// Initialize the Leaflet map
map = L.map("map", {
    center: [18.52, 73.89],
    zoom: 11,
    minZoom: 12,
    maxZoom: 25,
    boxZoom: true,
    trackResize: true,
    wheelPxPerZoomLevel: 40,
    zoomAnimation: true,
});

// Add base layers
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
}).addTo(map);

var stamen = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
);

var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
        maxZoom: 25,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
);

var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 20,
    }
);

var baseLayers = {
    "OSM": osm,
    "Esri": Esri_WorldImagery,
    "Satellite": googleSat,
    "stamen": stamen,
};






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

L.control.layers(baseLayers).addTo(map);



// Draw Control (Will be initialized after the GeoJSON data is added)
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: null, // Placeholder, will be assigned after geojsonLayer is created
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

$(document).ready(async function () {

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var cql_filter = `id IN ('${id}')`;
    let lastDigits = id.split('.').pop();
    console.log(id, lastDigits)

    // Fetch data
    const geojsonData = await getData(cql_filter);
    const jsonh = geojsonData[0][0]
    const geojsonFeature = {
        "type": "Feature",
        "properties": jsonh,
        "geometry": jsonh.geometry
    }

    console.log(geojsonFeature)
    geojsonLayer = L.geoJSON(geojsonFeature, {
        style: {
            color: '#ff7800',
            weight: 2,
            opacity: 0.65
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

        // Zoom to the new layer after it's created
        map.fitBounds(geojsonLayer.getBounds());
    });

    // Handle editing of layers
    map.on('draw:edited', function (event) {
        var layers = event.layers;
        layers.eachLayer(function (layer) {
            var area = turf.area(layer.toGeoJSON());
            const areas = `Area:  ${(area).toFixed(2)} sq m`;
            layer.setPopupContent(areas);
            layer.openPopup();


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



    $('#saveButton').click(function () {
        console.log(geojsonLayer, "geojsonLayer")
        console.log(geojsonLayer.length,"ppppppp")
        geojsonLayer.eachLayer(function (layer) {
            var geojson = layer.toGeoJSON();
            var coordinates = geojson.geometry.coordinates;
            saveFeature(coordinates, lastDigits,jsonh.token)
        })


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



function saveFeature(geometry, id,tokenredirect) {

    const geoJSON = {
        type: 'Polygon',
        coordinates: geometry // This should be an array of coordinate arrays
    };
  

    $.ajax({
        type: "GET",
        url: "APIS/updateData.php",
        data: {
            geometry: JSON.stringify(geoJSON),
            id: id
        },
        success: function (data) {
            alert("saved", data)
            setTimeout(function() {
                window.location.href = `geometry.html?token=${tokenredirect}`;
            }, 5000);
        }

    })

}