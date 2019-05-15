var hotelRoomNightDisplay = document.getElementById("00N0b000009gtVs");
var hotelRoomNight = 0;
var hotelRoomRateDisplay = document.getElementById("00N0b000009gtXE");
var hotelRoomRate = 0;
var totalRevenueDisplay = document.getElementById("totalRevenueDisplay");
var totalRevenue = 0;
var finalDTPIDAmountDisplay = document.getElementById("finalDTPIDAmountDisplay");
var finalDTPIDAmount = 0;
var amountRequested = 0;
var amountRequestedDisplay = document.getElementById("00N0b00000BQW8e");
var preapprovedAmount = 0;
var preapprovedAmountDisplay = document.getElementById("preapprovedAmount");
var mobileDisplay = document.getElementById("mobile");
var hotelNameDisplay = document.getElementById("company");
var hotelName = "";
var eventNameDisplay = document.getElementById("00N0b000007uwKK");
var eventName = "";

$(".room-fields").change(function(){
	if(this.id == "00N0b000009gtVs"){
		hotelRoomNight = this.value;
		hotelRoomNightDisplay.value = numberWithCommas(hotelRoomNight);
	} else {
		hotelRoomRate = this.value;
		hotelRoomRateDisplay.value = numberWithCommas(hotelRoomRate);
	}
	doMaximumEligibleCalculations();
	checkRequested();
})

$(".form-amounts").change(function(){
	if(this.id == "preapprovedAmount"){
		preapprovedAmount = Number(this.value);
	} else if (this.id == "00N0b00000BQW8e"){
		amountRequested = Number(this.value);
	}
	checkRequested();
})

mobileDisplay.addEventListener("change", function(){
	mobileDisplay.value = formatPhoneNumber(this.value);
})

hotelNameDisplay.addEventListener("change", function(){
	hotelName = hotelNameDisplay.value;
})

eventNameDisplay.addEventListener("change", function(){
	eventName = eventNameDisplay.value;
})

function checkRequested(){
	if(finalDTPIDAmount > preapprovedAmount && amountRequested > preapprovedAmount){
		amountRequested = preapprovedAmount;
	} else if (finalDTPIDAmount <= preapprovedAmount && amountRequested > finalDTPIDAmount){
		amountRequested = finalDTPIDAmount;
	} 

	preapprovedAmountDisplay.value = numberWithCommas(preapprovedAmount);
	amountRequestedDisplay.value = numberWithCommas(amountRequested);
}

function doMaximumEligibleCalculations(){
	totalRevenue = round(hotelRoomNight * hotelRoomRate, 2);
	finalDTPIDAmount = round(totalRevenue / 10, 2);

	checkIfOverMax();

	totalRevenueDisplay.textContent = numberWithCommas(totalRevenue);
	finalDTPIDAmountDisplay.textContent = numberWithCommas(finalDTPIDAmount);
}

//check to make sure this is the correct number
function checkIfOverMax(){
	if (finalDTPIDAmount > 100000){
		finalDTPIDAmount = 100000;
	}
}

function formatPhoneNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}
	return phoneNumberString;
}

function myFunction(){
	var email = 'sheryl@visitdallas.com';
	var subject = hotelName + ', ' + eventName + " - Post Event: Pick-Up Report";
	window.location.href='mailto:'+email+'?subject='+subject;
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);
 
  value = +value;
  exp = +exp;
 
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;
 
  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
 
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

$(document).ready(function () {
    $("#00N0b000007v1mP").datepicker({
        //minDate: 0,
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
        //minDate: 0
    });
});

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



