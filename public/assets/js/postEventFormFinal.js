//global variables
var hotelRoomNightsDisplay = document.getElementById("00N0b000009gtVs");
var hotelRoomNights = 0;
var hotelRoomRateDisplay = document.getElementById("00N0b000009gtXE");
var hotelRoomRate = 168;
var totalRevenueDisplay = document.getElementById("totalRevenueDisplay");
var totalRevenue = 0;
var finalDTPIDAmountDisplay = document.getElementById("finalDTPIDAmountDisplay");
var finalDTPIDAmount = 0;
var dtpidFundsAvailableDisplay = document.getElementById("dtpidFundsAvailableDisplay");
var dtpidFundsPreApprovedDisplay = document.getElementById("dtpidFundsPreApproved");
var dtpidFundsPreApproved = 0;
var lessAnyPaymentsDisplay = document.getElementById("00N0b00000899kp");
var lessAnyPayments = 0;
var finalPaymentDueDisplay = document.getElementById("00N0b00000Cbqrv");
var finalPaymentDue = 0;
var eventMarketingTotal = 0;
var eventStaffingTotal = 0;
var eventProductionTotal = 0;
var eventOtherTotal = 0;
var summedDTPIDFundsDisplay = document.getElementById("summedDTPIDFundsDisplay");
var summedDTPIDFunds = 0;
// var matchDTPIDFunds1 = document.getElementById("matchPromptTotalDisplay1");
// var matchDTPIDFunds2 = document.getElementById("matchPromptTotalDisplay2");
var eventOrganizationDisplay = document.getElementById("company");
var eventOrganization = "";
var eventNameDisplay = document.getElementById("00N0b000007uwKK");
var eventName = "";
var requestedAmountDisplay = document.getElementById("00N0b00000BQW8e");
var requestedAmount = 0;
var currentDate = document.getElementById("00N0b00000CclxP");

//event listeners

hotelRoomRateDisplay.addEventListener("change", function(){
	hotelRoomRate = Number(this.value);
	doEstimationCalculations();
	doTotalBudgetCalculations();
	overPercentage();
	setFundsDisplayNumbers(requestedAmount);
});

dtpidFundsPreApprovedDisplay.addEventListener("change", function(){
	dtpidFundsPreApproved = Number(parseNumber(dtpidFundsPreApprovedDisplay));
	checkPreApprovedOverMax();
	dtpidFundsPreApprovedDisplay.value = numberWithCommas(dtpidFundsPreApproved);
});

lessAnyPaymentsDisplay.addEventListener("change", function(){
	lessAnyPayments = Number(parseNumber(lessAnyPaymentsDisplay));
	doLessPaymentsCalculations();
});

//event sums fields are assigned values and then calculated
$(".eventSum").change(function(){
	if(this.id == "00N0b00000APpKT"){ 
		eventMarketingTotal = Number(parseNumber(this));
	} else if(this.id == "00N0b00000APrKd"){
		eventStaffingTotal = Number(parseNumber(this));
	} else if(this.id == "00N0b00000APr5I"){
		eventProductionTotal = Number(parseNumber(this));
	} else if(this.id == "00N0b00000BgxJt"){
		eventOtherTotal = Number(parseNumber(this));
	}
	sumFieldsCalc();
})

eventOrganizationDisplay.addEventListener("change", function(){
	eventOrganization = eventOrganizationDisplay.value;
})

eventNameDisplay.addEventListener("change", function(){
	eventName = eventNameDisplay.value;
})

//event listener on requested amount to see if it's over max and then does all calculations
requestedAmountDisplay.addEventListener("change", function(){
	requestedAmount = Number(parseNumber(requestedAmountDisplay));
	checkRequestedOverVar(finalDTPIDAmount);
	checkRequestedOverVar(dtpidFundsPreApproved);
	doLessPaymentsCalculations();
	sumFieldsCalc();
	setFundsDisplayNumbers(requestedAmount);
})

//functions
//seeing if the requested value is higher than inserted int
function checkRequestedOverVar(int){
	if (requestedAmount >= int){
		requestedAmount = int;
	}
}

//see if requested is more than max
function checkPreApprovedOverMax(){
	if (dtpidFundsPreApproved >= 35001){
		dtpidFundsPreApproved = 35000;
	}
}

