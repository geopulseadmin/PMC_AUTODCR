<?php
// Include the database connection configuration
include 'config.php'; // Ensure the correct path to config.php

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Ensure that the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if data is properly decoded
    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid JSON data.']);
        exit;
    }

    // Sanitize and validate the data as necessary
    $geometry = $data['geometry'] ?? null;
    $area = $data['area'] ?? null;
    $token = $data['token'] ?? null;

    // Basic validation
    if (!$geometry || !$area || !$token) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        exit;
    }


    try {
        // Prepare the SQL statement without the extra comma
        $stmt = $db->prepare("UPDATE plot1_lauouts_test SET geometry = ST_GeomFromGeoJSON(:geometry), area = :area WHERE token = :token");
        $stmt->bindParam(':geometry', json_encode($geometry));
        $stmt->bindParam(':area', $area);
        $stmt->bindParam(':token', $token); // Assuming 'token' uniquely identifies the feature

        // Execute the statement and check for success
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Feature saved successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save feature.']);
        }
    } catch (PDOException $e) {
        // Handle error if saving the feature fails
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
