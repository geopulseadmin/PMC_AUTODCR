
var map, geojson;
const API_URL = "https://iwmsgis.pmc.gov.in/geopulse/autodcr/";
// const API_URL = "http://localhost/autodcr/";
// const API_URL = "http://localhost/geotap/autodcr/"

// Add Basemap
var map = L.map("map", {
    center: [18.52, 73.89],
    zoom: 11,
    minZoom: 12,
    maxZoom: 25,
    boxZoom: true,
    trackResize: true,
    wheelPxPerZoomLevel: 40,
    zoomAnimation: true,

});

var stamen = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
);
//   .addTo(map);
// var map = L.map("map", {}).setView([18.52, 73.895], 12, L.CRS.EPSG4326);

var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
        maxZoom: 25,
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
var baseLayers = {
    "OSM": osm,
    "Esri": Esri_WorldImagery,
    "Satellite": googleSat,
    "stamen": stamen,
};

// .addTo(map);


// for only gut showing
var Revenue_Layer1 = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Revenue_1",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        maxZoom: 25,

        opacity: 1,
    });




var Revenue_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Revenue_1",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        maxZoom: 25,

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




var PLU_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "PLU_Ward",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });


var DPRoad_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "DP_Ward_Road",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        opacity: 1,
    });

var Boundary_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "PMC_Boundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        opacity: 1,
    }).addTo(map);

var TDR_Zones = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "TDR_Zones",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        opacity: 1,
    });

var TOD_Zones = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "TOD_Zones",
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

var Monuments = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Monuments",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    });





var Village_Boundary = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Village_Boundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",

        opacity: 1,
    }).addTo(map);



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


var WMSlayers = {

    Boundary: Boundary_Layer,
    Village: Village_Boundary,
    Revenue: Revenue_Layer1,
    PLU: PLU_Layer,
    DPRoad: DPRoad_Layer,
    JE_Names: JE_Names,
    TDR_Zones: TDR_Zones,
    TOD_Zones: TOD_Zones,
    PMC_Reservation: PMC_Reservation,
    Garden: Garden,
    DevelopmentRestriction: DevelopmentRestriction,
    Yerwada_Jail: Yerwada_Jail,
    Red_Blue: Red_Blue,
    Railway_Buffer: Railway_Buffer,
    PMC_Lake: PMC_Lake,
    Monuments: Monuments,
    Aviation: aviation

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



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var control = new L.control.layers(baseLayers, WMSlayers).addTo(map);
control.setPosition('topright');

// Remove the default zoom control
map.zoomControl.remove();

L.control.zoom({
    position: 'bottomright'
}).addTo(map);


// draw-----------------------------------------------------

var drawnItems = new L.FeatureGroup().addTo(map);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    },
    draw: {
        polygon: {
            shapeOptions: {
                color: "red", // set the color for the polygon border
            },
            icon: new L.DivIcon({
                iconSize: new L.Point(6, 6), // set the size of the icon
                className: "leaflet-div-icon", // specify the icon class
            }),
        },


        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        // circlemarker:false,   
    }
});
map.addControl(drawControl);



var drawnPolygons = [];


map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    // ----------------
    // added for are showing as tooltip while drawing
    if (layer instanceof L.Polygon) {
        var area = turf.area(layer.toGeoJSON());
        var areaText = 'Area: ' + (area).toFixed(2) + ' sq m'; // area in square kilometers
        layer.bindPopup(areaText).openPopup();
    }

    // added for are showing as tooltip while drawing
    // ------------------
    var polygonId = 'polygon_' + L.stamp(layer); // Use a unique ID for each polygon

    drawnItems.addLayer(layer);
    var drawnPolygon = layer.toGeoJSON();

    if (drawnPolygon.geometry.type === 'Polygon') {
        drawnPolygons[polygonId] = drawnPolygon.geometry.coordinates;
    } else {
        // //console.log('Drawn geometry is not a valid Polygon.');
    }


    // Attach the polygonId to the layer for future reference
    layer.polygonId = polygonId;
});

map.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {

        // added for are showing as tooltip while editing
        if (layer instanceof L.Polygon) {
            var area = turf.area(layer.toGeoJSON());
            var areaText = 'Area: ' + (area).toFixed(2) + ' sq m'; // area in square kilometers
            layer.setPopupContent(areaText);
            layer.openPopup();
        }

        // added for are showing as tooltip while drawing




        var polygonId = layer.polygonId; // Retrieve the polygonId from the layer
        if (polygonId) {
            drawnPolygons[polygonId] = layer.toGeoJSON().geometry.coordinates;
        }
    });
    updateButtonState();
});


map.on('draw:deleted', function (e) {
    var layer = e.layer;
    var index = drawnPolygons.indexOf(layer);
    if (index !== -1) {
        drawnPolygons.splice(index, 1); // Remove deleted polygon from array
    }
    updateButtonState();
});





function updateButtonState() {
    var buttonElement = document.querySelector('.custom-button button');
    if (buttonElement) {
        // buttonElement.disabled = drawnPolygons.length === 0;
        buttonElement.disabled = Object.keys(drawnPolygons).length === 0;
    }
}


const handshakingCode = getQueryParam('village_name');
const token = getQueryParam('TOKEN');
// //console.log(token, "token");


$(document).ready(function () {

    const villageEntry = handshaking_codes.find(entry => entry.code === handshakingCode);
    const village_name = villageEntry ? villageEntry.name : null;
    const TpsName = villageEntry ? villageEntry.tps_name : null;



    // Fetch data from the API first
    // Extract the data from the API response
    $.ajax({
        type: "GET",
        url: "https://autodcr.pmc.gov.in/AutoDCR.PMC.Support/GISAPI/GISAPI.asmx/GetPreApprovalData",
        data: { TokenNo: token }, // Pass the token as a parameter
        success: function (data) {
            // let data = JSON.parse(apiResponse);
            console.log(data, "llllllllllll")
            // Prepare the payload for saving to the database
            let payload = {
                token: data.Token,
                village_name: data.SiteAddress[0]?.Area || '',
                gut_num: data.SiteAddress[0]?.SurveyNo || '',
                // selectedvillage: data.SiteAddress[0]?.Area || '',
                // selectedguts: data.SiteAddress[0]?.HissaNo || '',
                applyfor: data.CaseInformation?.ApplyFor || '',
                projecttype: data.CaseInformation?.ProjectType || '',
                grossplotarea: `<strong>${data.CaseInformation.GrossPlotArea.toFixed(2)}  SQM  </strong>`,
                casetype: data.CaseInformation?.CaseType || '',
                proposaltype: data.CaseInformation?.ProposalType || '',
                // locationzone: data.CaseInformation?.LocationZone || '',
                tdrzone: data.CaseInformation?.TDRZONE || '',
                // tdrarea: data.CaseInformation?.TDRArea || 0,
                // case_info_area: data.CaseInformation?.AREA || '',

                // existingarea: data.CaseInformation?.ExistingArea || 0,
                // proportionateinternalroadarea: data.CaseInformation?.ProportionateInternalRoadArea || 0,
                // premiumfsi: JSON.stringify(data.CaseInformation?.PremiumFSI || {}),
                // ancillaryareafsi: data.CaseInformation?.AncillaryAreaFSI || 0,
                // totalpremiumfsi: data.CaseInformation?.TotalPremiumFSI || 0,
                // accommodationreservation: data.CaseInformation?.AccommodationReservation || '',
                // typeofaccommodationreservation: data.CaseInformation?.TypeOfAccommodationReservation || '',
                // specialproject: data.CaseInformation?.SpecialProject || '',
                // whetherincentive: data.CaseInformation?.WhetherIncentive || '',
                // surveyno: data.SiteAddress[0]?.SurveyNo || '',
                // finalplotno: data.SiteAddress[0]?.FinalPlotNo || '',
                // hissano: data.SiteAddress[0]?.HissaNo || '',
                // ctsno: data.SiteAddress[0]?.CtsNo || '',
                // plotno: data.SiteAddress[0]?.PlotNo || '',
                // societyname: data.SiteAddress[0]?.SocietyName || '',
                // pincode: data.SiteAddress[0]?.PinCode || '',
                // plottype: data.PlotAbuttingDetails[0]?.PlotType || '',
                // readyreckonervaluationofplot: data.PlotAbuttingDetails[0]?.ReadyReckonerValuationOfPlot || 0,
                plot_det_area: data.PlotDetails[0]?.Area || '',
                // areazone: data.PlotDetails[0]?.AreaZone || '',
                // r7for: data.PlotDetails[0]?.R7for || '',
                // propertytdrzone: data.PlotDetails[0]?.PropertyTDRZone || '',
                // receivingtdrzone: data.PlotDetails[0]?.ReceivingTDRZone || '',
                developmentzonedp: data.PlotDetails[0]?.DevelopmentZoneDP || ''
            };
            console.log(payload, JSON.stringify(data))
            console.log("grossplotarea: ", data.CaseInformation.GrossPlotArea)

            displayPayloadInDiv(payload);

            function generateTableFromPayload(payload) {
                var tableHtml = '<table class="table table-bordered">';

                // Create table header
                tableHtml += '<thead><tr><th>Attribute</th><th>Value</th></tr></thead>';

                // Create table body
                tableHtml += '<tbody>';

                // Iterate over the payload object and add rows to the table
                for (var key in payload) {
                    if (payload.hasOwnProperty(key)) {
                        var value = payload[key];
                        tableHtml += '<tr><td>' + key + '</td><td>' + formatValue(value) + '</td></tr>';
                    }
                }

                tableHtml += '</tbody></table>';
                return tableHtml;
            }

            function formatValue(value) {
                // Format the value based on its type
                if (typeof value === 'object') {
                    return JSON.stringify(value, null, 2); // Convert object to JSON string
                }
                return value || 'N/A'; // Handle undefined or null values
            }


            function displayPayloadInDiv(payload) {
                var tableHtml = generateTableFromPayload(payload);
                var container = document.getElementById('tablefromautoDcr');
                container.innerHTML = tableHtml;
            }




            // Send the extracted data to savevalues.php
            // $.ajax({
            //     type: "POST",
            //     url: "APIS/savevalues.php",
            //     contentType: "application/json",
            //     data: JSON.stringify(payload),
            //     success: function (response) {
            //         if (response.status === 'success') {
            //             alert("Data saved successfully");
            //         } else if (response.status === 'error' && response.message === 'Token already exists in the database.') {
            //             alert('Token already exists. Please check the details or use a different token.');
            //         } else {
            //             console.error("Failed to save data:", response.message);
            //         }
            //     },
            //     error: function (xhr, status, error) {
            //         console.error("Failed to save data:", error);
            //     }
            // });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch data from API:", error);
        }
    });




    trials()
    function trials() {

        var villageArray = [];  // Properly declare villageArray

        if (village_name) {
            villageArray.push(village_name);
        }
        if (Array.isArray(TpsName)) {
            villageArray.push(...TpsName);  // Spread operator to add all TpsName values
        } else if (TpsName) {
            villageArray.push(TpsName);  // Add single TpsName value
        }

        // villageArray =[]
        var cqlFilter = "village_name IN('" + village_name + "') OR TPS_Name IN('" + TpsName + "')";
        // //console.log(cqlFilter, "filterr")

        var geoServerURL = "https://iwmsgis.pmc.gov.in//geoserver/AutoDCR/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue_1&propertyName=village_name&outputFormat=application/json&CQL_FILTER=" + encodeURIComponent(cqlFilter);

        $.getJSON(geoServerURL)
            .done(function (data) {
                villageArray = villageArray.sort();
                // //console.log(villageArray, "villageArray")
                var select = document.getElementById("search_type");
                villageArray.forEach(function (village) {
                    var option = document.createElement("option");
                    option.text = village?.trim();
                    option.value = village?.trim();
                    //if village_name == option value set it as selected
                    select.appendChild(option);

                });


                // $("#search_type").prop("disabled", true);

                if (village_name && select) {
                    select.value = village_name;
                    // //console.log(select.value, "pppppp")
                    var Village_name = 'village_name'
                    // let filters = `${Village_name} = '${village_name}'`;
                    var selectedValue = document.getElementById("search_type").value;
                    // //console.log("gheheheehehehheeh", selectedValue)

                    // var selectedValueVillage = village_name
                    var Village_name = 'village_name'
                    // filters = `${Village_name} = '${selectedValueVillage}'`;
                    filters = `village_name ='${selectedValue}' OR TPS_Name ='${selectedValue}'`;


                    FitbouCustomiseRevenue(filters)
                    Revenue_Layer.setParams({
                        CQL_FILTER: filters,
                        maxZoom: 19.9,
                        styles: "Highlight_polygon"
                    });

                    Revenue_Layer.addTo(map).bringToFront();

                    function getvalues(callback) {
                        if (!filters.trim()) {
                            // If filters are empty, call the callback with an empty array
                            // //console.log("No filters provided, skipping data fetch.");
                            if (callback && typeof callback === "function") {
                                callback([]);
                            }
                            return; // Exit the function early
                        }
                        var geoServerURL =
                            "https://iwmsgis.pmc.gov.in//geoserver/AutoDCR/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue_1&propertyName=Gut_No&outputFormat=application/json";

                        if (filters) {
                            geoServerURL += "&CQL_FILTER=" + encodeURIComponent(filters);
                        }

                        $.getJSON(geoServerURL, function (data) {
                            var gutvalues = new Set();

                            // Populate the Set with gut numbers
                            $.each(data.features, function (index, feature) {
                                var gutss = feature.properties.Gut_No;
                                gutvalues.add(gutss);
                            });
                            var Uniqueguts = Array.from(gutvalues);
                            Uniqueguts.sort((a, b) => {
                                if (a < b) {
                                    return -1;
                                }
                                if (a > b) {
                                    return 1;
                                }
                                return 0;
                            });
                            // //console.log(Uniqueguts, "Uniqueguts")
                            if (callback && typeof callback === "function") {
                                callback(Uniqueguts);
                            }
                        });
                    }



                    getvalues(function (Uniqueguts) {

                        var stateList = $('#stateList');
                        stateList.empty();
                        // //console.log(stateList,"stateList")
                        _.each(Uniqueguts, function (state) {
                            var listItem = $('<li><input name="' + state + '" type="checkbox"><label for="' + state + '">' + state + '</label></li>');
                            stateList.append(listItem);
                        });

                        // Events
                        $('.dropdown-container')
                            .on('click', '.dropdown-button', function () {
                                $(this).siblings('.dropdown-list').toggle();
                            })
                            .on('input', '.dropdown-search', function () {
                                var target = $(this);
                                var dropdownList = target.closest('.dropdown-list');
                                var search = target.val().toLowerCase();

                                if (!search) {
                                    dropdownList.find('li').show();
                                    return false;
                                }

                                dropdownList.find('li').each(function () {
                                    var text = $(this).text().toLowerCase();
                                    var match = text.indexOf(search) > -1;
                                    $(this).toggle(match);
                                });
                            })
                            .on('change', '[type="checkbox"]', function () {
                                var container = $(this).closest('.dropdown-container');
                                var numChecked = container.find('[type="checkbox"]:checked').length;
                                container.find('.quantity').text(numChecked || 'Any');
                            });
                    });
                }

            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
            });
    }
});