function doLessPaymentsCalculations(){
	finalPaymentDue = requestedAmount - lessAnyPayments;
	lessAnyPaymentsDisplay.value = numberWithCommas(lessAnyPayments);
	finalPaymentDueDisplay.value = numberWithCommas(finalPaymentDue);
}

function dtpidFundsCalculations(){
	doLessPaymentsCalculations();
	doTotalBudgetCalculations();
	addDTPIDFundingCategories();
	matchTotals();
	overPercentage();
	showSubmit();
}

//adds commas when needed to the sum fields
function setSumDisplayFields(){
	document.getElementById("00N0b00000APpKT").value = numberWithCommas(eventMarketingTotal);
	document.getElementById("00N0b00000APrKd").value = numberWithCommas(eventStaffingTotal);
	document.getElementById("00N0b00000APr5I").value = numberWithCommas(eventProductionTotal);
	document.getElementById("00N0b00000BgxJt").value = numberWithCommas(eventOtherTotal);
}

//taking out comments from variable
function parseNumber(var1){
	var1.value = parseFloat(var1.value.replace(/,/g, ''));
	return var1.value;
}

//all functions that are used in the sum fields
function sumFieldsCalc(){
	addDTPIDFundingCategories();
	setSumDisplayFields();
	matchTotals();
	showSubmit();
}

function addDTPIDFundingCategories(){
	summedDTPIDFunds = Number(eventMarketingTotal + eventStaffingTotal + eventProductionTotal + eventOtherTotal);
	summedDTPIDFundsDisplay.textContent = numberWithCommas(summedDTPIDFunds);
}

//logic to show if totals wanted match requested
function matchTotals(){
	summedDTPIDFundsDisplay.textContent = numberWithCommas(summedDTPIDFunds);
	if (requestedAmount != summedDTPIDFunds){
		summedDTPIDFundsDisplay.classList.add("showcaseRed");
		matchDTPIDFunds1.classList.remove("hide");
	} else {
		summedDTPIDFundsDisplay.classList.remove("showcaseRed");
		matchDTPIDFunds1.classList.add("hide");
	}
}

//adding format to the phone and mobile fields
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

function setPreApprovedAmount(){
	dtpidFundsPreApproved = finalDTPIDAmount;
	dtpidFundsPreApprovedDisplay.value = numberWithCommas(dtpidFundsPreApproved);
}

function checkIfOverMax(){
	if (finalDTPIDAmount >= 35000){
		finalDTPIDAmount = 35000;
		fillInFinalDTPIDFields(finalDTPIDAmount);
	}
}

//adding statement from check if over max
function fillInFinalDTPIDFields(var1){
	finalDTPIDAmountDisplay.textContent = numberWithCommas(var1);
	totalEventBudgetDisplay.textContent = numberWithCommas(var1);
	matchDTPIDFunds2.textContent = numberWithCommas(var1);
	dtpidFundsAvailableDisplay.textContent = numberWithCommas(var1);
}

//change requested amount, funds available and totals at once
function setFundsDisplayNumbers(num){
	requestedAmountDisplay.value = numberWithCommas(num);
	dtpidFundsAvailableDisplay.textContent = numberWithCommas(num);
	totalEventBudgetDisplay.textContent = numberWithCommas(num);
	matchDTPIDFunds2.textContent = numberWithCommas(num);
}

function resetAllFinalDTPIDAmounts(){
	finalDTPIDAmountDisplay.textContent = numberWithCommas(requestedAmount);
	dtpidFundsAvailableDisplay.textContent = numberWithCommas(requestedAmount);
	totalEventBudgetDisplay.textContent = numberWithCommas(requestedAmount);
}

//submit function to open email to send extra documents
function myFunction() {
	var email = 'maribeth@visitdallas.com';
	var subject = eventOrganization + ', ' + eventName + " - Post Event: Supplemental Documents";
	window.location.href='mailto:'+email+'?subject='+subject;
}

//function to add commas to numbers
function numberWithCommas(x) {
    return x.toLocaleString();
}

//adds "()" and "-" to phone numbers
function formatPhoneNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}
	return null
}

//jquery ui date picker
$(document).ready(function () {
    //event start date
    $("#00N0b000007v1mP").datepicker({
        // minDate: 0,
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
    //event end date
    $('#00N0b000007v1qc').datepicker({
        // minDate: 0
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







