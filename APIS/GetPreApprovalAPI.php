<?php

require 'config.php'; // Adjust the path to config.php as necessary

// Create connection
$conn = pg_connect("host=$host dbname=$dbname user=$username password=$password");

// Check connection
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . pg_last_error()]);
    exit;
}

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);


// Check if token is provided
if (!isset($data['Token']) || empty($data['Token'])) {
    echo json_encode(["status" => "error", "message" => "Token is required."]);
    exit;
}

// Token and additional fields
$token = $data['Token'];
$BCP_No = $data['BCP_No'];

// Owner Information
$ownerinformation_firstname = $data['OwnerInformation'][0]['FirstName'];
$ownerinformation_middlename = $data['OwnerInformation'][0]['MiddleName'];
$ownerinformation_lastname = $data['OwnerInformation'][0]['LastName'];
$ownerinformation_address = $data['OwnerInformation'][0]['Address'];
$ownerinformation_poa = $data['OwnerInformation'][0]['POA'];
$ownerinformation_email = $data['OwnerInformation'][0]['Email'];
$ownerinformation_contactdetails = $data['OwnerInformation'][0]['ContactDetails'];

// Case Information
$caseinformation_applyfor = $data['CaseInformation']['ApplyFor'];
$caseinformation_projecttype = $data['CaseInformation']['ProjectType'];
$caseinformation_casetype = $data['CaseInformation']['CaseType'];
$caseinformation_proposaltype = $data['CaseInformation']['ProposalType'];
$caseinformation_locationzone = $data['CaseInformation']['LocationZone'];
$caseinformation_tdrzone = $data['CaseInformation']['TDRZONE'];
$caseinformation_tdrarea = $data['CaseInformation']['TDRArea'];
$caseinformation_area = $data['CaseInformation']['AREA'];
$caseinformation_grossplotarea = $data['CaseInformation']['GrossPlotArea'];
$caseinformation_existingarea = $data['CaseInformation']['ExistingArea'];
$caseinformation_proportionateinternalroadarea = $data['CaseInformation']['ProportionateInternalRoadArea'];
$caseinformation_premiumfsi_residential = $data['CaseInformation']['PremiumFSI']['Residential'];
$caseinformation_premiumfsi_commercial = $data['CaseInformation']['PremiumFSI']['Commercial'];
$caseinformation_premiumfsi_other = $data['CaseInformation']['PremiumFSI']['Other'];
$caseinformation_ancillaryareafsi = $data['CaseInformation']['AncillaryAreaFSI'];
$caseinformation_totalpremiumfsi = $data['CaseInformation']['TotalPremiumFSI'];
$caseinformation_accommodationreservation = $data['CaseInformation']['AccommodationReservation'];
$caseinformation_typeofaccommodationreservation = $data['CaseInformation']['TypeOfAccommodationReservation'];
$caseinformation_specialproject = $data['CaseInformation']['SpecialProject'];
$caseinformation_whetherincentive = $data['CaseInformation']['WhetherIncentive'];

// Site Address
$siteaddress_area = $data['SiteAddress'][0]['Area'];
$siteaddress_surveyno = $data['SiteAddress'][0]['SurveyNo'];
$siteaddress_finalplotno = $data['SiteAddress'][0]['FinalPlotNo'];
$siteaddress_hissano = $data['SiteAddress'][0]['HissaNo'];
$siteaddress_ctsno = $data['SiteAddress'][0]['CtsNo'];
$siteaddress_plotno = $data['SiteAddress'][0]['PlotNo'];
$siteaddress_societyname = $data['SiteAddress'][0]['SocietyName'];
$siteaddress_pincode = $data['SiteAddress'][0]['PinCode'];

// Plot Details
$plotdetails_area = $data['PlotDetails'][0]['Area'];
$plotdetails_areazone = $data['PlotDetails'][0]['AreaZone'];
$plotdetails_r7for = $data['PlotDetails'][0]['R7for'];
$plotdetails_propertytdrzone = $data['PlotDetails'][0]['PropertyTDRZone'];
$plotdetails_receivingtdrzone = $data['PlotDetails'][0]['ReceivingTDRZone'];
$plotdetails_developmentzonedp = $data['PlotDetails'][0]['DevelopmentZoneDP'];

// Plot Abutting Details
$plotabuttingdetails_plottype = $data['PlotAbuttingDetails'][0]['PlotType'];
$plotabuttingdetails_readyreckonervaluationofplot = $data['PlotAbuttingDetails'][0]['ReadyReckonerValuationOfPlot'];