$("#search_type").change(function () {
    const villageEntry = handshaking_codes.find(entry => entry.code === handshakingCode);
    const village_name = villageEntry ? villageEntry.name : null;
    const TpsName = villageEntry ? villageEntry.tps_name : null;
    var selectedValueVillage = $(this).val();
    // //console.log(selectedValueVillage, "selectedValueVillage")
    let filters;

    // Check if selectedValueVillage exists in village_name column
    if (village_name && village_name.includes(selectedValueVillage)) {
        filters = `village_name ='${selectedValueVillage}'`;
    } else {
        // Check if selectedValueVillage exists in TPS_Name column
        if (TpsName && TpsName.includes(selectedValueVillage)) {
            filters = `TPS_Name ='${selectedValueVillage}'`;
        } else {
            // If neither column matches selectedValueVillage
            filters = `village_name ='${selectedValueVillage}' AND TPS_Name ='${selectedValueVillage}'`;
        }
    }


    FitbouCustomiseRevenue(filters)
    Revenue_Layer.setParams({
        CQL_FILTER: filters,
        maxZoom: 19.9,
        styles: "Highlight_polygon"
    });
    Revenue_Layer.addTo(map).bringToFront();




    function populateDropdown(gutValues) {
        const stateList = $('#stateList');
        stateList.empty(); // Clear previous options

        if (gutValues.length === 0) {
            stateList.append('<li>No options available</li>');
            return;
        }

        gutValues.forEach(gut => {
            stateList.append(`<li>${gut}</li>`);
        });
    }

    // Event handling for dropdown display
    $('.dropdown-button').click(function () {
        $('.dropdown-list').toggle();
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.dropdown-container').length) {
            $('.dropdown-list').hide();
        }
    });

    function getvalues(callback) {

        if (!filters.trim()) {
            // //console.log("No filters provided, skipping data fetch.");
            if (callback && typeof callback === "function") {
                callback([]);
            }
            return; // Exit the function early
        }

        var geoServerURL =
            "https://iwmsgis.pmc.gov.in//geoserver/AutoDCR/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue_1&propertyName=Gut_No&outputFormat=application/json"; if (filters) {
                geoServerURL += "&CQL_FILTER=" + encodeURIComponent(filters);
            }

        $.getJSON(geoServerURL, function (data) {
            var gutvalues = new Set();

            // Populate the Set with gut numbers
            $.each(data.features, function (index, feature) {
                var gutss = feature.properties.Gut_No;
                gutvalues.add(gutss);
            });
            var Uniqueguts = Array.from(gutvalues);

            // //console.log("Unique Gut Numbers:", Uniqueguts);

            if (callback && typeof callback === "function") {
                callback(Uniqueguts);
            }
        });
    }



    getvalues(function (Uniqueguts) {
        // //console.log(Uniqueguts, "Uniqueguts");

        var stateList = $('#stateList');
        stateList.empty();
        // //console.log(stateList,"stateList")
        _.each(Uniqueguts, function (state) {
            var listItem = $('<li><input name="' + state + '" type="checkbox"><label for="' + state + '">' + state + '</label></li>');
            stateList.append(listItem);
        });

        // Events
        $('.dropdown-container')
            .on('click', '.dropdown-button', function () {
                $(this).siblings('.dropdown-list').toggle();
            })
            .on('input', '.dropdown-search', function () {
                var target = $(this);
                var dropdownList = target.closest('.dropdown-list');
                var search = target.val().toLowerCase();

                if (!search) {
                    dropdownList.find('li').show();
                    return false;
                }

                dropdownList.find('li').each(function () {
                    var text = $(this).text().toLowerCase();
                    var match = text.indexOf(search) > -1;
                    $(this).toggle(match);
                });
            })
            .on('change', '[type="checkbox"]', function () {
                var container = $(this).closest('.dropdown-container');
                var numChecked = container.find('[type="checkbox"]:checked').length;
                container.find('.quantity').text(numChecked || 'Any');
            });


    });
    var initialCqlFilter = getSelectedValues();

})

$(document).on('change', '#stateList input[type="checkbox"]', function () {
    // //console.log("hehehe")
    getFiltersval()
    var cqlFilter = getSelectedValues();
    // //console.log(cqlFilter, "Selected filters");
    if (cqlFilter) {
        // Update the map with the new filter
        FitbouCustomiseRevenue(cqlFilter);
        Revenue_Layer1.setParams({
            CQL_FILTER: cqlFilter,
            maxZoom: 19.9,
            styles: "Highlight_polygon1"
        });
        Revenue_Layer1.addTo(map).bringToFront();
    }
    else {
        // FitbouCustomiseRevenue(cqlFilter);
        // //console.log("No filters selected");
    }
});


// Function to get the selected checkbox values and construct the CQL filter

function getFiltersval() {
    const villageEntry = handshaking_codes.find(entry => entry.code === handshakingCode);
    const selectedValueVillage = villageEntry ? villageEntry.name : null;


    //console.log(filters, "filtersjjjjjjjjjjjjjjj")
}



function getSelectedValues() {
    var selectedValues = [];

    // //console.log("pass")
    $('input[type="checkbox"]:checked').each(function () {
        var name = $(this).attr('name');
        // //console.log(name, "selecffffffffffffff")
        if (name !== undefined) {
            selectedValues.push("'" + name + "'");
        }
    });
    var cqlFilterGut = ""
    if (selectedValues.length > 0) {
        cqlFilterGut = "Gut_No IN (" + selectedValues.join(",") + ")";
    } else {
        cqlFilterGut = ""
    }
    // //console.log(cqlFilterGut, "cqlFilterGut")

    var cqlFilter = "";
    if (cqlFilterGut && filters) {
        cqlFilter = "(" + cqlFilterGut + ") AND (" + filters + ")";
    } else {
        cqlFilter = cqlFilterGut;
    }
    localStorage.setItem('cqlFilter', cqlFilter);

    return cqlFilter;
}

