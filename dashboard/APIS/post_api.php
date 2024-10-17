<?php
// Database configuration
$host = 'iwmsgis.pmc.gov.in';  
$dbname = 'AutoDCR';
$port = 5432;
$username = 'postgres';
$password = 'pmc992101'; // Replace with your PostgreSQL password

// Create connection
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$username password=$password");

// Check connection
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . pg_last_error()]);
    exit;
}

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if token is provided
if (!isset($data['token']) || empty($data['token'])) {
    echo json_encode(["status" => "error", "message" => "Token is required."]);
    exit;
}

// Check if the token exists in the database
$checkQuery = "SELECT token FROM plot1_layouts_test WHERE token = $1";
$checkResult = pg_query_params($conn, $checkQuery, [$data['token']]);

if (pg_num_rows($checkResult) > 0) {
    // Token exists, so we update the record
    $updateQuery = "
        UPDATE plot1_layouts_test SET
            ownerinformation_firstname = $2,
            ownerinformation_middlename = $3,
            ownerinformation_lastname = $4,
            ownerinformation_address = $5,
            ownerinformation_poa = $6,
            ownerinformation_email = $7,
            ownerinformation_contactdetails = $8,
            caseinformation_applyfor = $9,
            caseinformation_projecttype = $10,
            caseinformation_casetype = $11,
            caseinformation_proposaltype = $12,
            caseinformation_locationzone = $13,
            caseinformation_tdrzone = $14,
            caseinformation_tdrarea = $15,
            caseinformation_area = $16,
            caseinformation_grossplotarea = $17,
            caseinformation_existingarea = $18,
            caseinformation_proportionateinternalroadarea = $19,
            caseinformation_premiumfsi_residential = $20,
            caseinformation_premiumfsi_commercial = $21,
            caseinformation_premiumfsi_other = $22,
            caseinformation_ancillaryareafsi = $23,
            caseinformation_totalpremiumfsi = $24,
            caseinformation_accommodationreservation = $25,
            caseinformation_typeofaccommodationreservation = $26,
            caseinformation_specialproject = $27,
            caseinformation_whetherincentive = $28,
            siteaddress_area = $29,
            siteaddress_surveyno = $30,
            siteaddress_finalplotno = $31,
            siteaddress_hissano = $32,
            siteaddress_ctsno = $33,
            siteaddress_plotno = $34,
            siteaddress_societyname = $35,
            siteaddress_pincode = $36,
            plotdetails_area = $37,
            plotdetails_areazone = $38,
            plotdetails_r7for = $39,
            plotdetails_propertytdrzone = $40,
            plotdetails_receivingtdrzone = $41,
            plotdetails_developmentzonedp = $42,
            plotabuttingdetails_plottype = $43,
            plotabuttingdetails_readyreckonervaluationofplot = $44,
            additionsinnetplotarea_roadwidening = $45,
            additionsinnetplotarea_amenity = $46,
            additionsinnetplotarea_reservation = $47,
            additionsinnetplotarea_existingroad = $48,
            additionsinnetplotarea_transformerarea = $49,
            additionsinnetplotarea_internalroad = $50,
            additionsinnetplotarea_proposedaccessroad = $51,
            additionsinnetplotarea_dproad = $52,
            additionsinnetplotarea_commonamenity = $53,
            additionsinnetplotarea_recreationalopenspace = $54,
            additionsinnetplotarea_plotinapprovedlayout = $55,
            additionsinnetplotarea_proposedslumtdrarea = $56,
            additionsinnetplotarea_amenitytdrarea = $57,
             \"BCP_No\" = $58
        WHERE token = $1;
    ";
    $updateResult = pg_query_params($conn, $updateQuery, [
        $data['token'],
        $data['ownerinformation_firstname'],
        $data['ownerinformation_middlename'],
        $data['ownerinformation_lastname'],
        $data['ownerinformation_address'],
        $data['ownerinformation_poa'],
        $data['ownerinformation_email'],
        $data['ownerinformation_contactdetails'],
        $data['caseinformation_applyfor'],
        $data['caseinformation_projecttype'],
        $data['caseinformation_casetype'],
        $data['caseinformation_proposaltype'],
        $data['caseinformation_locationzone'],
        $data['caseinformation_tdrzone'],
        $data['caseinformation_tdrarea'],
        $data['caseinformation_area'],
        $data['caseinformation_grossplotarea'],
        $data['caseinformation_existingarea'],
        $data['caseinformation_proportionateinternalroadarea'],
        $data['caseinformation_premiumfsi_residential'],
        $data['caseinformation_premiumfsi_commercial'],
        $data['caseinformation_premiumfsi_other'],
        $data['caseinformation_ancillaryareafsi'],
        $data['caseinformation_totalpremiumfsi'],
        $data['caseinformation_accommodationreservation'],
        $data['caseinformation_typeofaccommodationreservation'],
        $data['caseinformation_specialproject'],
        $data['caseinformation_whetherincentive'],
        $data['siteaddress_area'],
        $data['siteaddress_surveyno'],
        $data['siteaddress_finalplotno'],
        $data['siteaddress_hissano'],
        $data['siteaddress_ctsno'],
        $data['siteaddress_plotno'],
        $data['siteaddress_societyname'],
        $data['siteaddress_pincode'],
        $data['plotdetails_area'],
        $data['plotdetails_areazone'],
        $data['plotdetails_r7for'],
        $data['plotdetails_propertytdrzone'],
        $data['plotdetails_receivingtdrzone'],
        $data['plotdetails_developmentzonedp'],
        $data['plotabuttingdetails_plottype'],
        $data['plotabuttingdetails_readyreckonervaluationofplot'],
        $data['additionsinnetplotarea_roadwidening'],
        $data['additionsinnetplotarea_amenity'],
        $data['additionsinnetplotarea_reservation'],
        $data['additionsinnetplotarea_existingroad'],
        $data['additionsinnetplotarea_transformerarea'],
        $data['additionsinnetplotarea_internalroad'],
        $data['additionsinnetplotarea_proposedaccessroad'],
        $data['additionsinnetplotarea_dproad'],
        $data['additionsinnetplotarea_commonamenity'],
        $data['additionsinnetplotarea_recreationalopenspace'],
        $data['additionsinnetplotarea_plotinapprovedlayout'],
        $data['additionsinnetplotarea_proposedslumtdrarea'],
        $data['additionsinnetplotarea_amenitytdrarea'],
        $data['BCP_No']
    ]);

    if ($updateResult) {
        echo json_encode(["status" => "success", "message" => "Data updated successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error updating data: " . pg_last_error($conn)]);
    }
} else {
    // Token doesn't exist, so we insert a new record
    $insertQuery = "
        INSERT INTO plot1_layouts_test (
            token, ownerinformation_firstname, ownerinformation_middlename, ownerinformation_lastname, 
            ownerinformation_address, ownerinformation_poa, ownerinformation_email, ownerinformation_contactdetails,
            caseinformation_applyfor, caseinformation_projecttype, caseinformation_casetype, caseinformation_proposaltype,
            caseinformation_locationzone, caseinformation_tdrzone, caseinformation_tdrarea, caseinformation_area,
            caseinformation_grossplotarea, caseinformation_existingarea, caseinformation_proportionateinternalroadarea,
            caseinformation_premiumfsi_residential, caseinformation_premiumfsi_commercial, caseinformation_premiumfsi_other,
            caseinformation_ancillaryareafsi, caseinformation_totalpremiumfsi, caseinformation_accommodationreservation,
            caseinformation_typeofaccommodationreservation, caseinformation_specialproject, caseinformation_whetherincentive,
            siteaddress_area, siteaddress_surveyno, siteaddress_finalplotno, siteaddress_hissano, siteaddress_ctsno,
            siteaddress_plotno, siteaddress_societyname, siteaddress_pincode, plotdetails_area, plotdetails_areazone, 
            plotdetails_r7for, plotdetails_propertytdrzone, plotdetails_receivingtdrzone, plotdetails_developmentzonedp, 
            plotabuttingdetails_plottype, plotabuttingdetails_readyreckonervaluationofplot, additionsinnetplotarea_roadwidening,
            additionsinnetplotarea_amenity, additionsinnetplotarea_reservation, additionsinnetplotarea_existingroad,
            additionsinnetplotarea_transformerarea, additionsinnetplotarea_internalroad, additionsinnetplotarea_proposedaccessroad,
            additionsinnetplotarea_dproad, additionsinnetplotarea_commonamenity, additionsinnetplotarea_recreationalopenspace,
            additionsinnetplotarea_plotinapprovedlayout, additionsinnetplotarea_proposedslumtdrarea, additionsinnetplotarea_amenitytdrarea, BCP_No
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, 
            $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, 
            $49, $50, $51, $52, $53, $54, $55, $56, $57, $58
        );
    ";
    $insertResult = pg_query_params($conn, $insertQuery, [
        $data['token'],
        $data['ownerinformation_firstname'],
        $data['ownerinformation_middlename'],
        $data['ownerinformation_lastname'],
        $data['ownerinformation_address'],
        $data['ownerinformation_poa'],
        $data['ownerinformation_email'],
        $data['ownerinformation_contactdetails'],
        $data['caseinformation_applyfor'],
        $data['caseinformation_projecttype'],
        $data['caseinformation_casetype'],
        $data['caseinformation_proposaltype'],
        $data['caseinformation_locationzone'],
        $data['caseinformation_tdrzone'],
        $data['caseinformation_tdrarea'],
        $data['caseinformation_area'],
        $data['caseinformation_grossplotarea'],
        $data['caseinformation_existingarea'],
        $data['caseinformation_proportionateinternalroadarea'],
        $data['caseinformation_premiumfsi_residential'],
        $data['caseinformation_premiumfsi_commercial'],
        $data['caseinformation_premiumfsi_other'],
        $data['caseinformation_ancillaryareafsi'],
        $data['caseinformation_totalpremiumfsi'],
        $data['caseinformation_accommodationreservation'],
        $data['caseinformation_typeofaccommodationreservation'],
        $data['caseinformation_specialproject'],
        $data['caseinformation_whetherincentive'],
        $data['siteaddress_area'],
        $data['siteaddress_surveyno'],
        $data['siteaddress_finalplotno'],
        $data['siteaddress_hissano'],
        $data['siteaddress_ctsno'],
        $data['siteaddress_plotno'],
        $data['siteaddress_societyname'],
        $data['siteaddress_pincode'],
        $data['plotdetails_area'],
        $data['plotdetails_areazone'],
        $data['plotdetails_r7for'],
        $data['plotdetails_propertytdrzone'],
        $data['plotdetails_receivingtdrzone'],
        $data['plotdetails_developmentzonedp'],
        $data['plotabuttingdetails_plottype'],
        $data['plotabuttingdetails_readyreckonervaluationofplot'],
        $data['additionsinnetplotarea_roadwidening'],
        $data['additionsinnetplotarea_amenity'],
        $data['additionsinnetplotarea_reservation'],
        $data['additionsinnetplotarea_existingroad'],
        $data['additionsinnetplotarea_transformerarea'],
        $data['additionsinnetplotarea_internalroad'],
        $data['additionsinnetplotarea_proposedaccessroad'],
        $data['additionsinnetplotarea_dproad'],
        $data['additionsinnetplotarea_commonamenity'],
        $data['additionsinnetplotarea_recreationalopenspace'],
        $data['additionsinnetplotarea_plotinapprovedlayout'],
        $data['additionsinnetplotarea_proposedslumtdrarea'],
        $data['additionsinnetplotarea_amenitytdrarea'],
        $data['BCP_No']
        // Continue with the rest of the parameters...
    ]);

    if ($insertResult) {
        echo json_encode(["status" => "success", "message" => "Data inserted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error inserting data: " . pg_last_error($conn)]);
    }
}

// Close connection
pg_close($conn);
?>
