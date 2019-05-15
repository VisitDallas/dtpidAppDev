var hotelRoomNightDisplay = document.getElementById("00N0b000009got7");
var hotelRoomNight = 0;
var hotelRoomRateDisplay = document.getElementById("00N0b000009gotC");
var hotelRoomRate = 0;
var totalRevenueDisplay = document.getElementById("totalRevenueDisplay");
var totalRevenue = 0;
var finalDTPIDAmountDisplay = document.getElementById("finalDTPIDAmountDisplay");
var finalDTPIDAmount = 0;
var amountRequestedDisplay = document.getElementById("00N0b00000BQW8Z");
var amountRequested = 0;
var requestedAmt = document.getElementById("requestedAmt");
// var eventStartDate1 = document.getElementById("00N0b000007v1mP");
// var eventStartDate2 = document.getElementById("eventStartDateCopy");
// var eventEndDate1 = document.getElementById("00N0b000007v1qc");
// var eventEndDate2 = document.getElementById("eventEndDateCopy");
// var eventDecisionDate1 = document.getElementById("00N0b00000Bf6oE");
// var eventDecisionDate2 = document.getElementById("eventDecisionDateCopy");
var eventPreviousMeetingDate1 = document.getElementById("00N0b0000082rE7");
// var eventPreviousMeetingDate2 = document.getElementById("eventPreviousMeetingDateCopy");
var checkboxDallas = document.getElementById("00N0b0000082r6W");
var labelIfYes = document.getElementById("labelIfYes");
var mobileDisplay = document.getElementById("mobile");
var mobileValue = "";

hotelRoomNightDisplay.addEventListener("change", function(){
	hotelRoomNightDisplay.value = parseFloat(hotelRoomNightDisplay.value.replace(/,/g, ''));
	hotelRoomNight = Number(this.value);
	doMaximumEligibleCalculations();
	checkRequested();
	displayMaximumEligibleCalculations();
	hotelRoomNightDisplay.value = numberWithCommas(hotelRoomNight);
});

hotelRoomRateDisplay.addEventListener("change", function(){
	hotelRoomRateDisplay.value = parseFloat(hotelRoomRateDisplay.value.replace(/,/g, ''));
	hotelRoomRate = Number(this.value);
	doMaximumEligibleCalculations();
	checkRequested();
	displayMaximumEligibleCalculations();
	hotelRoomRateDisplay.value = numberWithCommas(hotelRoomRate);
});

amountRequestedDisplay.addEventListener("change", function(){
	amountRequestedDisplay.value = parseFloat(amountRequestedDisplay.value.replace(/,/g, ''));
	amountRequested = Number(this.value);
	checkRequested();
	amountRequestedDisplay.value = numberWithCommas(amountRequested);
})

// eventStartDate2.addEventListener("change", function(){
// 	var eventStartDate3 = new Date(eventStartDate2.value);
// 	eventStartDate3.setUTCHours(11);
// 	eventStartDate1.value = eventStartDate3.toLocaleDateString("en-US");
// })

// eventEndDate2.addEventListener("change", function(){
// 	var eventEndDate3 = new Date(eventEndDate2.value);
// 	eventEndDate3.setUTCHours(11);
// 	eventEndDate1.value = eventEndDate3.toLocaleDateString("en-US");
// })

// eventDecisionDate2.addEventListener("change", function(){
// 	var eventDecisionDate3 = new Date(eventDecisionDate2.value);
// 	eventDecisionDate3.setUTCHours(11);
// 	eventDecisionDate1.value = eventDecisionDate3.toLocaleDateString("en-US");
// })

// eventPreviousMeetingDate2.addEventListener("change", function(){
// 	var eventPreviousMeetingDate3 = new Date(eventPreviousMeetingDate2.value);
// 	eventPreviousMeetingDate3.setUTCHours(11);
// 	eventPreviousMeetingDate1.value = eventPreviousMeetingDate3.toLocaleDateString("en-US");
// })

checkboxDallas.addEventListener("change", function(){
	eventPreviousMeetingDate1.classList.toggle('hide');
	labelIfYes.classList.toggle('hide');
})

mobileDisplay.addEventListener("change", function(){
	mobileValue = mobile.value;
	mobileValue = formatPhoneNumber(mobileValue);
	mobileDisplay.value = mobileValue;
})

function doMaximumEligibleCalculations(){
	totalRevenue = hotelRoomNight * hotelRoomRate;
	finalDTPIDAmount = Math.floor(totalRevenue / 10);
	checkIfOverMax();
}