// Create a button element
var button = L.control({ position: 'bottomright' });

button.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'custom-button');
    div.innerHTML = '<button onclick="savevalues()">Next <img src="png/formkit_submit.png" alt="" style="width: 20px; height: 19px; vertical-align: middle;"></button>';

    return div;
};

button.addTo(map);




function FitbouCustomiseRevenue(filter) {
    layers = ["AutoDCR:Revenue_1"];
    layers.forEach(function (layerName) {
        var urlm =
            "https://iwmsgis.pmc.gov.in//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
            layerName +
            "&CQL_FILTER=" +
            filter +
            "&outputFormat=application/json";
        $.getJSON(urlm, function (data) {
            geojson = L.geoJson(data, {});

            var latitudeDegreesInput = document.querySelector('input[name="latitudeDegrees[]"]');
            var latitudeMinutesInput = document.querySelector('input[name="latitudeMinutes[]"]');
            var longitudeDegreesInput = document.querySelector('input[name="longitudeDegrees[]"]');
            var longitudeMinutesInput = document.querySelector('input[name="longitudeMinutes[]"]');


            // Update latitude input field
            latsouth = parseInt(Math.floor(geojson.getBounds()._southWest.lat))
            latnorth = parseInt(Math.floor(geojson.getBounds()._northEast.lat))
            latsouthM = parseInt(Math.floor((geojson.getBounds()._southWest.lat % 1) * 60))
            latnorthM = parseInt(Math.floor((geojson.getBounds()._northEast.lat % 1) * 60))


            // for degree upadates lattitude
            if (latsouth === latnorth) {
                // //console.log("heeee");
                // //console.log(latsouth, latnorth);
                latitudeDegreesInput.removeAttribute('readonly');
                latitudeDegreesInput.value = latsouth;
                latitudeDegreesInput.setAttribute('readonly', 'readonly');
            } else {
                latitudeDegreesInput.removeAttribute('readonly');
                latitudeDegreesInput.removeAttribute('value');
                latitudeDegreesInput.setAttribute('min', latsouth);
                latitudeDegreesInput.setAttribute('max', latnorth);
            }

            // for minutes update only latitude

            if (latsouthM === latnorthM) {
                // //console.log("heeee");
                // //console.log(latsouthM, latnorthM);
                latitudeMinutesInput.removeAttribute('readonly');
                latitudeMinutesInput.removeAttribute('value');
                latitudeMinutesInput.value = latsouthM;
                latitudeMinutesInput.setAttribute('readonly', 'readonly');
            } else {
                latitudeMinutesInput.removeAttribute('readonly');
                latitudeMinutesInput.removeAttribute('value');
                latitudeMinutesInput.setAttribute('min', latsouthM);
                latitudeMinutesInput.setAttribute('max', latnorthM);
            }

            lngsouth = parseInt(Math.floor(geojson.getBounds()._southWest.lng))
            lngnorth = parseInt(Math.floor(geojson.getBounds()._northEast.lng))
            lngsouthM = parseInt(Math.floor((geojson.getBounds()._southWest.lng % 1) * 60))
            lngnorthM = parseInt(Math.floor((geojson.getBounds()._northEast.lng % 1) * 60))
            //console.log(lngsouth, lngnorth)

            // for longitude degree update
            if (lngsouth === lngnorth) {
                // //console.log("heeee")
                // //console.log(lngsouth,lngnorth)
                longitudeDegreesInput.removeAttribute('value');
                longitudeDegreesInput.value = lngnorth;
                longitudeDegreesInput.setAttribute('readonly', 'readonly');
            } else {

                // Update longitude input field
                // //console.log("nooooooooooooooooo")
                longitudeDegreesInput.removeAttribute('readonly');
                longitudeDegreesInput.removeAttribute('value');
                longitudeDegreesInput.setAttribute('min', lngsouth);
                longitudeDegreesInput.setAttribute('max', lngnorth);
            }

            // for munites onlys longitude

            if (lngsouthM === lngnorthM) {
                // //console.log("heeee")
                // //console.log(lngsouth,lngnorth)
                longitudeMinutesInput.removeAttribute('readonly')
                longitudeMinutesInput.removeAttribute('value');
                longitudeMinutesInput.value = lngnorthM;
                longitudeMinutesInput.setAttribute('readonly', 'readonly');
            } else {

                // Update longitude input field
                // //console.log("nooooooooooooooooo")
                longitudeMinutesInput.removeAttribute('readonly');
                longitudeMinutesInput.removeAttribute('value');
                longitudeMinutesInput.setAttribute('min', lngsouthM);
                longitudeMinutesInput.setAttribute('max', lngnorthM);
            }

            map.fitBounds(geojson.getBounds());
        });
    });
}




// for uploading kml/kmz file and loading on map 
document.getElementById('fileInput').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var kmlContent = e.target.result;
        if (file.name.toLowerCase().endsWith('.kmz')) {
            JSZip.loadAsync(file).then(function (zip) {
                var kmlFound = false;
                for (var name in zip.files) {
                    if (name.toLowerCase().endsWith('.kml')) {
                        kmlFound = true;
                        zip.files[name].async('string').then(function (kmlString) {
                            processKML(kmlString);
                        });
                        break;
                    }
                }
                if (!kmlFound) {
                    alert('No valid KML file found in the KMZ archive.');
                }
            });
        } else if (file.name.toLowerCase().endsWith('.kml')) {
            processKML(kmlContent);
        } else if (file.name.toLowerCase().endsWith('.csv')) {

            processCSV(kmlContent);

        } else {
            alert('Invalid file file.');
        }
    };
    reader.readAsText(file);
});

function processKML(kmlString) {
    var layer = omnivore.kml.parse(kmlString);
    if (layer.getBounds().isValid()) {
        const keysList = Object.keys(layer._layers);
        keysList.forEach(key => {
            var polygonLayer = layer._layers[key];

            // //console.log('polygonLayer', polygonLayer);

            drawnItems.addLayer(polygonLayer);

            var polygonId = 'polygon_' + L.stamp(polygonLayer);
            drawnPolygons[polygonId] = polygonLayer.toGeoJSON().geometry.coordinates;
            // //console.log('hhhhhhhhhokkkk', polygonLayer.toGeoJSON().geometry.coordinates);

            // Attach the polygonId to the layer for future reference
            polygonLayer.polygonId = polygonId;
        });
        // layer.addTo(map);
        // var polygonId = 'polygon_kml'
        // drawnPolygons[polygonId] = layer.toGeoJSON().features[0].geometry.coordinates;
        // drawnPolygons[polygonId].enableEdit();
        // polygonLayer.polygonId = polygonId;
        //         map.fitBounds(layer.getBounds());
        //     } else {
        //         alert('Invalid KML/KMZ file.');
        //     }
        // }
        map.fitBounds(layer.getBounds());
    } else {
        alert('Invalid KML/KMZ file.');
    }
}


function processCSV(kmlContent) {
    var data = Papa.parse(kmlContent, { header: true, dynamicTyping: true }).data;
    data = data.filter(row => row.latitude !== null && row.longitude !== null);
    var polygon = L.polygon(data.map(coord => [coord.latitude, coord.longitude])).addTo(map);
    // //console.log("oooooooooooooooooo", polygon)
    if (polygon.getBounds().isValid()) {

        var polygonLayer = polygon;
        drawnItems.addLayer(polygonLayer);
        // // for saving coordinates
        // var polygonId = 'polygon_csv'
        // drawnPolygons[polygonId] = polygon.toGeoJSON().geometry.coordinates;
        // // //console.log(drawnPolygons, "drawnPolygons", "polygonCounter");

        var polygonId = 'polygon_' + L.stamp(polygon); // Use a unique ID for each polygon

        // drawnItems.addLayer(polygon);

        // Attach the polygonId to the layer for future reference
        polygon.polygonId = polygonId;

        // Save coordinates
        drawnPolygons[polygonId] = polygon.toGeoJSON().geometry.coordinates;
        // //console.log('hhhhhhhhhokkkk', polygonLayer.toGeoJSON().geometry.coordinates);

        map.fitBounds(polygon.getBounds());

    } else {
        alert('Invalid csv file.');
    }
}


// for adding coordinates manulay------------------------------------------------------------------------------------------


document.getElementById('toggleFormBtn').addEventListener('click', function () {
    var selectedVillage = document.getElementById("search_type").value;
    //console.log(selectedVillage, "selectedVillage")


    var formContainer = document.getElementById('formContainer');
    formContainer.style.display = (formContainer.style.display === 'none') ? 'block' : 'none';
});

document.getElementById('closeFormBtn').addEventListener('click', function () {

    var formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'none';
});
$('#formContainer').draggable();

// Show one row initially
var table = document.getElementById('coordinateTable');
addCoordinateRow(table);

// Event listener for adding more rows
document.getElementById('addRowBtn').addEventListener('click', function () {
    addCoordinateRow(table);
});




function updateFirstRowValues(table) {
    var firstRow = table.rows[1]; // Index 0 is the header row
    var longitudeDegreesInput = firstRow.cells[0].querySelector('input[name="longitudeDegrees[]"]');
    var longitudeMinutesInput = firstRow.cells[1].querySelector('input[name="longitudeMinutes[]"]');
    var latitudeDegreesInput = firstRow.cells[3].querySelector('input[name="latitudeDegrees[]"]');
    var latitudeMinutesInput = firstRow.cells[4].querySelector('input[name="latitudeMinutes[]"]');

    // Update the values and properties in the new row
    var newLongitudeDegreesInput = table.rows[table.rows.length - 1].cells[0].querySelector('input[name="longitudeDegrees[]"]');
    var newLongitudeMinutesInput = table.rows[table.rows.length - 1].cells[1].querySelector('input[name="longitudeMinutes[]"]');
    var newLatitudeDegreesInput = table.rows[table.rows.length - 1].cells[3].querySelector('input[name="latitudeDegrees[]"]');
    var newLatitudeMinutesInput = table.rows[table.rows.length - 1].cells[4].querySelector('input[name="latitudeMinutes[]"]');

    newLongitudeDegreesInput.value = longitudeDegreesInput.value;
    newLongitudeDegreesInput.setAttribute('min', longitudeDegreesInput.getAttribute('min'));
    newLongitudeDegreesInput.setAttribute('max', longitudeDegreesInput.getAttribute('max'));

    newLongitudeMinutesInput.value = longitudeMinutesInput.value;
    newLongitudeMinutesInput.setAttribute('min', longitudeMinutesInput.getAttribute('min'));
    newLongitudeMinutesInput.setAttribute('max', longitudeMinutesInput.getAttribute('max'));

    newLatitudeDegreesInput.value = latitudeDegreesInput.value;
    newLatitudeDegreesInput.setAttribute('min', latitudeDegreesInput.getAttribute('min'));
    newLatitudeDegreesInput.setAttribute('max', latitudeDegreesInput.getAttribute('max'));

    newLatitudeMinutesInput.value = latitudeMinutesInput.value;
    newLatitudeMinutesInput.setAttribute('min', latitudeMinutesInput.getAttribute('min'));
    newLatitudeMinutesInput.setAttribute('max', latitudeMinutesInput.getAttribute('max'));
}





