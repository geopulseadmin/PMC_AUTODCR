<?php

// Database configuration
$host = 'iwmsgis.pmc.gov.in';
$dbname = 'AutoDCR';
$port = 5432;
$username = 'postgres';
$password = 'pmc992101';

// Establishing the connection
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$username password=$password");

// Check if the connection was successful
if (!$conn) {
    die(json_encode(["status" => "error", "message" => "Error in connection: " . pg_last_error()]));
}

// Read input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check if the payload is valid
if ($data && isset($data['payload'])) {
    $payload = $data['payload'];
    // Extract the necessary fields from the payload
    $token = $payload['token'] ?? '';

    // Owner Information
    $owner_firstname = $payload['owner_firstname'] ?? '';
    $owner_middlename = $payload['owner_middlename'] ?? '';
    $owner_lastname = $payload['owner_lastname'] ?? '';
    $owner_address = $payload['owner_address'] ?? '';
    $owner_poa = $payload['owner_poa'] ?? '';
    $owner_email = $payload['owner_email'] ?? '';
    $owner_contactdetails = $payload['owner_contactdetails'] ?? '';

    // Case Information
    $case_applyfor = $payload['applyfor'] ?? '';
    $case_projecttype = $payload['projecttype'] ?? '';
    $case_casetype = $payload['casetype'] ?? '';
    $case_proposaltype = $payload['proposaltype'] ?? '';
    $case_locationzone = $payload['locationzone'] ?? '';
    $case_tdrzone = $payload['tdrzone'] ?? '';
    $case_tdrarea = $payload['tdrarea'] ?? 0.0;
    $case_area = $payload['case_info_area'] ?? '';
    $case_grossplotarea = $payload['grossplotarea'] ?? 0.0;
    $case_existingarea = $payload['existingarea'] ?? 0.0;
    $case_proportionateinternalroadarea = $payload['proportionateinternalroadarea'] ?? 0.0;
    $case_premiumfsi_residential = $payload['premiumfsi']['Residential'] ?? 0.0;
    $case_premiumfsi_commercial = $payload['premiumfsi']['Commercial'] ?? 0.0;
    $case_premiumfsi_other = $payload['premiumfsi']['Other'] ?? 0.0;
    $case_ancillaryareafsi = $payload['ancillaryareafsi'] ?? 0.0;
    $case_totalpremiumfsi = $payload['totalpremiumfsi'] ?? 0.0;
    $case_accommodationreservation = $payload['accommodationreservation'] ?? '';
    $case_typeofaccommodationreservation = $payload['typeofaccommodationreservation'] ?? '';
    $case_specialproject = $payload['specialproject'] ?? '';
    $case_whetherincentive = $payload['whetherincentive'] ?? '';

    // Site Address
    $site_area = $payload['village_name'] ?? '';
    $site_surveyno = $payload['surveyno'] ?? '';
    $site_finalplotno = $payload['finalplotno'] ?? '';
    $site_hissano = $payload['hissano'] ?? '';
    $site_ctsno = $payload['ctsno'] ?? '';
    $site_plotno = $payload['plotno'] ?? '';
    $site_societyname = $payload['societyname'] ?? '';
    $site_pincode = $payload['pincode'] ?? '';

    // Plot Details
    $plot_area = $payload['plot_det_area'] ?? '';
    $plot_areazone = $payload['areazone'] ?? '';
    $plot_r7for = $payload['r7for'] ?? '';
    $plot_propertytdrzone = $payload['propertytdrzone'] ?? '';
    $plot_receivingtdrzone = $payload['receivingtdrzone'] ?? '';
    $plot_developmentzonedp = $payload['developmentzonedp'] ?? '';

    // Plot Abutting Details
    $plot_plottype = $payload['plottype'] ?? '';
    $plot_readyreckonervaluationofplot = $payload['readyreckonervaluationofplot'] ?? 0.0;

    // Additions In Net Plot Area
    $addition_roadwidening = $payload['road_widening'] ?? '';
    $addition_amenity = $payload['amenity'] ?? '';
    $addition_reservation = $payload['reservation'] ?? '';
    $addition_existingroad = $payload['existing_road'] ?? '';
    $addition_transformerarea = $payload['transformer_area'] ?? '';
    $addition_internalroad = $payload['internal_road'] ?? '';
    $addition_proposedaccessroad = $payload['proposed_access_road'] ?? '';
    $addition_dproad = $payload['dp_road'] ?? '';
    $addition_commonamenity = $payload['common_amenity'] ?? '';
    $addition_recreationalopenspace = $payload['recreational_open_space'] ?? '';
    $addition_plotinapprovedlayout = $payload['plot_in_approved_layout'] ?? '';
    $addition_proposedslumtdrarea = $payload['proposed_slum_tdrarea'] ?? '';
    $addition_amenitytdrarea = $payload['amenity_tdrarea'] ?? '';

    // drawn 
    $DrawnVillage_Name = $payload['DrawnVillage_Name'] ?? '';
    $DrawnGutNo = $payload['DrawnGutNo'] ?? '';
    $DrawnArea = $payload['DrawnArea'] ?? '';

    // Polygon Coordinates
    $coordinates = $payload['coordinates'] ?? [];

    // Convert coordinates to WKT format
    if ($coordinates === null) {
        throw new Exception("Geometry (coordinates) data is missing.");
    }

    $geoJSON = [
        'type' => 'Polygon',
        'coordinates' => [$coordinates], 
    ];
    $geometryJSON = json_encode($geoJSON);

    // Debug WKT Polygon
    // echo "WKT Polygon: " . $wkt_polygon . "\n";

    // Prepare the SQL query
    $query = "
    INSERT INTO plot1_layouts_test (
        token,
        ownerinformation_firstname,
        ownerinformation_middlename,
        ownerinformation_lastname,
        ownerinformation_address,
        ownerinformation_poa,
        ownerinformation_email,
        ownerinformation_contactdetails,
        caseinformation_applyfor,
        caseinformation_projecttype,
        caseinformation_casetype,
        caseinformation_proposaltype,
        caseinformation_locationzone,
        caseinformation_tdrzone,
        caseinformation_tdrarea,
        caseinformation_area,
        caseinformation_grossplotarea,
        caseinformation_existingarea,
        caseinformation_proportionateinternalroadarea,
        caseinformation_premiumfsi_residential,
        caseinformation_premiumfsi_commercial,
        caseinformation_premiumfsi_other,
        caseinformation_ancillaryareafsi,
        caseinformation_totalpremiumfsi,
        caseinformation_accommodationreservation,
        caseinformation_typeofaccommodationreservation,
        caseinformation_specialproject,
        caseinformation_whetherincentive,
        siteaddress_area,
        siteaddress_surveyno,
        siteaddress_finalplotno,
        siteaddress_hissano,
        siteaddress_ctsno,
        siteaddress_plotno,
        siteaddress_societyname,
        siteaddress_pincode,
        plotdetails_area,
        plotdetails_areazone,
        plotdetails_r7for,
        plotdetails_propertytdrzone,
        plotdetails_receivingtdrzone,
        plotdetails_developmentzonedp,
        plotabuttingdetails_plottype,
        plotabuttingdetails_readyreckonervaluationofplot,
        additionsinnetplotarea_roadwidening,
        additionsinnetplotarea_amenity,
        additionsinnetplotarea_reservation,
        additionsinnetplotarea_existingroad,
        additionsinnetplotarea_transformerarea,
        additionsinnetplotarea_internalroad,
        additionsinnetplotarea_proposedaccessroad,
        additionsinnetplotarea_dproad,
        additionsinnetplotarea_commonamenity,
        additionsinnetplotarea_recreationalopenspace,
        additionsinnetplotarea_plotinapprovedlayout,
        additionsinnetplotarea_proposedslumtdrarea,
        additionsinnetplotarea_amenitytdrarea,
        geom,
        village_name,
        
        gut_no,
        area,
        entry_timestamp
      
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24,
        $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46,
        $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, NOW()
    )
";

    // Prepare the statement
    $stmt = pg_prepare($conn, "insert_query", $query);

    // Execute the statement with parameters
    $result = pg_execute($conn, "insert_query", [
       $token, $owner_firstname, $owner_middlename, $owner_lastname, $owner_address,
        $owner_poa, $owner_email, $owner_contactdetails, $case_applyfor, $case_projecttype,
        $case_casetype, $case_proposaltype, $case_locationzone, $case_tdrzone, $case_tdrarea,
        $case_area, $case_grossplotarea, $case_existingarea, $case_proportionateinternalroadarea,
        $case_premiumfsi_residential, $case_premiumfsi_commercial, $case_premiumfsi_other,
        $case_ancillaryareafsi, $case_totalpremiumfsi, $case_accommodationreservation,
        $case_typeofaccommodationreservation, $case_specialproject, $case_whetherincentive,
        $site_area, $site_surveyno, $site_finalplotno, $site_hissano, $site_ctsno,
        $site_plotno, $site_societyname, $site_pincode, $plot_area, $plot_areazone,
        $plot_r7for, $plot_propertytdrzone, $plot_receivingtdrzone, $plot_developmentzonedp,
        $plot_plottype, $plot_readyreckonervaluationofplot, $addition_roadwidening,
        $addition_amenity, $addition_reservation, $addition_existingroad, $addition_transformerarea,
        $addition_internalroad, $addition_proposedaccessroad, $addition_dproad, $addition_commonamenity,
        $addition_recreationalopenspace, $addition_plotinapprovedlayout, $addition_proposedslumtdrarea,
        $addition_amenitytdrarea, $geometryJSON,
        $DrawnVillage_Name,
        $DrawnGutNo,
        $DrawnArea
    ]);

    // Check if the execution was successful
    if ($result) {
        echo json_encode(["status" => "success", "message" => "Data inserted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error in insertion: " . pg_last_error($conn)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid JSON payload"]);
}

// Close the connection
pg_close($conn);
?>