// Additions in Net Plot Area
$additionsinnetplotarea_roadwidening = $data['AdditionsInNetPlotArea'][0]['RoadWidening'];
$additionsinnetplotarea_amenity = $data['AdditionsInNetPlotArea'][0]['Amenity'];
$additionsinnetplotarea_reservation = $data['AdditionsInNetPlotArea'][0]['Reservation'];
$additionsinnetplotarea_existingroad = $data['AdditionsInNetPlotArea'][0]['ExistingRoad'];
$additionsinnetplotarea_transformerarea = $data['AdditionsInNetPlotArea'][0]['TransformerArea'];
$additionsinnetplotarea_internalroad = $data['AdditionsInNetPlotArea'][0]['InternalRoad'];
$additionsinnetplotarea_proposedaccessroad = $data['AdditionsInNetPlotArea'][0]['ProposedAccessRoad'];
$additionsinnetplotarea_dproad = $data['AdditionsInNetPlotArea'][0]['DP_Road'];
$additionsinnetplotarea_commonamenity = $data['AdditionsInNetPlotArea'][0]['CommonAmenity'];
$additionsinnetplotarea_recreationalopenspace = $data['AdditionsInNetPlotArea'][0]['RecreationalOpenSpace'];
$additionsinnetplotarea_plotinapprovedlayout = $data['AdditionsInNetPlotArea'][0]['PlotInApprovedLayout'];
$additionsinnetplotarea_proposedslumtdrarea = $data['AdditionsInNetPlotArea'][0]['ProposedSlumTDRArea'];
$additionsinnetplotarea_amenitytdrarea = $data['AdditionsInNetPlotArea'][0]['AmenityTDRArea'];

// Check if the token exists in the database
$checkQuery = "SELECT token FROM plot1_layouts_test WHERE token = $1";
$checkResult = pg_query_params($conn, $checkQuery, [$data['Token']]);

if (pg_num_rows($checkResult) > 0) {
    // Token exists, so update the record
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
            additionsinnetplotarea_amenitytdrarea = $57
        WHERE token = $1
    ";

    $params = [
        $token,
        $ownerinformation_firstname,
        $ownerinformation_middlename,
        $ownerinformation_lastname,
        $ownerinformation_address,
        $ownerinformation_poa,
        $ownerinformation_email,
        $ownerinformation_contactdetails,
        $caseinformation_applyfor,
        $caseinformation_projecttype,
        $caseinformation_casetype,
        $caseinformation_proposaltype,
        $caseinformation_locationzone,
        $caseinformation_tdrzone,
        $caseinformation_tdrarea,
        $caseinformation_area,
        $caseinformation_grossplotarea,
        $caseinformation_existingarea,
        $caseinformation_proportionateinternalroadarea,
        $caseinformation_premiumfsi_residential,
        $caseinformation_premiumfsi_commercial,
        $caseinformation_premiumfsi_other,
        $caseinformation_ancillaryareafsi,
        $caseinformation_totalpremiumfsi,
        $caseinformation_accommodationreservation,
        $caseinformation_typeofaccommodationreservation,
        $caseinformation_specialproject,
        $caseinformation_whetherincentive,
        $siteaddress_area,
        $siteaddress_surveyno,
        $siteaddress_finalplotno,
        $siteaddress_hissano,
        $siteaddress_ctsno,
        $siteaddress_plotno,
        $siteaddress_societyname,
        $siteaddress_pincode,
        $plotdetails_area,
        $plotdetails_areazone,
        $plotdetails_r7for,
        $plotdetails_propertytdrzone,
        $plotdetails_receivingtdrzone,
        $plotdetails_developmentzonedp,
        $plotabuttingdetails_plottype,
        $plotabuttingdetails_readyreckonervaluationofplot,
        $additionsinnetplotarea_roadwidening,
        $additionsinnetplotarea_amenity,
        $additionsinnetplotarea_reservation,
        $additionsinnetplotarea_existingroad,
        $additionsinnetplotarea_transformerarea,
        $additionsinnetplotarea_internalroad,
        $additionsinnetplotarea_proposedaccessroad,
        $additionsinnetplotarea_dproad,
        $additionsinnetplotarea_commonamenity,
        $additionsinnetplotarea_recreationalopenspace,
        $additionsinnetplotarea_plotinapprovedlayout,
        $additionsinnetplotarea_proposedslumtdrarea,
        $additionsinnetplotarea_amenitytdrarea
    ];

    $result = pg_query_params($conn, $updateQuery, $params);

    if ($result) {
        $logQuery = "INSERT INTO checkdcr (token, update_timestamp) VALUES ($1, NOW())";
        pg_query_params($conn, $logQuery, [$token]);
        echo json_encode(["status" => "success", "message" => "Record updated successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error updating record: " . pg_last_error($conn)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Token does not exist."]);
}

pg_close($conn);
?>