function addCoordinateRow(table) {
    // var selectedVillage = document.getElementById("search_type").value;
    // //console.log(selectedVillage,"selectedVillage")
    var row = table.insertRow();
    var longitudeDegreesCell = row.insertCell();
    var longitudeMinutesCell = row.insertCell();
    var longitudeSecondsCell = row.insertCell();
    var latitudeDegreesCell = row.insertCell();
    var latitudeMinutesCell = row.insertCell();
    var latitudeSecondsCell = row.insertCell();
    var heightfloatCell = row.insertCell();
    var heightnumberCell = row.insertCell();
    var actionCell = row.insertCell();
    // degreee-----------------------------------
    var longitudeDegreesInput = document.createElement('input');
    longitudeDegreesInput.setAttribute('type', 'number');
    longitudeDegreesInput.setAttribute('placeholder', '73°');
    longitudeDegreesInput.setAttribute('name', 'longitudeDegrees[]');
    // longitudeDegreesInput.setAttribute('readonly', 'readonly'); 
    longitudeDegreesInput.value = '73';
    longitudeDegreesInput.style.width = '40px';
    longitudeDegreesInput.style.position = 'absolute';
    longitudeDegreesInput.style.left = '6%';
    // longitudeDegreesInput.style.marginRight = '5px';
    longitudeDegreesInput.style.borderBottomLeftRadius = '5px';
    longitudeDegreesInput.style.borderTopLeftRadius = '5px';
    longitudeDegreesInput.style.borderTop = '2px solid #3c3cb8';
    longitudeDegreesInput.style.borderLeft = '2px solid #3c3cb8';
    longitudeDegreesInput.style.borderBottom = '2px solid #3c3cb8';
    longitudeDegreesInput.style.borderRight = '2px solid  #bbb';



    // minutes--------------------------------------------------
    var longitudeMinutesInput = document.createElement('input');
    longitudeMinutesInput.setAttribute('type', 'number');
    longitudeMinutesInput.setAttribute('placeholder', '51′');
    longitudeMinutesInput.setAttribute('name', 'longitudeMinutes[]');
    longitudeMinutesInput.style.width = '40px';
    longitudeMinutesInput.style.position = 'absolute';
    longitudeMinutesInput.style.left = '14%';
    // longitudeMinutesInput.style.marginRight = '5px';
    longitudeMinutesInput.style.borderTop = '2px solid  #3c3cb8';
    longitudeMinutesInput.style.borderBottom = '2px solid  #3c3cb8';
    longitudeMinutesInput.style.borderLeft = '2px solid  #bbb';
    //  longitudeMinutesInput.style.borderRight = '2px solid  #bbb';


    // second--------------------------------------------------------------
    var longitudeSecondsInput = document.createElement('input');
    longitudeSecondsInput.setAttribute('type', 'number');
    longitudeSecondsInput.setAttribute('placeholder', '24.43″');
    longitudeSecondsInput.setAttribute('name', 'longitudeSeconds[]');
    longitudeSecondsInput.setAttribute('step', 'any');
    longitudeSecondsInput.style.width = '59px';
    longitudeSecondsInput.style.position = 'absolute';
    longitudeSecondsInput.style.left = '22%';
    // longitudeSecondsInput.style.marginRight = '5px'; 
    longitudeSecondsInput.style.borderTop = '2px solid  #3c3cb8';
    longitudeSecondsInput.style.borderBottom = '2px solid #3c3cb8';
    longitudeSecondsInput.style.borderRight = '2px solid #3c3cb8';
    longitudeSecondsInput.style.borderLeft = '2px solid  #bbb';
    longitudeSecondsInput.style.borderTopRightRadius = '5px';
    longitudeSecondsInput.style.borderBottomRightRadius = '5px';



    // latdegree----------------------

    var latitudeDegreesInput = document.createElement('input');
    latitudeDegreesInput.setAttribute('type', 'number');
    latitudeDegreesInput.setAttribute('placeholder', '18°');
    latitudeDegreesInput.setAttribute('name', 'latitudeDegrees[]');
    latitudeDegreesInput.setAttribute('readonly', 'readonly');
    latitudeDegreesInput.value = '18';
    latitudeDegreesInput.style.width = '50px';
    latitudeDegreesInput.style.position = 'absolute';
    latitudeDegreesInput.style.left = '38%';

    // latitudeDegreesInput.style.marginRight = '15px'; 
    latitudeDegreesInput.style.borderBottomLeftRadius = '5px';
    latitudeDegreesInput.style.borderTopLeftRadius = '5px';
    latitudeDegreesInput.style.borderTop = '2px solid #3c3cb8';
    latitudeDegreesInput.style.borderLeft = '2px solid #3c3cb8';
    latitudeDegreesInput.style.borderBottom = '2px solid #3c3cb8';
    latitudeDegreesInput.style.borderRight = '2px solid  #3c3cb8';

    // latMinute----------------------------

    var latitudeMinutesInput = document.createElement('input');
    latitudeMinutesInput.setAttribute('type', 'number');
    latitudeMinutesInput.setAttribute('placeholder', '51′');
    latitudeMinutesInput.setAttribute('name', 'latitudeMinutes[]');
    latitudeMinutesInput.style.width = '40px';
    latitudeMinutesInput.style.position = 'absolute';
    latitudeMinutesInput.style.left = '46%';
    latitudeMinutesInput.style.borderTop = '2px solid  #3c3cb8';
    latitudeMinutesInput.style.borderBottom = '2px solid  #3c3cb8';
    latitudeMinutesInput.style.borderLeft = '2px solid  #bbb';
    latitudeMinutesInput.style.borderRight = '2px solid  #3c3cb8';


    // latsecond-----------------------------------------

    var latitudeSecondsInput = document.createElement('input');
    latitudeSecondsInput.setAttribute('type', 'number');
    latitudeSecondsInput.setAttribute('placeholder', '24.43″');
    latitudeSecondsInput.setAttribute('name', 'latitudeSeconds[]');
    latitudeSecondsInput.setAttribute('step', 'any');
    latitudeSecondsInput.style.width = '60px';
    latitudeSecondsInput.style.position = 'absolute';
    latitudeSecondsInput.style.left = '53%';
    latitudeSecondsInput.style.borderTop = '2px solid  #3c3cb8';
    latitudeSecondsInput.style.borderBottom = '2px solid #3c3cb8';
    latitudeSecondsInput.style.borderRight = '2px solid #3c3cb8';
    latitudeSecondsInput.style.borderLeft = '2px solid  #bbb';
    latitudeSecondsInput.style.borderTopRightRadius = '5px';
    latitudeSecondsInput.style.borderBottomRightRadius = '5px';


    // number-----------------------------------
    var heightfloatCellInput = document.createElement('input');
    heightfloatCellInput.setAttribute('type', 'number');
    heightfloatCellInput.setAttribute('placeholder', '247.66');
    heightfloatCellInput.setAttribute('name', 'heightfloatCell[]');

    heightfloatCellInput.style.width = '70px';
    heightfloatCellInput.style.position = 'absolute';
    heightfloatCellInput.style.left = '68.900%';
    heightfloatCellInput.style.borderBottomLeftRadius = '5px';
    heightfloatCellInput.style.borderTopLeftRadius = '5px';
    heightfloatCellInput.style.borderTop = '2px solid #3c3cb8';
    heightfloatCellInput.style.borderLeft = '2px solid #3c3cb8';
    heightfloatCellInput.style.borderBottom = '2px solid #3c3cb8';
    heightfloatCellInput.style.borderRight = '2px solid  #3c3cb8';
    heightfloatCellInput.style.borderTopRightRadius = '5px';
    heightfloatCellInput.style.borderBottomRightRadius = '5px';



    // latitudeSecondsInput.style.marginRight = '5px'; 
    longitudeDegreesCell.appendChild(longitudeDegreesInput);
    longitudeMinutesCell.appendChild(longitudeMinutesInput);
    longitudeSecondsCell.appendChild(longitudeSecondsInput);
    latitudeDegreesCell.appendChild(latitudeDegreesInput);
    latitudeMinutesCell.appendChild(latitudeMinutesInput);
    latitudeSecondsCell.appendChild(latitudeSecondsInput);
    heightfloatCell.appendChild(heightfloatCellInput);



    updateFirstRowValues(table);

    actionCell.innerHTML = '<button type="button" class="deleteRowBtn"><img src="png/delete.svg" alt="Delete" style=""></button>';

    // Add event istener to delete button
    var deleteBtn = actionCell.querySelector('.deleteRowBtn');

    deleteBtn.addEventListener('click', function () {
        row.remove();
        updateFirstRowValues(table);
    });
}

