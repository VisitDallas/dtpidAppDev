var statePicklistDisplay = document.getElementById("statePicklist");
var statePicklistValue = "Texas";
var state = document.getElementById("state");
// var estimationSelection = document.getElementById("00N0b000007v5C5");
// var estimationNumberInputDisplay = document.getElementById("00N0b000007vPGg");
var hotelRoomNightsDisplay = document.getElementById("00N0b000009got7");
var hotelRoomNights = 0;
var hotelRoomRateDisplay = document.getElementById("00N0b000009gotC");
var hotelRoomRate = 168;
var totalRevenueDisplay = document.getElementById("totalRevenueDisplay");
var totalRevenue = 0;
var finalDTPIDAmountDisplay = document.getElementById("finalDTPIDAmountDisplay");
var finalDTPIDAmount = 0;
// var totalDTPIDFundsDisplay = document.getElementById("totFDis");
var eventMarketingTotalDisplay = document.getElementById("00N0b0000088woe");
var eventMarketingTotal = 0;
var eventStaffingTotalDisplay = document.getElementById("00N0b0000089S0U");
var eventStaffingTotal = 0;
var eventProductionTotalDisplay = document.getElementById("00N0b0000089SFW");
var eventProductionTotal = 0;
var eventOtherTotalDisplay = document.getElementById("00N0b00000BgxJU");
var eventOtherTotal = 0;
var summedDTPIDFundsDisplay = document.getElementById("summedDTPIDFundsDisplay");
var summedDTPIDFunds = 0;
// var matchDTPIDFunds1 = document.getElementById("matchDTPIDFunds1");
// var matchDTPIDFunds2 = document.getElementById("matchDTPIDFunds2");
var eventLocationCheck = document.getElementById("locationCheck");
var eventVenueLocationDisplayFields = document.getElementById("eventVenueLocationDisplayFields");
var eventLocationNameDisplay = document.getElementById("00N0b00000BOCDc");
var eventLocationAddressDisplay = document.getElementById("00N0b00000Bu9Vk");
var eventLocationCityDisplay = document.getElementById("00N0b00000Bu9Xl");
var eventLocationStateDisplay = document.getElementById("00N0b00000Bu9Vp");
var eventLocationZipDisplay = document.getElementById("00N0b00000BOCDh");
var orgNameDisplay = document.getElementById("company");
var orgAddressDisplay = document.getElementById("street");
var orgCityDisplay = document.getElementById("city");
var orgZipDisplay = document.getElementById("zip");
var previousFundingCheck = document.getElementById("00N0b000007v1qm");
var ocaCheckbox = document.getElementById("ocaCheckbox");
var ocaField = document.getElementById("00N0b00000Bw1rS");
var sportsCheckbox = document.getElementById("sportsCheckbox");
var leadTypeSelector = document.getElementById("00N0b00000Cd4jc");
var labelTimesFunded = document.getElementById("labelTimesFunded");
var formTimesFunded = document.getElementById("00N0b000007v56k");
//var submitButton = document.getElementById("submit");
var requestedAmountDisplay = document.getElementById("00N0b00000BQW8Z");
var requestedAmount = 0;
var currentDate = document.getElementById("00N0b00000CclxK");
var partialPaymentPercentage = document.getElementById("00N0b00000899QC");
// var partialPaymentMath = .25;
//var partialRequestedAmount = document.getElementById("00N0b00000899kp");
// var finalRequestedAmount = document.getElementById("00N0b00000Cbqrv");

statePicklistDisplay.addEventListener("change", function(){
	statePicklistValue = statePicklistDisplay.value;
	state.value = statePicklistValue;
	if (eventLocationCheck.checked) {
		console.log("box not checked");
	} else {
		eventLocationStateDisplay.value = statePicklistValue;
	}
})

hotelRoomRateDisplay.addEventListener("change", function(){
	hotelRoomRate = Number(hotelRoomRateDisplay.value);
	doEstimationCalculations();
	doTotalBudgetCalculations();
	overPercentage();
})