function checkRequested(){
	if(amountRequested > finalDTPIDAmount){
		amountRequested = finalDTPIDAmount;
		amountRequestedDisplay.value = numberWithCommas(amountRequested);
	}
}

function displayMaximumEligibleCalculations(){
	totalRevenueDisplay.textContent = numberWithCommas(totalRevenue);
	finalDTPIDAmountDisplay.textContent = numberWithCommas(finalDTPIDAmount);
}

function checkIfOverMax(){
	if (finalDTPIDAmount >= 100000){
		finalDTPIDAmount = 100000;
	}
}

function formatPhoneNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}
	return null
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

$(document).ready(function () {
    $("#00N0b000007v1mP").datepicker({
        minDate: 0,
        onSelect: function () {
            var dt2 = $('#00N0b000007v1qc');
            var startDate = $(this).datepicker('getDate');
            //add 30 days to selected date
            startDate.setDate(startDate.getDate() + 30);
            var minDate = $(this).datepicker('getDate');
            var dt2Date = dt2.datepicker('getDate');
            //difference in days. 86400 seconds in day, 1000 ms in second
            var dateDiff = (dt2Date - minDate)/(86400 * 1000);

            //dt2 not set or dt1 date is greater than dt2 date
            if (dt2Date == null || dateDiff < 0) {
                    dt2.datepicker('setDate', minDate);
            }
            //dt1 date is 30 days under dt2 date
            else if (dateDiff > 30){
                    dt2.datepicker('setDate', startDate);
            }
            //first day which can be selected in dt2 is selected date in dt1
            dt2.datepicker('option', 'minDate', minDate);
        }
    });
    $('#00N0b000007v1qc').datepicker({
        minDate: 0
    });
});

$( function() {
    $( "#00N0b00000Bf6oE" ).datepicker();
  } );

$( function() {
    $( "#00N0b0000082rE7" ).datepicker();
  } );