document.getElementById('coordinateForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    var coordinates = [];
    // //console.log("Form submitted. Form data:", formData);
    // Process form data here
    formData.getAll('longitudeDegrees[]').forEach(function (longitudeDegrees, index) {
        var longitudeMinutes = formData.getAll('longitudeMinutes[]')[index];
        var longitudeSeconds = formData.getAll('longitudeSeconds[]')[index];
        var latitudeDegrees = formData.getAll('latitudeDegrees[]')[index];
        var latitudeMinutes = formData.getAll('latitudeMinutes[]')[index];
        var latitudeSeconds = formData.getAll('latitudeSeconds[]')[index];

        // Parse DMS strings into decimal degrees
        var parsedLongitude = parseDMS(longitudeDegrees, longitudeMinutes, longitudeSeconds);
        var parsedLatitude = parseDMS(latitudeDegrees, latitudeMinutes, latitudeSeconds);
        coordinates.push([parsedLatitude, parsedLongitude]);
    });



    markershow = [];
    // Add markers to the map
    if (coordinates.length < 4) {
        alert('Please enter at least four coordinates.');
        return;
    } else {
        // //console.log(coordinates, "coordinates")
        var polygon = L.polygon(coordinates).addTo(map);// Function to open the legend div when clicked
        function openLegend() {
            var legendDiv = document.querySelector('.info.legend');
            legendDiv.style.display = 'block';
        }
        document.querySelector('.info.legend').addEventListener('click', openLegend);
        document.addEventListener('click', function (event) {
            var legendDiv = document.querySelector('.info.legend');
            if (!legendDiv.contains(event.target)) {
                legendDiv.style.display = 'none';
            }
        });

        map.fitBounds(polygon.getBounds());

        var polygonId = 'polygon_' + L.stamp(polygon); // Use a unique ID for each polygon
        polygon.polygonId = polygonId;
        drawnPolygons[polygonId] = polygon.toGeoJSON().geometry.coordinates;
        // //console.log('888888888888', polygon.toGeoJSON().geometry.coordinates);
        var polygonLayer = polygon;
        drawnItems.addLayer(polygonLayer);

        // //console.log(drawnPolygons, "drawnPolygons", "polygonCounter");
    }
});

// Function to parse DMS format to decimal degrees
function parseDMS(degrees, minutes, seconds) {
    return parseFloat(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / 3600;
}



// for adding coordinates manulay------------------------------------------------------------------------------------------



function getSelectedValues1() {
    var selectedValues = [];
    $('input[type="checkbox"]:checked').each(function () {
        var name = $(this).attr('name');
        if (name !== undefined) {
            selectedValues.push(name);
        }
    });
    return selectedValues;
}


let filters = '';

$("#search_type").change(function () {
    var selectedValueVillage = $(this).val();
    var Village_name = 'village_name'
    var TPS_name = 'TPS_Name'
    filters = `${Village_name} = '${selectedValueVillage}' OR ${TPS_name} = '${selectedValueVillage}'`;
});

// Function to return the filters value
function getFilters() {
    return filters;
}



async function savevalues() {
    // //console.log("Drawn polygons:", drawnPolygons);

    if (Object.keys(drawnPolygons).length === 0) {
        alert("Please draw a polygon / upload KML , KMZ , CSV / Add Coordinates before proceeding.");
    } else {
        Object.keys(drawnPolygons).forEach(async function (polygonId) {
            // //console.log(polygonId, "polygonIdpolygonIdpolygonIdpolygonIdpolygonIdpolygonId")
            var coordinates = drawnPolygons[polygonId]
            // //console.log('coordinates111111', coordinates);


            var pp = turf.polygon(coordinates);

            var bbox = turf.bbox(pp); // bbox is [minX, minY, maxX, maxY]
            var bounds = L.latLngBounds([
                [bbox[1], bbox[0]], // Southwest coordinate (minY, minX)
                [bbox[3], bbox[2]]  // Northeast coordinate (maxY, maxX)
            ]);
            // //console.log('pp',pp);
            map.fitBounds(bounds);
            var layers = ["AutoDCR:Revenue_1"];

            var url = "https://iwmsgis.pmc.gov.in//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=";
            var propertyName = "village_name,TPS_Name,Gut_No,geom";
            var outputFormat = "application/json";
            var values = await IntersectAreaWithPolygon(pp, layers, url, propertyName, bounds.toBBoxString(), outputFormat);
            var cqlFilterget = getSelectedValues();
            const selected_dropdown = JSON.stringify(cqlFilterget);
            const villageName = JSON.stringify(values);
            var DrawnPolygonDetails = `Village Name: ${values[0].village_name}, Gut No: ${values[0].Gut_No}, Polygon Area: ${values[0].area.toFixed(2)} sq m`

            const selected_guts = JSON.stringify(getSelectedValues1());
            const selected_village = JSON.stringify(getFilters());


            // new added___________________________________________

            var layers2 = ["AutoDCR:TOD_Zones", "AutoDCR:TDR_Zones", "AutoDCR:JE_Names", "AutoDCR:DevelopmentRestriction", "AutoDCR:Garden",
                "AutoDCR:PMC_Reservation", "AutoDCR:Red_Blue", "AutoDCR:Yerwada_Jail", "AutoDCR:Railway_Buffer", "AutoDCR:Lake", "AutoDCR:Monuments", "AutoDCR:Aviation_data"];
            var restriction_details = await Intersection(pp, layers2, url, propertyName, bounds.toBBoxString(), outputFormat)
            //console.log(restriction_details, "restriction_details")



            // Start building the HTML table
            let htmlTable = "<table class='thin-lines'>";

            htmlTable += "<tr>";
            htmlTable += "<th>Layer Name</th>";
            htmlTable += "<th>Attribute</th>";
            htmlTable += "<th>% of Area Affected</th>";
            htmlTable += "</tr>";

            // Loop through each key in the data
            for (let key in restriction_details) {
                // Start a new row for each key
                htmlTable += "<tr>";

                // Add the key to the first column
                htmlTable += "<td>" + key + "</td>";

                // Add the first value of the key to the second column
                htmlTable += "<td>" + restriction_details[key][0][0] + "</td>";

                // Add the second value of the key to the third column
                htmlTable += "<td>" + restriction_details[key][0][1] + "</td>";

                // Close the row
                htmlTable += "</tr>";
            }

            // Close the table
            htmlTable += "</table>";

            //console.log(htmlTable);

            var restriction_detail = JSON.stringify(restriction_details)

            // code for lat and lag show in table 
            function generateCoordinatesTable(dmsCoordinates) {

                let uniqueCoordinates = [];
                let seenCoordinates = new Set();

                dmsCoordinates.forEach((coord) => {
                    let coordString = `${coord[0]}_${coord[1]}`;
                    if (!seenCoordinates.has(coordString)) {
                        uniqueCoordinates.push(coord);
                        seenCoordinates.add(coordString);
                    }
                });

                let tableHtml = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                    </tr>
                </thead>
                <tbody>
        `;

                uniqueCoordinates.forEach((coord, index) => {
                    tableHtml += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${coord[0]}</td>
                    <td>${coord[1]}</td>
                </tr>
            `;
                });

                tableHtml += `
            </tbody>
        </table>
        `;

                return tableHtml;
            }

            function showTableModal(data) {
                var modal = $('#dataPageModal');
                var table = modal.find('#popup-table tbody');

                // Clear existing rows
                table.empty();

                data.forEach(function (item) {
                    var attribute = item[0];
                    var result = item[1];
                    //console.log(item, "item")

                    if (attribute === 'Coordinates') {
                        // Generate nested table HTML for coordinates
                        var coordinatesTableHtml = generateCoordinatesTable(result);

                        // Append a row with nested table HTML
                        table.append(`
                    <tr>
                        <td>${attribute}</td>
                        <td>${coordinatesTableHtml}</td>
                    </tr>
                `);

                        //console.log(coordinatesTableHtml, "coordinatesTableHtml")
                    }
                    // else if{}
                    else {
                        // For other attributes, just append them normally
                        table.append(`
                    <tr>
                        <td>${attribute}</td>
                        <td>${result}</td>
                    </tr>
                `);
                    }

                });

                // Show the modal
                modal.modal('show');
            }


            const coordinates1 = coordinates[0].map(coord => [coord[0], coord[1]]);
            const correctedCoordinates = coordinates1.map(coord => [coord[1], coord[0]]);
            console.log(correctedCoordinates, "correctedCoordinates");
            // console.log(coordinates1,"coordinates221")
            const mapBounds = L.latLngBounds(correctedCoordinates);
            // //console.log(coordinates1,"edited")
            // This is converting decimal degrees to degree minutes and seconds
            const dmsCoordinates = coordinates1.map(coord => [convertToDMS(coord[0]), convertToDMS(coord[1])]);
            console.log(dmsCoordinates, "dmsCoordinates")

            // Create a div for the map dynamically
            var mspd = `<div id="newMap" style="height: 250px; width: 100%; margin-top: 20px; .leaflet-touch .leaflet-bar a {
                    width: 20px;
                    height: 21px;
                    line-height: 30px;
                    }"></div>`;

            // Example data for the table
            var exampleData = [
                ['\Preview map', mspd],
                ['Plot Details GIS', DrawnPolygonDetails],
                // ['Selected Village From Dropdown', selected_village],
                // ['Selected Survey Number From Dropdown', selected_guts],
                ['Coordinates', dmsCoordinates],
                ['Restrictions', htmlTable]
            ];

            // showTableModal(exampleData);

            // Initialize the map only after the modal is shown
            $('#dataPageModal').on('shown.bs.modal', function () {
                if (document.getElementById("newMap")) {
                    // Initialize the new map
                    newMap = L.map("newMap", {
                        center: [18.52, 73.89], // Default center
                        zoom: 11,
                        minZoom: 12,
                        maxZoom: 18,
                        boxZoom: true,
                        trackResize: true,
                        wheelPxPerZoomLevel: 40,
                        zoomAnimation: true,
                    });

                    var Esri_WorldImagery = L.tileLayer(
                        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        {
                            maxZoom: 18,
                        }
                    ).addTo(newMap);

                    let polygon;

                    // Function to update the polygon
                    function updatePolygon(newCoordinates) {

                        if (polygon) {
                            // Remove the old polygon
                            newMap.removeLayer(polygon);
                        }

                        // Create a new polygon
                        polygon = L.polygon(newCoordinates, {
                            color: 'blue',
                            weight: 3,
                            fillOpacity: 0.2
                        }).addTo(newMap);
                    }

                    // Example usage with correctedCoordinates
                    updatePolygon(correctedCoordinates);
                    console.log(correctedCoordinates, "newCoordinates1")
                    // Ensure the map has loaded fully before fitting to bounds
                    setTimeout(function () {
                        newMap.invalidateSize();
                        newMap.fitBounds(mapBounds);

                        console.log(correctedCoordinates, "newCoordinates1")
                        // L.polygon(correctedCoordinates, {
                        //     color: 'blue',       // Border color
                        //     weight: 3,          // Border thickness
                        //     fillOpacity: 0.2    // Transparency for the filled area
                        // }).addTo(newMap);


                    }, 500); // Increased timeout for map loading
                }
            });

            // this is for area check popup

            const token = getQueryParam('TOKEN');
            var grossplotarea = await fetchGrossPlotArea(token)
            var polygonArea = turf.area(pp);
            var tenPercemax = (grossplotarea * 1.1); // 10% of gross plot area
            var tenPercemin = (grossplotarea * 0.9);

            // if (polygonArea > tenPercemax || polygonArea < tenPercemin) {
            //     popupMessage = `The polygon area is ${polygonArea.toFixed(2)} and Grossplotarea is ${grossplotarea.toFixed(2)} \n
            //      the polygon area should not more or less than 10% of the GrossPlotArea`;
            //     showPopup(popupMessage);

            // } else {

            showTableModal(exampleData);
            // }

            // showTableModal(exampleData);

            // -------------------------
        }
        )
    }
}


