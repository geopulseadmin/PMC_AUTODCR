var proposaltype = {};
// Define gradient colors for each caseinformation_proposaltype
var caseinformation_proposaltypeColors = {
    "Residential": "yellow",
    "Commercial": "blue",
    "Industrial": "violet",
    "Other": "gray",
    "Resi+Comm": "orange",
    "Institutional": "pink",
    "InfoTech": "indigo",
    "Assembly": "green",
    "Others": "black" // Adding Others category
};

// Define colors for case types (new or revised)
var caseTypeColors = {
    "New": "red",
    "Revised": "#40E0D0",
    "Others": "black" // Add "Others" case type
};

// Get the legend container
var legendContainer = document.getElementById('cluster_legend');

// Loop through the proposal type colors and create the legend items (without a heading)
for (var caseinformation_proposaltype in caseinformation_proposaltypeColors) {
    if (caseinformation_proposaltypeColors.hasOwnProperty(caseinformation_proposaltype)) {
        var legendItem = document.createElement('div');
        legendItem.className = 'cluster_legend-item';
        legendItem.style.margin = "0"; // Remove margin
        legendItem.style.padding = "2px 0"; // Adjust padding

        var colorBox = document.createElement('div');
        colorBox.className = 'cluster_legend-color';
        colorBox.style.backgroundColor = caseinformation_proposaltypeColors[caseinformation_proposaltype];
        colorBox.style.width = "20px"; // Set width for uniformity
        colorBox.style.height = "20px"; // Set height for uniformity
        colorBox.style.display = "inline-block"; // Ensure alignment

        var label = document.createElement('span');
        label.textContent = caseinformation_proposaltype;
        label.style.marginLeft = "5px"; // Adjust spacing between color box and label

        legendItem.appendChild(colorBox);
        legendItem.appendChild(label);
        legendContainer.appendChild(legendItem);
    }
}

// Create a wrapper for "New," "Revised," and "Others"
var groupedCaseTypes = document.createElement('div');
groupedCaseTypes.className = 'cluster_legend-group'; // Optional: add a class for styling

// Create a heading for case types
var caseTypeHeading = document.createElement('h6');
caseTypeHeading.textContent = "Case Types"; // Set your desired heading
caseTypeHeading.style.color = "black"; // Set heading color to black
caseTypeHeading.style.fontWeight = "bold"; 
caseTypeHeading.style.marginTop = "8px"; // Add margin top of 8px
groupedCaseTypes.appendChild(caseTypeHeading);

// Loop through the case type colors and create the legend items
for (var caseType in caseTypeColors) {
    if (caseTypeColors.hasOwnProperty(caseType)) {
        var legendItem = document.createElement('div');
        legendItem.className = 'cluster_legend-item';
        legendItem.style.margin = "0"; // Remove margin
        legendItem.style.padding = "2px 0"; // Adjust padding

        var colorBox = document.createElement('div');
        colorBox.className = 'cluster_legend-color';
        colorBox.style.width = "20px";
        colorBox.style.height = "20px";
        colorBox.style.display = "inline-block";
        colorBox.style.border = "4px solid " + 
            (caseType === "New" ? "red" : caseType === "Revised" ? "darkcyan" : "black");
        colorBox.style.backgroundColor = "transparent"; // Make the background transparent

        var label = document.createElement('span');
        label.textContent = caseType;
        label.style.marginLeft = "5px"; // Adjust spacing between color box and text

        legendItem.appendChild(colorBox);
        legendItem.appendChild(label);
        groupedCaseTypes.appendChild(legendItem);
    }
}

// Append grouped case types to the legend container
legendContainer.appendChild(groupedCaseTypes);