$( function() {
	var availableTags = [
		"AC Hotel Dallas by the Galleria", 
		"AC Marriott Dallas Downtown", 
		"Adolphus Hotel", 
		"Aloft Dallas Downtown", 
		"Aloft Dallas Love Field", 
		"Anchor Motel", 
		"Best Western Plus Dallas Hotel & Conference Center", 
		"Budget Suites of America Empire Central Dallas", 
		"Budget Suites of America Loop 12 Dallas", 
		"Budget Suites of America North Dallas", 
		"Cambria Hotel Dallas Downtown", 
		"Candlewood Suites Dallas By The Galleria", 
		"Candlewood Suites Dallas Market Center", 
		"Candlewood Suites Dallas Park Central", 
		"Canopy by Hilton Dallas Uptown", 
		"Country Inn & Suites by Radisson Dallas Love Field", 
		"Courtyard by Marriott Dallas Central Expressway", 
		"Courtyard by Marriott Dallas Downtown/Reunion District", 
		"Courtyard by Marriott Dallas Medical/Market Center", 
		"Courtyard by Marriott Dallas Northwest", 
		"Crowne Plaza Dallas Downtown", 
		"Crowne Plaza Dallas-Market Center", 
		"Dallas Marriott City Center", 
		"Dallas Marriott Suites Medical/Market Center", 
		"DoubleTree by Hilton Dallas Campbell Centre", 
		"DoubleTree by Hilton Dallas Love Field", 
		"Doubletree by Hilton Dallas Market Center", 
		"Element Dallas Downtown East", 
		"Embassy Suites  by Hilton Dallas Market Center", 
		"Embassy Suites by Hilton Dallas Love Field", 
		"Embassy Suites by Hilton Dallas Park Central", 
		"Embassy Suites Dallas - Galleria", 
		"Executive Inn", 
		"Extended Stay America Dallas Coit Road", 
		"Extended Stay America Dallas Frankford Road", 
		"Extended Stay America Dallas Greenville Avenue", 
		"Extended Stay America Dallas North Park Central", 
		"Fairfield Inn & Suites Dallas Downtown", 
		"Fairfield Inn & Suites Dallas Medical Market Center", 
		"Fairmont Dallas", 
		"Gateway Hotel Dallas Park Central", 
		"Hall Arts Hotel", 
		"Hampton Inn & Suites by Hilton Dallas Central/North Park", 
		"Hampton Inn & Suites Dallas Downtown", 
		"Hawthorn Suites by Wyndham Park Central", 
		"Hilton Anatole", 
		"Hilton Dallas Lincoln Centre", 
		"Hilton Dallas/Park Cities", 
		"Hilton Garden Inn Dallas/Market Center", 
		"Hilton Garden Inn Downtown Dallas", 
		"Holiday Inn Dallas Market Center", 
		"Holiday Inn Express & Suites Dallas Northwest Love Field", 
		"Holiday Inn Express & Suites Dallas Stemmons Freeway I 35 E", 
		"Holiday Inn Express & Suites North Dallas @ Preston", 
		"Home2 Suites by Hilton at Baylor Scott & White", 
		"Home2 Suites by Hilton Dallas Northpark", 
		"HomeTowne Studios Dallas - North Addison/Tollway", 
		"Homewood Suites by Hilton Dallas Downtown", 
		"Homewood Suites by Hilton Dallas Market Center", 
		"Hotel Alexis Dallas", 
		"Hotel Crescent Court", 
		"Hotel Indigo Dallas Downtown", 
		"Hotel ZaZa Dallas", 
		"Hyatt House Dallas Lincoln Park", 
		"Hyatt House Dallas/Uptown", 
		"Hyatt Place Dallas North by the Galleria", 
		"Hyatt Place Dallas/Park Central", 
		"Hyatt Regency Dallas", 
		"InTown Suites Dallas Market Center", 
		"InTown Suites Dallas North Plano", 
		"InTown Suites Dallas Northeast", 
		"InTown Suites Garland Extended Stay", 
		"Knights Inn Market Center Dallas", 
		"La Quinta Inn & Suites Dallas Downtown", 
		"La Quinta Inn & Suites Dallas I35 Walnut Hill Lane", 
		"La Quinta Inn & Suites- Dallas Love Field", 
		"La Quinta Inn & Suites Dallas North Central", 
		"La Quinta Inn & Suites Dallas Richardson", 
		"La Quinta Inns & Suites Dallas Uptown", 
		"Lamplighter Motel", 
		"Le Meridien Dallas By The Galleria", 
		"Le Meridien Dallas, The Stoneleigh", 
		"Lorenzo Hotel", 
		"Magnolia Hotel Dallas Downtown", 
		"Magnolia Hotel Dallas Park Cities", 
		"MCM Elegante Hotel & Suites", 
		"Motel 6 Dallas Fair Park", 
		"Motel 6 Dallas Galleria", 
		"Motel 6 Dallas Market Center", 
		"Omni Dallas Hotel", 
		"Ramada by Wyndham Dallas Love Field", 
		"Red Roof Inn Dallas Richardson", 
		"Renaissance Dallas Hotel", 
		"Residence Inn by Marriott Dallas Downtown", 
		"Residence Inn by Marriott Dallas Market Center", 
		"Residence Inn by Marriott Dallas Park Central", 
		"Residence Inn Dallas at the Canyon", 
		"Residence Inn Dallas by the Galleria", 
		"Residence Inn Dallas Central Expressway", 
		"Rosewood Mansion on Turtle Creek", 
		"Sheraton Dallas Hotel", 
		"Sheraton Suites Market Center Dallas", 
		"Springhill Suites by Marriott Dallas Downtown/West End", 
		"SpringHill Suites Dallas Park Central", 
		"Stay Express Inn Dallas Fair Park Downtown", 
		"Staybridge Suites Dallas Addison", 
		"Sterling Hotel Dallas", 
		"Studio 6 Dallas Love Field", 
		"Studio 6 Dallas North", 
		"Studio 6 Dallas Northeast", 
		"Studio 6 Dallas Northwest", 
		"Super 7 Inn", 
		"Super 7 Inn", 
		"Super 7 Inn Dallas Southwest", 
		"The Highland Dallas Curio Collection by Hilton", 
		"The Joule", 
		"The Ritz-Carlton, Dallas", 
		"The Statler", 
		"The Walnut Hotel Dallas I-35 North", 
		"The Westin Dallas Downtown", 
		"The Westin Dallas Park Central", 
		"The Westin Galleria Dallas", 
		"TownePlace Suites by Marriott Dallas Downtown", 
		"Townhouse Suites", 
		"W Dallas - Victory", 
		"Warwick Melrose Hotel Dallas", 
		"Wyndham Dallas Suites Park Central"
	];
	$ ( "#company" ).autocomplete({
		source: availableTags
	});
});