// }
// for conveting degree decimals to degree minutes and seconds

///////////////////////////////////////////////


function convertToDMS(decimal) {
    const degrees = Math.floor(decimal);
    const minutes = Math.floor((decimal - degrees) * 60);
    const seconds = ((decimal - degrees - (minutes / 60)) * 3600).toFixed(2);
    return `${degrees}° ${minutes}' ${seconds}"`;
}


// for conveting degree decimals to degree minutes and seconds

///////////////////////////////////////////////


// async function submitForm() {
//     // alert("Data Saved")
//     // //console.log(drawnPolygons, "drawnPolygonslllllllllll")

//     for (const polygonId in drawnPolygons) {
//         // var polygonId= "";
//         var coordinates = drawnPolygons[polygonId];
//         // //console.log('coordinatessubmit', coordinates);
//         // //console.log(layer,"layerlayer")
//         var pp = turf.polygon(coordinates);

//         localStorage.setItem('coordinates', coordinates);

//         var bbox = turf.bbox(pp); // bbox is [minX, minY, maxX, maxY]
//         // //console.log(bbox, "bboc")
//         var bounds = L.latLngBounds([
//             [bbox[1], bbox[0]], // Southwest coordinate (minY, minX)
//             [bbox[3], bbox[2]]  // Northeast coordinate (maxY, maxX)
//         ]);
//         localStorage.setItem('bounds', bbox);
//         // //console.log(coordinates, "updateed")
//         var pp = turf.polygon(coordinates);
//         // L.geoJSON(pp).addTo(map)
//         var bounds = L.geoJSON(pp).getBounds();
//         // map.fitBounds(bounds);
//         var layers = ["AutoDCR:Revenue_1"];

//         var url = "https://iwmsgis.pmc.gov.in//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=";
//         var propertyName = "village_name,TPS_Name,Gut_No,geom";
//         var outputFormat = "application/json";
//         var values = await IntersectAreaWithPolygon(pp, layers, url, propertyName, bounds.toBBoxString(), outputFormat)
//         var cqlFilterget = getSelectedValues()
//         const selected_dropdown = JSON.stringify(cqlFilterget)
//         const villageName = JSON.stringify(values);
//         const selected_guts = JSON.stringify(getSelectedValues1());
//         const selected_village = JSON.stringify(getFilters());
//         const coordinates1 = coordinates[0].map(coord => [coord[0], coord[1]]);

//         // const dmsCoordinates = coordinates1.map(coord => [convertToDMS(coord[0]), convertToDMS(coord[1])]);
//         // //console.log(cqlFilterget, "cqlFilterget", selected_dropdown, "selected_dropdown", villageName, "villageName", selected_guts, "selected_guts", selected_village, "selected_village", "coordinate111111", coordinates1)
//         // alert("Data saved")




//         $.ajax({
//             type: "POST",
//             url: "APIS/savevalues.php",
//             contentType: "application/json",
//             data: JSON.stringify({
//                 coordinates: coordinates1,
//                 village_name: villageName,
//                 gut_num: selected_dropdown,
//                 selectedvillage: selected_village,
//                 selectedguts: selected_guts,
//                 token: token

//             }),
//             success: function (response) {

//                 // //console.log("Coordinates saved successfully", response);
//                 localStorage.setItem('lastInsertedPlotBoundaryId', response.data.id);
//                 // localStorage.setItem('coordinates',coordinates1);
//                 // //console.log("localstorage")

//                 // window.location.href = 'dashboard.html';

//                 // if(response.data.id != undefined){



//                 // }


//             },
//             error: function (xhr, status, error) {
//                 // console.error("Failed to save coordinates:", error);
//             }
//         });

//         $.ajax({
//             // url: 'https://autodcr.pmc.gov.in/AutoDCR.GISIntegration/GisExim.svc/getPlotGISDetails',

//             url: 'http://115.124.100.250/AutoDCR.Integration/GisExim.svc/getPlotGISDetails',

//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 Token: token,
//                 Parcel: {
//                     Location: [
//                         {
//                             LocationCode: handshakingCode,
//                             SurveyNo: selected_guts,
//                             PlotNo: '',
//                             CTS: '',
//                             Peth: '',
//                         },
//                     ],
//                     //blank
//                     LandUseZone: '',
//                     PlotGeoJSON: {
//                         type: 'Feature',
//                         properties: {
//                             PolygonKey: '8650',
//                             PolygonArea: '493.74',
//                             Centroid: [73.941016, 18.508117],
//                         },
//                         geometry: {
//                             type: 'Polygon',
//                             coordinates: [coordinates1],
//                         },
//                     },
//                     Buildings: [],
//                     NOCDocuments: [],
//                 },
//             }),
//             success: function (response) {
//                 //console.log('API response received:', response);
//                 if (response.Status) {
//                     // window.location.href = 'data.html';
//                     setTimeout(function () {
//                         window.close();
//                     }, 5000); // 5000 milliseconds = 5 seconds
//                 }
//             },
//             error: function (xhr, status, error) {
//                 console.error('Error calling API:', xhr.responseText);
//             },
//         });
//         // window.location.href = 'dashboard.html';
//         setTimeout(function () {
//             window.close();
//         }, 5000); // 5000 milliseconds = 5 seconds

//     };
// }