// Function to create custom cluster icons with gradients and outline based on case type
function createClusterIcon(cluster) {
    var childCount = cluster.getChildCount();

    // Get the caseinformation_proposaltype and case_type from the first marker in the cluster
    var marker = cluster.getAllChildMarkers()[0];
    var caseinformation_proposaltype = marker.feature.properties.caseinformation_proposaltype;
    var caseinformation_casetype = marker.feature.properties.caseinformation_casetype; // Assume this property exists for case type
    
    // //console.log("Case Type:", caseinformation_casetype); // Debugging to check case type

    // Handle missing case information
    if (!caseinformation_casetype) {
        console.warn("Missing case type for proposal type:", caseinformation_proposaltype);
        caseinformation_casetype = 'Unknown'; // Use a consistent default if missing
    }

    var gradient = caseinformation_proposaltypeColors[caseinformation_proposaltype] || 'radial-gradient(65.32% 65.32% at 60% 60%, rgba(0, 0, 0, 0.10) 0%, #000000 100%)'; // Default gradient
    var borderColor = caseTypeColors[caseinformation_casetype] || "black"; // Default to black if case_type is not defined

    var size = Math.max(Math.sqrt(childCount) * 5, 20); // Ensure a minimum size of 20px

    return L.divIcon({
        html: `
            <div 
                class="bufferColor cluster-text ${['New', 'Revised'].includes(caseinformation_casetype) ? 'blinking-border' : ''}" 
                style="
                    background: ${gradient}; 
                    width: ${size}px; 
                    height: ${size}px; 
                    line-height: ${size}px; 
                    border: 5px solid var(--border-color, ${borderColor});
                    --border-color: ${borderColor};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                "
            >
                ${childCount}
            </div>
        `,
        className: 'custom-cluster-icon',
        iconSize: [size, size] // Adjust the size based on the number of markers
    });
}

// Function to load and process GeoJSON data
function loadAndProcessGeoJSON(main_url, layername, filter) {
    clearClusters();  
    const urlm = `${main_url}ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${layername}&CQL_FILTER=${filter}&outputFormat=application/json`;

    $.ajax({
        url: urlm,
        dataType: 'json',
        success: function (geojsonData) {
            if (!geojsonData.features || !Array.isArray(geojsonData.features)) {
                console.error('Invalid GeoJSON data structure:', geojsonData);
                return;
            }

            // Group features by caseinformation_proposaltype
            geojsonData.features.forEach(function (feature) {
                if (feature && feature.geometry && feature.properties && feature.properties.caseinformation_proposaltype) {
                    var caseinformation_proposaltype = feature.properties.caseinformation_proposaltype;
                    if (!proposaltype[caseinformation_proposaltype]) {
                        proposaltype[caseinformation_proposaltype] = L.markerClusterGroup({
                            iconCreateFunction: createClusterIcon
                        });
                    }

                    var processedFeatures = processFeature(feature);
                    if (processedFeatures.length) {
                        L.geoJSON(processedFeatures, {
                            pointToLayer: function (feature, latlng) {
                                var gradient = caseinformation_proposaltypeColors[feature.properties.caseinformation_proposaltype] || 
                                               'radial-gradient(65.32% 65.32% at 50% 50%, rgba(0, 0, 0, 0.10) 0%, #000000 100%)'; 
                                var caseinformation_casetype = feature.properties.caseinformation_casetype; 
                                var borderColor = caseTypeColors[caseinformation_casetype] || "black";
                            
                                // Check if the case type should have a blinking border
                                var isBlinking = (caseinformation_casetype === 'New' || caseinformation_casetype === 'Revised');
                            
                                return L.marker(latlng, {
                                    icon: L.divIcon({
                                        className: 'custom-marker-icon',
                                        html: `
                                            <div 
                                                class="${isBlinking ? 'blinking-border' : ''}" 
                                                style="
                                                    background: ${gradient}; 
                                                    width: 10px; 
                                                    height: 10px; 
                                                    border-radius: 50%; 
                                                    border: 2px solid var(--border-color, ${borderColor});
                                                    --border-color: ${borderColor};
                                                "
                                            ></div>
                                        `
                                    })
                                });
                            }
                        }).addTo(proposaltype[caseinformation_proposaltype]);
                    }
                }
            });

            // Add each caseinformation_proposaltype's marker cluster group to the map
            Object.keys(proposaltype).forEach(function (caseinformation_proposaltype) {
                map.addLayer(proposaltype[caseinformation_proposaltype]);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error loading GeoJSON:', textStatus, errorThrown);
        }
    });
}

// Function to process feature geometries
function processFeature(feature) {
    switch (feature.geometry.type) {
        case 'Polygon':
        case 'MultiPolygon':
            var centroid = turf.centroid(feature);
            return [{
                type: 'Feature',
                geometry: centroid.geometry,
                properties: feature.properties
            }];
        case 'Point':
            return [feature];
        case 'MultiPoint':
            return feature.geometry.coordinates.map(function (coords) {
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: coords
                    },
                    properties: feature.properties
                };
            });
        default:
            console.warn('Unsupported geometry type:', feature.geometry.type);
            return [];
    }
}

