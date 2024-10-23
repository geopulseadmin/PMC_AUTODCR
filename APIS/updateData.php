<?php
require('db.php');

header('Content-Type: application/json');

try {
    // Check PDO connection
    if (!isset($pdo)) {
        throw new Exception("PDO connection not found. Please check your configuration.");
    }

    // Retrieve the raw data from the AJAX request
    $geometry = json_decode($_GET['geometry'] ?? null, true); // Decode the JSON string
    $area = $_GET['area'] ?? null;  
    $idd = $_GET['id'] ?? null;

    // Validate the input
    if (!$geometry || !$idd || !$area) {
        throw new Exception("Geometry or ID is missing.");
    }

    // Validate that the incoming geometry is an array and structured correctly
    if (!is_array($geometry) || $geometry['type'] !== 'Polygon' || !isset($geometry['coordinates']) || !is_array($geometry['coordinates'])) {
        throw new Exception("Invalid geometry format. Expected structure: {type: 'Polygon', coordinates: [[lon, lat, z], ...]}");
    }

    // Optionally strip out Z (altitude) values if not needed
    $coordinates2D = array_map(function($ring) {
        return array_map(function($coord) {
            return [$coord[0], $coord[1]];  // Strip out the Z value (altitude)
        }, $ring);
    }, $geometry['coordinates']);

    // Prepare the updated geometry with only 2D coordinates
    $geometry2D = [
        "type" => "Polygon",
        "coordinates" => $coordinates2D
    ];

    // Prepare the GeoJSON structure
    $geometryJSON = json_encode($geometry2D);  // Only 2D coordinates (lon, lat)

    // Prepare the SQL update query (use 'geom' as the column name)
    $query = "UPDATE plot1_layouts_test SET geom = ST_GeomFromGeoJSON(:geometry),  area = :area WHERE id = :id";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':geometry', $geometryJSON);
    $statement->bindParam(':area', $area); 
    $statement->bindParam(':id', $idd, PDO::PARAM_INT);

    // Debugging output: Log the query and parameters
    error_log("Executing query: $query with parameters: geometry = $geometryJSON,area = $area, id = $idd");

    // Execute the query and check if it was successful
    if ($statement->execute()) {
        echo json_encode(['success' => true, 'message' => 'Data updated successfully']);
    } else {
        throw new Exception("Failed to update data in the database.");
    }

} catch (Exception $e) {
    // Return an error response if something goes wrong
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}

// require('db.php');

// header('Content-Type: application/json');

// try {
//     // Check PDO connection
//     if (!isset($pdo)) {
//         throw new Exception("PDO connection not found. Please check your configuration.");
//     }

//     // Retrieve the raw data from the AJAX request
//     $geometry = json_decode($_GET['geometry'] ?? null, true); // Decode the JSON string
//     $idd = $_GET['id'] ?? null;

//     // Validate the input
//     if (!$geometry || !$idd) {
//         throw new Exception("Geometry or ID is missing.");
//     }

//     // Validate that the incoming geometry is an array and structured correctly
//     if (!is_array($geometry) || $geometry['type'] !== 'Polygon' || !isset($geometry['coordinates']) || !is_array($geometry['coordinates'])) {
//         throw new Exception("Invalid geometry format. Expected structure: {type: 'Polygon', coordinates: [[lon, lat, z], ...]}");
//     }

//     // Prepare the GeoJSON structure
//     $geometryJSON = json_encode($geometry); // Keep Z values and send as JSON

//     // Prepare the SQL update query (use 'geom' as the column name)
//     $query = "UPDATE plot1_layouts_test SET geom = ST_GeomFromGeoJSON(:geometry) WHERE id = :id";
//     $statement = $pdo->prepare($query);
//     $statement->bindParam(':geometry', $geometryJSON);
//     $statement->bindParam(':id', $idd, PDO::PARAM_INT);

//     // Debugging output: Log the query and parameters
//     error_log("Executing query: $query with parameters: geometry = $geometryJSON, id = $idd");

//     // Execute the query and check if it was successful
//     if ($statement->execute()) {
//         echo json_encode(['success' => true, 'message' => 'Data updated successfully']);
//     } else {
//         throw new Exception("Failed to update data in the database.");
//     }

// } catch (Exception $e) {
//     // Return an error response if something goes wrong
//     echo json_encode(['error' => true, 'message' => $e->getMessage()]);
// }
?>