async function submitForm() {
    // alert("Data Saved")
    // console.log(drawnPolygons, "drawnPolygonslllllllllll")

    for (const polygonId in drawnPolygons) {
        // var polygonId= "";
        var coordinates = drawnPolygons[polygonId];
        console.log('coordinatessubmit', coordinates);
        // console.log(layer,"layerlayer")
        var pp = turf.polygon(coordinates);

        localStorage.setItem('coordinates', coordinates);

        var bbox = turf.bbox(pp); // bbox is [minX, minY, maxX, maxY]
        console.log(bbox, "bboc")
        var bounds = L.latLngBounds([
            [bbox[1], bbox[0]], // Southwest coordinate (minY, minX)
            [bbox[3], bbox[2]]  // Northeast coordinate (maxY, maxX)
        ]);
        localStorage.setItem('bounds', bbox);
        console.log(coordinates, "updateed")
        var pp = turf.polygon(coordinates);
        // L.geoJSON(pp).addTo(map)
        var bounds = L.geoJSON(pp).getBounds();
        // map.fitBounds(bounds);
        var layers = ["AutoDCR:Revenue_1"];

        var url = "https://iwmsgis.pmc.gov.in//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=";
        var propertyName = "village_name,TPS_Name,Gut_No,geom";
        var outputFormat = "application/json";
        var values = await IntersectAreaWithPolygon(pp, layers, url, propertyName, bounds.toBBoxString(), outputFormat)
        var cqlFilterget = getSelectedValues()
        const selected_dropdown = JSON.stringify(cqlFilterget)
        const villageName = JSON.stringify(values);



        // var values = await IntersectAreaWithPolygon(pp, layers, url, propertyName, bounds.toBBoxString(), outputFormat);
        // var cqlFilterget = getSelectedValues();
        // const selected_dropdown = JSON.stringify(cqlFilterget);
        // const villageName = JSON.stringify(values);
        // var DrawnPolygonDetails = `Village Name: ${values[0].village_name}, Gut No: ${values[0].Gut_No}, Polygon Area: ${values[0].area.toFixed(2)} sq m`



        const selected_guts = JSON.stringify(getSelectedValues1());
        const selected_village = JSON.stringify(getFilters());
        const coordinates1 = coordinates[0].map(coord => [coord[0], coord[1]]);

        // const dmsCoordinates = coordinates1.map(coord => [convertToDMS(coord[0]), convertToDMS(coord[1])]);
        console.log("coordinate111111", coordinates1)
        // alert("Data saved")


        // saving data from softttech into the database ---------------------------------------------------------------------


        $.ajax({
            type: "GET",
            url: "https://autodcr.pmc.gov.in/AutoDCR.PMC.Support/GISAPI/GISAPI.asmx/GetPreApprovalData",
            data: { TokenNo: token }, // Pass the token as a parameter
            success: function (data) {
                // let data = JSON.parse(apiResponse);
                console.log(data, "llllllllllll")


                // Creating the payload from the provided JSON data
                let payload = {
                    token: data.Token,  // From the root
                    village_name: data.SiteAddress[0]?.Area || '',  // From SiteAddress array
                    gut_num: data.SiteAddress[0]?.SurveyNo || '',  // From SiteAddress array
                    selectedvillage: data.SiteAddress[0]?.Area || '',  // From SiteAddress array
                    selectedguts: data.SiteAddress[0]?.HissaNo || '',  // From SiteAddress array
                    applyfor: data.CaseInformation?.ApplyFor || '',  // From CaseInformation
                    projecttype: data.CaseInformation?.ProjectType || '',  // From CaseInformation
                    casetype: data.CaseInformation?.CaseType || '',  // From CaseInformation
                    proposaltype: data.CaseInformation?.ProposalType || '',  // From CaseInformation
                    locationzone: data.CaseInformation?.LocationZone || '',  // From CaseInformation
                    tdrzone: data.CaseInformation?.TDRZONE || '',  // From CaseInformation
                    tdrarea: data.CaseInformation?.TDRArea || 0,  // From CaseInformation
                    case_info_area: data.CaseInformation?.AREA || '',  // From CaseInformation
                    grossplotarea: data.CaseInformation.GrossPlotArea,  // From CaseInformation
                    existingarea: data.CaseInformation?.ExistingArea || 0,  // From CaseInformation
                    proportionateinternalroadarea: data.CaseInformation?.ProportionateInternalRoadArea || 0,  // From CaseInformation
                    premiumfsi: JSON.stringify(data.CaseInformation?.PremiumFSI || {}),  // From CaseInformation
                    ancillaryareafsi: data.CaseInformation?.AncillaryAreaFSI || 0,  // From CaseInformation
                    totalpremiumfsi: data.CaseInformation?.TotalPremiumFSI || 0,  // From CaseInformation
                    accommodationreservation: data.CaseInformation?.AccommodationReservation || '',  // From CaseInformation
                    typeofaccommodationreservation: data.CaseInformation?.TypeOfAccommodationReservation || '',  // From CaseInformation
                    specialproject: data.CaseInformation?.SpecialProject || '',  // From CaseInformation
                    whetherincentive: data.CaseInformation?.WhetherIncentive || '',  // From CaseInformation
                    surveyno: data.SiteAddress[0]?.SurveyNo || '',  // From SiteAddress array
                    finalplotno: data.SiteAddress[0]?.FinalPlotNo || '',  // From SiteAddress array
                    hissano: data.SiteAddress[0]?.HissaNo || '',  // From SiteAddress array
                    ctsno: data.SiteAddress[0]?.CtsNo || '',  // From SiteAddress array
                    plotno: data.SiteAddress[0]?.PlotNo || '',  // From SiteAddress array
                    societyname: data.SiteAddress[0]?.SocietyName || '',  // From SiteAddress array
                    pincode: data.SiteAddress[0]?.PinCode || '',  // From SiteAddress array
                    plottype: data.PlotAbuttingDetails[0]?.PlotType || '',  // From PlotAbuttingDetails
                    readyreckonervaluationofplot: data.PlotAbuttingDetails[0]?.ReadyReckonerValuationOfPlot || 0,  // From PlotAbuttingDetails
                    plot_det_area: data.PlotDetails[0]?.Area || '',  // From PlotDetails
                    areazone: data.PlotDetails[0]?.AreaZone || '',  // From PlotDetails
                    r7for: data.PlotDetails[0]?.R7for || '',  // From PlotDetails
                    propertytdrzone: data.PlotDetails[0]?.PropertyTDRZone || '',  // From PlotDetails
                    receivingtdrzone: data.PlotDetails[0]?.ReceivingTDRZone || '',  // From PlotDetails
                    developmentzonedp: data.PlotDetails[0]?.DevelopmentZoneDP || '',  // From PlotDetails

                    // Adding OwnerInformation fields
                    owner_firstname: data.OwnerInformation[0]?.FirstName || '',  // From OwnerInformation
                    owner_middlename: data.OwnerInformation[0]?.MiddleName || '',  // From OwnerInformation
                    owner_lastname: data.OwnerInformation[0]?.LastName || '',  // From OwnerInformation
                    owner_address: data.OwnerInformation[0]?.Address || '',  // From OwnerInformation
                    owner_poa: data.OwnerInformation[0]?.POA || '',  // From OwnerInformation
                    owner_email: data.OwnerInformation[0]?.Email || '',  // From OwnerInformation
                    owner_contactdetails: data.OwnerInformation[0]?.ContactDetails || '',  // From OwnerInformation

                    // Adding AdditionsInNetPlotArea fields
                    road_widening: data.AdditionsInNetPlotArea[0]?.RoadWidening || '',  // From AdditionsInNetPlotArea
                    amenity: data.AdditionsInNetPlotArea[0]?.Amenity || '',  // From AdditionsInNetPlotArea
                    reservation: data.AdditionsInNetPlotArea[0]?.Reservation || '',  // From AdditionsInNetPlotArea
                    existing_road: data.AdditionsInNetPlotArea[0]?.ExistingRoad || '',  // From AdditionsInNetPlotArea
                    transformer_area: data.AdditionsInNetPlotArea[0]?.TransformerArea || '',  // From AdditionsInNetPlotArea
                    internal_road: data.AdditionsInNetPlotArea[0]?.InternalRoad || '',  // From AdditionsInNetPlotArea
                    proposed_access_road: data.AdditionsInNetPlotArea[0]?.ProposedAccessRoad || '',  // From AdditionsInNetPlotArea
                    dp_road: data.AdditionsInNetPlotArea[0]?.DP_Road || '',  // From AdditionsInNetPlotArea
                    common_amenity: data.AdditionsInNetPlotArea[0]?.CommonAmenity || '',  // From AdditionsInNetPlotArea
                    recreational_open_space: data.AdditionsInNetPlotArea[0]?.RecreationalOpenSpace || '',  // From AdditionsInNetPlotArea
                    plot_in_approved_layout: data.AdditionsInNetPlotArea[0]?.PlotInApprovedLayout || '',  // From AdditionsInNetPlotArea
                    proposed_slum_tdrarea: data.AdditionsInNetPlotArea[0]?.ProposedSlumTDRArea || '',  // From AdditionsInNetPlotArea
                    amenity_tdrarea: data.AdditionsInNetPlotArea[0]?.AmenityTDRArea || '',  // From AdditionsInNetPlotArea

                    coordinates: coordinates1, // Replace with actual coordinates if available

                    DrawnVillage_Name: values[0].village_name,
                    DrawnGutNo: values[0].Gut_No,
                    DrawnArea: values[0].area.toFixed(2)
                };



                console.log(payload, JSON.stringify(data))
                console.log("grossplotarea: ", data.CaseInformation.GrossPlotArea)

                $.ajax({
                    type: "POST",
                    url: "APIS/plotlayoutsPreapproval.php",
                    contentType: "application/json",
                    data: JSON.stringify({

                        payload

                    }),
                    success: function (response) {

                        alert("datasaved")
                        console.log(response)

                    },
                    error: function (xhr, status, error) {
                        console.error("Failed to save coordinates:", error);
                    }
                });



            },
            error: function (xhr, status, error) {
                console.error("Failed to fetch data from API:", error);
            }
        });






        // saving data from softttech into the database ---------------------------------------------------------------------





        // $.ajax({
        //     type: "POST",
        //     url: "APIS/savevalues.php",
        //     contentType: "application/json",
        //     data: JSON.stringify({
        //         coordinates: coordinates1,
        //         village_name: villageName,
        //         gut_num: selected_dropdown,
        //         selectedvillage: selected_village,
        //         selectedguts: selected_guts,
        //         token: token

        //     }),
        //     success: function (response) {

        //         // console.log("Coordinates saved successfully", response);
        //         localStorage.setItem('lastInsertedPlotBoundaryId', response.data.id);
        //         // localStorage.setItem('coordinates',coordinates1);
        //         // console.log("localstorage")

        //         window.location.href = 'dashboard.html';

        //         // if(response.data.id != undefined){


        //         // }


        //     },
        //     error: function (xhr, status, error) {
        //         console.error("Failed to save coordinates:", error);
        //     }
        // });

        $.ajax({
            // url: 'https://autodcr.pmc.gov.in/AutoDCR.GISIntegration/GisExim.svc/getPlotGISDetails',

            // url: 'http://115.124.100.250/AutoDCR.Integration/GisExim.svc/getPlotGISDetails',

            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                Token: token,
                Parcel: {
                    Location: [
                        {
                            LocationCode: handshakingCode,
                            SurveyNo: selected_guts,
                            PlotNo: '',
                            CTS: '',
                            Peth: '',
                        },
                    ],
                    //blank
                    LandUseZone: '',
                    PlotGeoJSON: {
                        type: 'Feature',
                        properties: {
                            PolygonKey: '8650',
                            PolygonArea: '493.74',
                            Centroid: [73.941016, 18.508117],
                        },
                        geometry: {
                            type: 'Polygon',
                            coordinates: [coordinates1],
                        },
                    },
                    Buildings: [],
                    NOCDocuments: [],
                },
            }),
            success: function (response) {
                console.log('API response received:', response);
                if (response.Status) {
                    // window.location.href = 'data.html';
                }
            },
            error: function (xhr, status, error) {
                console.error('Error calling API:', xhr.responseText);
            },
        });
        // window.location.href = 'dashboard.html';

    };
}


document.getElementById("getinfo").onclick = function () {
    infovalues()
};

function infovalues() {
    if (Object.keys(drawnPolygons).length === 0) {
        // alert("No coordinates drawn on map.");
        return; // Exit the function early
    }

    Object.keys(drawnPolygons).forEach(async function (polygonId) {
        var coordinates = drawnPolygons[polygonId];
        // //console.log(coordinates, "drawcoordinates")
        var pp = turf.polygon(coordinates);
        L.geoJSON(pp).addTo(map)
        var bounds = L.geoJSON(pp).getBounds();
        map.fitBounds(bounds);
        var layers2 = ["AutoDCR:Aviation_data", "AutoDCR:TOD_Zones", "AutoDCR:TDR_Zones", "AutoDCR:JE_Names"];
        var layers1 = ["AutoDCR:Aviation_data"];
        var url = "https://iwmsgis.pmc.gov.in//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=";
        var propertyName1 = "zone,distance,elevation,geom";
        var outputFormat = "application/json";
        IntersectwithASLM(pp, layers1, url, propertyName1, bounds.toBBoxString(), outputFormat)
        var restriction_details = await Intersection(pp, layers2, url, propertyName1, bounds.toBBoxString(), outputFormat)
        //console.log(restriction_details, "restriction_details")

    })
};

async function IntersectAreaWithPolygon(drawnPolygon, layers, url, propertyName, bounds, outputFormat) {
    let summaryByVillage = [];

    let requests = layers.map(function (layerName) {
        var urlm = url + layerName +
            "&propertyName=" + propertyName + "&bbox=" +
            bounds +
            "&outputFormat=" + outputFormat;
        return new Promise((resolve, reject) => {
            $.getJSON(urlm, function (data) {
                if (data && data.features && data.features.length > 0) {
                    var intersectedFeatures = [];
                    data.features.forEach(function (feature) {
                        var intersectedFeature = turf.intersect(feature, drawnPolygon);
                        if (intersectedFeature && intersectedFeature.geometry.type !== 'GeometryCollection') {
                            intersectedFeature.properties = feature.properties;
                            intersectedFeatures.push(intersectedFeature);
                        }
                    });

                    intersectedFeatures.forEach(function (feature) {
                        var properties = feature.properties;
                        var villageName = properties.village_name;
                        var area = turf.area(feature);
                        properties.area = area;
                        summaryByVillage.push(properties);
                    });
                    resolve(summaryByVillage);
                } else {
                    //console.log('No valid features found in the response.');
                    resolve([]);
                }
            }).fail(function () {
                console.error("Error fetching data for layer: " + layerName);
                reject();
            });
        });
    });

    const results = await Promise.all(requests);
    let combinedSummary = [].concat(...results);
    return combinedSummary;
}



