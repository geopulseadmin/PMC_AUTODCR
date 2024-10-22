<?php
// proxyGetPreApprovalData.php
 

// get preapproval data fro drawing polygon and save whatever info comes from api
header("Access-Control-Allow-Origin: https://iwmsgis.pmc.gov.in"); // Adjust as needed
header("Content-Type: application/json");
 
if (!isset($_GET['TokenNo'])) {
    http_response_code(400);
    echo json_encode(["error" => "TokenNo parameter is missing"]);
    exit();
}
 
$tokenNo = urlencode($_GET['TokenNo']);
$apiUrl = "https://autodcr.pmc.gov.in/AutoDCR.PMC.Support/GISAPI/GISAPI.asmx/GetPreApprovalData?TokenNo={$tokenNo}";
 
// Initialize cURL
$ch = curl_init();
 
// Set cURL options
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Optional: skip SSL verification if necessary
 
// Execute cURL request
$response = curl_exec($ch);
 
// Check for errors
if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => curl_error($ch)]);
    curl_close($ch);
    exit();
}
 
// Close cURL
curl_close($ch);
 
// Output the response
echo $response;
?>
