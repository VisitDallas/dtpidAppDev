var hotelRoomNightDisplay = document.getElementById("00N0b000009got7");
var hotelRoomNight = 0;
var hotelRoomRateDisplay = document.getElementById("00N0b000009gotC");
var hotelRoomRate = 0;
var totalRevenueDisplay = document.getElementById("totalRevenueDisplay");
var totalRevenue = 0;
var coefficientROIDisplay = document.getElementById("coefROI");
var coefficientROIInput = document.getElementById("00N0b00000CoagY");
var coefficientROI = 0;
var finalDTPIDAmountDisplay = document.getElementById("finalDTPIDAmountDisplay");
var finalDTPIDAmountDisplay2 = document.getElementById("finalDTPIDAmountDisplay2");
var finalDTPIDAmount = 0;
var amountRequestedDisplay = document.getElementById("00N0b00000BQW8Z");
var amountRequested = 0;
var requestedAmt = document.getElementById("requestedAmt");
var eventPreviousMeetingDate1 = document.getElementById("00N0b0000082rE7");
var checkboxDallas = document.getElementById("00N0b0000082r6W");
var labelIfYes = document.getElementById("labelIfYes");
var mobileDisplay = document.getElementById("mobile");
var mobileValue = "";
var currentDate = document.getElementById("00N0b00000CclxK");
var startDate = "";
var enterDate = document.getElementById("enterDate");

let peakHotelRoomNightsDisplay = document.getElementById("00N0b00000CnNpw");
let peakHotelRoomNights = 0;
let totalSleepingRoomsDisplay = document.getElementById("00N0b00000Cmy6U");
let totalSleepingRooms = 0;
let percentInventoryAtPeakDisplay = document.getElementById("00N0b000009gTge");
let percentInventoryAtPeak = 0;
let shownPercentInventoryAtPeakDisplay = document.getElementById("shownInventoryAtPeakDisplay");
let submitButton = document.getElementById("submit");
let setHigherPercentage = document.getElementById("setHigherPercentage");
let addRooms = document.getElementById("addRooms");
//let approvedAmount = document.getElementById("00N0b00000Cnohu");

peakHotelRoomNightsDisplay.addEventListener("change", function(){
	peakHotelRoomNightsDisplay.value = parseFloat(peakHotelRoomNightsDisplay.value.replace(/,/g, ''));
	peakHotelRoomNights = Number(this.value);
	calculatePercentInventory();
	//underPercentage();
	peakHotelRoomNightsDisplay.value = numberWithCommas(peakHotelRoomNights);
});

totalSleepingRoomsDisplay.addEventListener("change", function(){
	totalSleepingRoomsDisplay.value = parseFloat(totalSleepingRoomsDisplay.value.replace(/,/g, ''));
	totalSleepingRooms = Number(this.value);
	calculatePercentInventory();
	//underPercentage();
	totalSleepingRoomsDisplay.value = numberWithCommas(totalSleepingRooms);
});

function calculatePercentInventory() {
	percentInventoryAtPeak = Math.round((peakHotelRoomNights / totalSleepingRooms) * 100);
	percentInventoryAtPeakDisplay.value = percentInventoryAtPeak;
	shownPercentInventoryAtPeakDisplay.value = percentInventoryAtPeak + "%";
}

function underPercentage(){
	if (percentInventoryAtPeak < 10){
		setHigherPercentage.classList.remove("hide");
		addRooms.classList.add("hide");
		submitButton.setAttribute("disabled", "true");
	} else if (percentInventoryAtPeak == "Infinity"){
		setHigherPercentage.classList.add("hide");
		addRooms.classList.remove("hide");
		submitButton.setAttribute("disabled", "true");
	} else {
		setHigherPercentage.classList.add("hide");
		addRooms.classList.add("hide");
		submitButton.removeAttribute("disabled");
	}
}

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
	//stimulus award checker
	totalRevenue = hotelRoomNight * hotelRoomRate;

	if(startDate.getFullYear() === 2020) {
		console.log(startDate.getFullYear());
		console.log("doing stimulus winner");
		coefficientROI = 6.67;
	} else {
		console.log("not applicable for stimulus award");
		coefficientROI = 10;
	}
	coefficientROIDisplay.textContent = coefficientROI;
	coefficientROIInput.value = coefficientROI;
	finalDTPIDAmount = Math.ceil(totalRevenue / coefficientROI);
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
	finalDTPIDAmountDisplay2.textContent = numberWithCommas(finalDTPIDAmount);
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
            startDate = $(this).datepicker('getDate');
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
			console.log("In date picker: " + startDate.getFullYear());
			console.log("In date picker, full date:" + startDate);
			enterDate.classList.add("hide");
			doMaximumEligibleCalculations();
			checkRequested();
			displayMaximumEligibleCalculations();
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

function inputCurrentDate(){ 
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day + '/' + d.getFullYear();
	currentDate.value = output;
};

window.onload = function() {
  inputCurrentDate();
};