function IntersectwithASLM(drawnPolygon, layers, url, propertyName, bounds, outputFormat) {
    var distancefromNDA = []
    var distancefromPuneairport = []
    layers.map(function (layerName) {
        var urlm = url + layerName +
            "&propertyName=" + propertyName + "&bbox=" +
            bounds +
            "&outputFormat=" + outputFormat;
        // //console.log(urlm)
        return new Promise((resolve, reject) => {
            $.getJSON(urlm, function (data) {
                if (data && data.features && data.features.length > 0) {
                    var intersectedFeatures = [];
                    data.features.forEach(function (feature) {
                        var intersectedFeature = turf.intersect(feature, drawnPolygon);
                        if (intersectedFeature && intersectedFeature.geometry.type !== 'GeometryCollection') {
                            intersectedFeature.properties = feature.properties;
                            intersectedFeatures.push(intersectedFeature);
                            var nearestPoint = turf.nearestPointOnLine(turf.polygonToLine(intersectedFeature.geometry), turf.point([73.779043, 18.472787]));
                            var distance = turf.distance(turf.point([73.779043, 18.472787]), nearestPoint, { units: 'meters' });
                            distancefromNDA.push(distance)
                            var nearestPoint = turf.nearestPointOnLine(turf.polygonToLine(intersectedFeature.geometry), turf.point([73.917901, 18.582915]));
                            var distance1 = turf.distance(turf.point([73.917901, 18.582915]), nearestPoint, { units: 'meters' });
                            distancefromPuneairport.push(distance1)

                        }
                    });
                    var intersectedLayer = L.geoJSON(intersectedFeatures, {
                        style: {
                            color: 'red',
                            weight: 2
                        }
                    });
                    // intersectedLayer.addTo(map);
                    intersectedLayer.eachLayer(function (layer) {
                        var properties = layer.feature.properties;
                        // //console.log(properties, "properties")
                        var area = turf.area(layer.feature);
                        layer.bindPopup(`Area: ${area.toFixed(2)} sq meters<br>Zone: ${JSON.stringify(properties.Aviation_Zone)} <br> Distance: ${JSON.stringify(properties.Aviation_Distance)}  <br> Elevation: ${JSON.stringify(properties.Aviation_Elevation)}<br> Distance fromNDA : ${distancefromNDA.map(d => d.toFixed(3))} Meters. <br> Distance fromPune airport : ${distancefromPuneairport.map(d => d.toFixed(3))} Meters.`);
                        layer.openPopup();
                    });
                    intersectedFeatures.forEach(function (feature) {
                        var properties = feature.properties;
                        var villageName = properties.village_name;
                        var area = turf.area(feature);
                        properties.area = area;
                        // summaryByVillage.push(properties);
                    });
                    // resolve(summaryByVillage); 
                } else {
                    //console.log('No valid features found in the response.');
                    resolve([]);
                }
            }).fail(function () {
                console.error("Error fetching data for layer: " + layerName);
                reject();
            });
        });
    });

}



// new added___________________________________________

async function Intersection(drawnPolygon, layers, url, propertyName, bounds, outputFormat) {
    var intersectvalues = {}; // Create an empty object instead of an array

    let attributes = {
        'EE_Name': 'EE_Name', 'DE_Name': 'DE_Name', 'JE_Name': 'JE_Name', 'TDR_Zone': 'TDR_Zone', 'TOD_Remark': 'TOD_Zone', 'stationnam': "MetroStationname",
        'Archelogy': "Archelogy", 'Decision': "Dp_Reservation", 'property_u': "Garden", 'Yerwada_Jail': 'Yerwada_Jail', 'flood_line': 'Red_Line_Blue_Line', 'Railway_buffer': 'Railway_Buffer', 'PMC_Lakes': 'PMC_Lake',
        'monument_n': 'Monuments', 'Aviation_Zone': 'CCZM_Zone', 'Aviation_Distance': 'CCZM_Distance', 'Aviation_Elevation': 'CCZM_Elevation'
    };
    try {
        for (let layerName of layers) {
            var urlm = url + layerName + "&&bbox=" + bounds + "&outputFormat=" + outputFormat;
            const data = await $.getJSON(urlm);
            if (data && data.features && data.features.length > 0) {
                var intersectedFeatures = [];
                data.features.forEach(function (feature) {
                    var intersectedFeature = turf.intersect(feature, drawnPolygon);
                    if (intersectedFeature && intersectedFeature.geometry.type !== 'GeometryCollection') {
                        intersectedFeature.properties = feature.properties;
                        intersectedFeatures.push(intersectedFeature);
                    }
                });
                var intersectedLayer = L.geoJSON(intersectedFeatures);

                intersectedLayer.eachLayer(function (layer) {
                    var properties = layer.feature.properties;
                    var geometry = layer.feature.geometry;

                    // Calculate area if the geometry is a polygon
                    if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
                        var area = turf.area(geometry); // Calculate area using Turf.js
                        properties['area'] = area; // Add area to the properties
                    }
                    // //console.log(properties, "HHHHHHHH");
                    let keay = Object.keys(attributes);
                    for (let ind in keay) {
                        let key = keay[ind];
                        if (properties.hasOwnProperty(key)) {
                            let value = properties[key];
                            let attributes_value = attributes[key];
                            if (!intersectvalues[attributes_value]) {
                                intersectvalues[attributes_value] = []; // Create an array for each key if it doesn't exist
                            }
                            const percent = (properties['area'] / turf.area(drawnPolygon) * 100).toFixed(0);

                            let combinedValue = [value, percent]; // Create an array with the current value and 'area' value
                            intersectvalues[attributes_value].push(combinedValue); // Push the combined array into the array
                            // //console.log(attributes_value, combinedValue, "workingsss");
                        }
                    }

                    // //console.log(properties, "HHHHHHHH");
                    // let keay = Object.keys(attributes);
                    // for (let ind in keay) {
                    //     let key = keay[ind];
                    //     if (properties.hasOwnProperty(key)) {
                    //         let value = properties[key];
                    //         value.push(properties['area'])
                    //         let attributes_value = attributes[key];
                    //         if (!intersectvalues[attributes_value]) {
                    //             intersectvalues[attributes_value] = []; // Create an array for each key if it doesn't exist
                    //         }
                    //         intersectvalues[attributes_value].push(value); // Push value into the array
                    //         //console.log(attributes_value, value, "workingsss");
                    //     //     let pp = value+"area"
                    //     // intersectvalues[pp] = properties['area'];

                    //     }

                    // }
                    // Include 'area' property in intersectvalues


                });
                // intersectedLayer.eachLayer(function (layer) {
                //     var properties = layer.feature.properties;
                //     for (let key of attributes) {
                //         if (properties.hasOwnProperty(key)) {
                //             let value = properties[key];
                //             if (!intersectvalues[key]) {
                //                 intersectvalues[key] = []; // Create an array for each key if it doesn't exist
                //             }
                //             intersectvalues[key].push(value); // Push value into the array
                //             //console.log(value, "workingsss");
                //         }
                //     }
                // });
            } else {
                //console.log('No valid features found in the response.');
            }
        }
        return intersectvalues;
    } catch (error) {
        console.error("Error in fetching restriction details:", error);
        throw error;
    }
}




// Add an event listener to the "Next" button
$('#saveToAutoDCRButton').click(function () {
    localStorage.setItem('editedCoordinates', JSON.stringify(drawnPolygons));
    // window.location.href = 'dashboard.html';
});



// Function to show modal with table
// function showTableModal(data) {
//     var modal = $('#dataPageModal');
//     var table = modal.find('#popup-table tbody');

//     table.empty();

//     data.forEach(function (row) {
//         var tr = $('<tr>');
//         row.forEach(function (cell) {
//             tr.append('<td>' + cell + '</td>');
//         });
//         table.append(tr);
//     });

//     // Show modal
//     modal.modal('show');
// }

// function showTableModal(data) {
//     // Clear the existing table content
//     $('#popup-table tbody').empty();

//     data.forEach(function (row) {
//         var rowHtml = '<tr>';
//         rowHtml += '<td>' + row[0] + '</td>';
//         rowHtml += '<td>' + row[1] + '</td>';
//         rowHtml += '</tr>';
//         $('#popup-table tbody').append(rowHtml);
//     });

//     // Show the modal
//     $('#dataPageModal').modal('show');
// }


// function showTableModal(data) {
//     var modal = $('#dataPageModal');
//     var table = modal.find('#popup-table tbody');

//     // Clear existing rows
//     table.empty();

//     data.forEach(function (item) {
//         var attribute = item[0];
//         var result = item[1];
//         //console.log(item,"item")

//         if (attribute === 'Coordinates') {
//             // Generate nested table HTML for coordinates
//             var coordinatesTableHtml = generateCoordinatesTable(result);

//             // Append a row with nested table HTML
//             table.append(`
//                 <tr>
//                     <td>${attribute}</td>
//                     <td>${coordinatesTableHtml}</td>
//                 </tr>
//             `);
//             //console.log(coordinatesTableHtml,"coordinatesTableHtml")
//         } else {
//             // For other attributes, just append them normally
//             table.append(`
//                 <tr>
//                     <td>${attribute}</td>
//                     <td>${result}</td>
//                 </tr>
//             `);
//         }
//     });

//     // Show the modal
//     modal.modal('show');
// }



// for popupedit

function showPopup(message) {
    document.getElementById('popupMessage').innerText = message;
    document.getElementById('customPopup').style.display = 'block';
}

// Function to close the popup
function closePopup() {
    document.getElementById('customPopup').style.display = 'none';
}
async function fetchGrossPlotArea(TokenNo) {
    const url = `https://autodcr.pmc.gov.in/AutoDCR.PMC.Support/GISAPI/GISAPI.asmx/GetPreApprovalData?TokenNo=${TokenNo}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming the response is in JSON format
        const data = await response.json();

        // Extract the specific value
        const grossPlotArea = data.CaseInformation.GrossPlotArea;

        // Return the extracted value
        return grossPlotArea;

    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or handle error as needed
    }
}