// Function to clear clusters
function clearClusters() {
    Object.keys(proposaltype).forEach(function (caseinformation_proposaltype) {
        map.removeLayer(proposaltype[caseinformation_proposaltype]);
        proposaltype[caseinformation_proposaltype].clearLayers();
    });
    proposaltype = {}; // Reset the proposaltype object
}


//     // --------------------------------------------------------

    // status wise filter js

    //click on status-wise open the summary section 
    document.getElementById('status-wise-button').addEventListener('click', function() {
    document.querySelector('.summary-section').style.display = 'block';
    document.querySelector('.north-arrow-container').classList.add('move-up');
    document.querySelector('.leaflet-top.leaflet-left .leaflet-bar').classList.add('move-up');
    document.querySelector('.leaflet-control-scale').classList.add('move-up');
    document.querySelector('.container-fluid').classList.add('summary-section-open');
    document.querySelector('.geopulseaname').classList.add('move-up'); // Add class for moving up

    this.classList.toggle('btn-active');
    });

    document.getElementById('closeButton').addEventListener('click', function() {
    document.querySelector('.summary-section').style.display = 'none';
    document.querySelector('.north-arrow-container').classList.remove('move-up');
    document.querySelector('.leaflet-top.leaflet-left .leaflet-bar').classList.remove('move-up');
    document.querySelector('.leaflet-control-scale').classList.remove('move-up');
    document.querySelector('.container-fluid').classList.remove('summary-section-open');
    document.querySelector('.geopulseaname').classList.remove('move-up'); // Remove class for reverting position

    const statusButton = document.getElementById('status-wise-button');
    statusButton.classList.remove('btn-active');
    statusButton.classList.add('btn-blue');
    });

    
            
    document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const slider = document.querySelector('.slider');
    const sliderItems = document.querySelectorAll('.slider-item');
    const totalItems = sliderItems.length;
    let currentIndex = 0;

    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalItems - 0) {
            currentIndex++;
            updateSlider();
        }
    });
    });


    // calender
    document.getElementById('calendar-icon').addEventListener('click', function() {
    // Check if the calendar is already open
    let calendarElement = document.querySelector('.flatpickr-calendar');
    if (calendarElement) {
        calendarElement.remove(); // Remove the calendar
        return;
    }

    // Create a calendar container
    let calendarContainer = document.createElement('div');
    calendarContainer.id = 'calendar-container'; // Add ID for styling if needed
    document.getElementById('date-range-display').appendChild(calendarContainer);

    // Initialize flatpickr
    flatpickr(calendarContainer, {
        mode: "range",
        inline: true,
        defaultDate: ["2024-04-01", "2025-03-31"],
        onClose: function(selectedDates, dateStr, instance) {
            // Format and display the selected date range
            let formattedDates = selectedDates.map(function(date) {
                return formatDate(date);
            }).join(' to '); // Join dates if range selected
            document.getElementById('date-range-display').innerText = formattedDates;
        },
        onReady: function(selectedDates, dateStr, instance) {
            // Add custom buttons
            let calendarFooter = document.createElement('div');
            calendarFooter.className = 'flatpickr-custom-buttons';
            calendarFooter.innerHTML = `
                <button id="apply-button" class="flatpickr-button">Cancel</button>
                <button id="cancel-button" class="flatpickr-button">Choose Date</button>
            `;
            document.querySelector('.flatpickr-calendar').appendChild(calendarFooter);

            // Add event listeners to the buttons
            document.getElementById('apply-button').addEventListener('click', function() {
                instance.close(); // Close the calendar on apply
            });

            document.getElementById('cancel-button').addEventListener('click', function() {
                calendarContainer.remove(); // Close and remove the calendar on cancel
            });

            updateWeekdayLabels(); // Update labels after the calendar is ready

            // Custom function to update weekday labels
            function updateWeekdayLabels() {
                let weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
                let weekdayElements = document.querySelectorAll('.flatpickr-weekday');
                weekdayElements.forEach((element, index) => {
                    if (element.textContent.trim() !== '') {
                        element.textContent = weekdays[index];
                    }
                });
            }
        }
    });
    });

    // Close the calendar when the mouse moves over the map
    map.on('mousemove', function() {
    let calendarElement = document.querySelector('.flatpickr-calendar');
    if (calendarElement) {
        calendarElement.remove(); // Remove only the calendar, keep the icon
    }
    });

    // Function to format the date in "May 1, 2025" format
    function formatDate(date) {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
    }

    
    // Function to toggle the visibility of the search input
    function toggleSearchInput() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('searchInputDashboard');
    const searchIcon = document.getElementById('search-icon');
    const closeIcon = document.getElementById('close-icon');

    // Toggle the full-width class on the button
    searchButton.classList.toggle('full-width');

    // Toggle the visibility of the search input field and icons
    if (searchButton.classList.contains('full-width')) {
        searchInput.style.display = 'block';
        searchIcon.style.display = 'none';
        closeIcon.style.display = 'inline';
        searchInput.focus();
    } else {
        searchInput.style.display = 'none';
        searchIcon.style.display = 'inline';
        closeIcon.style.display = 'none';
    }
    }

    // Function to handle closing the search input when clicking outside of it
    function handleClickOutside(event) {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('searchInputDashboard');
    const searchIcon = document.getElementById('search-icon');
    const closeIcon = document.getElementById('close-icon');

    // Check if the click is outside the search button and input
    if (!searchButton.contains(event.target) && !searchInput.contains(event.target) && !closeIcon.contains(event.target)) {
        // Close search input if it's visible
        if (searchButton.classList.contains('full-width')) {
            searchButton.classList.remove('full-width');
            searchInput.style.display = 'none';
            searchIcon.style.display = 'inline';
            closeIcon.style.display = 'none';
        }
    }
    }

    // Function to handle showing the search input when clicking the search icon
    function handleSearchIconClick() {
    toggleSearchInput();
    }

    // Function to handle showing the cross icon when typing in the search input
    function handleSearchInput() {
    const searchInput = document.getElementById('searchInputDashboard');
    const closeIcon = document.getElementById('close-icon');

    // Show or hide the close icon based on input value
    closeIcon.style.display = searchInput.value.length > 0 ? 'inline' : 'none';
    }

    // Function to clear the search input
    function clearSearchInput() {
    const searchInput = document.getElementById('searchInputDashboard');
    const closeIcon = document.getElementById('close-icon');

    // Clear the input field and hide the close icon
    searchInput.value = '';
    closeIcon.style.display = 'none';
    }

    // Add event listeners
    document.addEventListener('click', handleClickOutside);
    document.getElementById('search-icon').addEventListener('click', handleSearchIconClick);
    document.getElementById('searchInputDashboard').addEventListener('input', handleSearchInput);
    document.getElementById('close-icon').addEventListener('click', clearSearchInput);



    // Ensure the DOM is fully loaded before adding the event listener Printbutton
    document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('printButton').addEventListener('click', function () {
        window.print();
    });
    });

    //excle

    document.getElementById('excelButton').addEventListener('click', function() {
    // Define the URL of the Excel file
    var excelFileUrl = 'path/to/yourfile.xlsx';
    
    // Create a temporary link element
    var link = document.createElement('a');
    link.href = excelFileUrl;
    link.download = 'filename.xlsx'; // Optional: specify the filename
    
    // Append the link to the body (it has to be part of the document to work)
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Remove the link from the document
    document.body.removeChild(link);
    });



    // Add scale control
    L.control.scale({
    position: 'bottomleft' // Change position to bottom right
    }).addTo(map);