eventMarketingTotalDisplay.addEventListener("change", function(){
	eventMarketingTotalDisplay.value = parseFloat(eventMarketingTotalDisplay.value.replace(/,/g, ''));
	eventMarketingTotal = Number(eventMarketingTotalDisplay.value);
	addDTPIDFundingCategories();
	matchTotals();
	showSubmit();
	eventMarketingTotalDisplay.value = numberWithCommas(eventMarketingTotal);
})

eventStaffingTotalDisplay.addEventListener("change", function(){
	eventStaffingTotalDisplay.value = parseFloat(eventStaffingTotalDisplay.value.replace(/,/g, ''));
	eventStaffingTotal = Number(eventStaffingTotalDisplay.value);
	addDTPIDFundingCategories();
	eventStaffingTotalDisplay.value = numberWithCommas(eventStaffingTotal);
	matchTotals();
	showSubmit();
})

eventProductionTotalDisplay.addEventListener("change", function(){
	eventProductionTotalDisplay.value = parseFloat(eventProductionTotalDisplay.value.replace(/,/g, ''));
	eventProductionTotal = Number(eventProductionTotalDisplay.value);
	addDTPIDFundingCategories();
	eventProductionTotalDisplay.value = numberWithCommas(eventProductionTotal);
	matchTotals();
	showSubmit();
})

eventOtherTotalDisplay.addEventListener("change", function(){
	eventOtherTotalDisplay.value = parseFloat(eventOtherTotalDisplay.value.replace(/,/g, ''));
	eventOtherTotal = Number(eventOtherTotalDisplay.value);
	addDTPIDFundingCategories();
	eventOtherTotalDisplay.value = numberWithCommas(eventOtherTotal);
	matchTotals();
	showSubmit();
})

orgAddressDisplay.addEventListener("change", function(){
	if (eventLocationCheck.checked) {
		console.log("box checked");
	} else {
		eventLocationAddressDisplay.value = orgAddressDisplay.value;
	}
})

orgCityDisplay.addEventListener("change", function(){
	if (eventLocationCheck.checked) {
		console.log("box checked");
	} else {
		eventLocationCityDisplay.value = orgCityDisplay.value;
	}
})

orgZipDisplay.addEventListener("change", function(){
	if (eventLocationCheck.checked) {
		console.log("box checked");
	} else {
		eventLocationZipDisplay.value = orgZipDisplay.value;
	}
})

orgNameDisplay.addEventListener("change", function(){
	if (eventLocationCheck.checked) {
		console.log("box checked");
	} else {
		eventLocationNameDisplay.value = orgNameDisplay.value;
	}
})

previousFundingCheck.addEventListener("change", function(){
	if (previousFundingCheck.checked) {
		labelTimesFunded.classList.remove("hide");
		formTimesFunded.classList.remove("hide");
		partialPaymentPercentage.value = "50%";
		partialPaymentMath = .5;
		partialCalculator();
	} else {
		labelTimesFunded.classList.add("hide");
		formTimesFunded.classList.add("hide");
		formTimesFunded.value = 0;
		partialPaymentPercentage.value = "25%";
		partialPaymentMath = .25;
		partialCalculator();

	}
})

ocaCheckbox.addEventListener("change", function(){
	if (ocaCheckbox.checked) {
		ocaField.value = "OCA";
	} else {
		ocaField.value = "";
	}
})

sportsCheckbox.addEventListener("change", function(){
	if (sportsCheckbox.checked) {
		leadTypeSelector.value = "Sports";
	} else {
		leadTypeSelector.value = "Event";
	}
})

requestedAmountDisplay.addEventListener("change", function(){
	requestedAmountDisplay.value = parseFloat(requestedAmountDisplay.value.replace(/,/g, ''));
	requestedAmount = Number(requestedAmountDisplay.value);
	checkRequestedOverMax();
	requestedAmountDisplay.value = numberWithCommas(requestedAmount);
	doTotalBudgetCalculations();
	addDTPIDFundingCategories();
	matchTotals();
	overPercentage();
	partialCalculator();
	showSubmit();
})

$(".phone").change(function(){
	if(this.id == "phone"){
		var phoneDisplay = document.getElementById("phone");
		phoneDisplay.value = formatPhoneNumber(this.value);
	} else if (this.id == "mobile"){
		var mobileDisplay = document.getElementById("mobile");
		mobileDisplay.value = formatPhoneNumber(this.value);
	}
});

function setRequestedAmount(){
	requestedAmount = finalDTPIDAmount;
	requestedAmountDisplay.value = numberWithCommas(requestedAmount);
}

function addDTPIDFundingCategories(){
	summedDTPIDFunds = eventMarketingTotal + eventStaffingTotal + eventProductionTotal + eventOtherTotal;
	summedDTPIDFundsDisplay.textContent = numberWithCommas(summedDTPIDFunds);
}

function checkIfOverMax(){
	if (finalDTPIDAmount >= 35000){
		finalDTPIDAmount = 35000;
		finalDTPIDAmountDisplay.textContent = numberWithCommas(finalDTPIDAmount);
		totalDTPIDFundsDisplay.textContent = numberWithCommas(finalDTPIDAmount);
		matchDTPIDFunds2.textContent = numberWithCommas(finalDTPIDAmount);
	}
}

function checkRequestedOverMax(){
	if (requestedAmount >= finalDTPIDAmount){
		requestedAmount = finalDTPIDAmount;
		requestedAmountDisplay.value = numberWithCommas(requestedAmount);
		totalDTPIDFundsDisplay.textContent = numberWithCommas(requestedAmount);
		matchDTPIDFunds2.textContent = numberWithCommas(requestedAmount);
	} else {
		totalDTPIDFundsDisplay.textContent = numberWithCommas(requestedAmount);
		matchDTPIDFunds2.textContent = numberWithCommas(requestedAmount);
	}

}

function matchTotals(){
	if (requestedAmount != summedDTPIDFunds){
		summedDTPIDFundsDisplay.classList.add("showcaseRed");
		matchDTPIDFunds1.classList.remove("hide");
	} else {
		summedDTPIDFundsDisplay.classList.remove("showcaseRed");
		matchDTPIDFunds1.classList.add("hide");
	}
}

$("#locationCheck").click(function(){
	$("#eventVenueLocationDisplayFields").toggleClass("hide");
    if($(this).is(":checked")){      
      $('.eventLocation').attr('readonly', false);
    } else{
      $('.eventLocation').attr('readonly', true);
      // $(".eventLocation").val("");
      resetVenueDisplays();
    }
  });

function resetVenueDisplays(){
	eventLocationAddressDisplay.value = orgAddressDisplay.value;
	eventLocationCityDisplay.value = orgCityDisplay.value;
	eventLocationZipDisplay.value = orgZipDisplay.value;
	eventLocationNameDisplay.value = orgNameDisplay.value;	
	eventLocationStateDisplay.value = statePicklistValue;
}

// function partialCalculator(){
// 	//calculate the partial payment
// 	var partialRequestedAmount1 = partialPaymentMath * requestedAmount;
// 	partialRequestedAmount.value = partialPaymentMath * requestedAmount;
// 	//calculate the final payment
// 	finalRequestedAmount.value = requestedAmount - partialRequestedAmount1;
// }

// function formatPhoneNumber(phoneNumberString) {
// 	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
// 	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
// 	if (match) {
// 		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
// 	}
// 	return phoneNumberString;
// }

$(document).ready(function () {
    $("#00N0b000007v1mP").datepicker({
        // dateFormat: "dd-M-yy",
        minDate: 90,
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
            //sets dt2 maxDate to the last day of 30 days window
            // dt2.datepicker('option', 'maxDate', startDate);
            //first day which can be selected in dt2 is selected date in dt1
            dt2.datepicker('option', 'minDate', minDate);
        }
    });
    $('#00N0b000007v1qc').datepicker({
        // dateFormat: "dd-M-yy",
        minDate: 90
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












