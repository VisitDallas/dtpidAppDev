//global variables
var estimationSelection = document.getElementById("00N0b000009gtNd");
var estimationChoice0 = document.getElementById("estimationChoice0");
var estimationResult = document.getElementById("estimationCalculation");
var estimationChoiceFactorDisplay = document.getElementById("estimationChoiceFactorDisplay");
var estimationChoiceFactor = 0;
var estimationNumberInputDisplay = document.getElementById("00N0b000009gtUX");
var estimationNumberInput = 0;
var estimationChoiceResultDisplay = document.getElementById("estimationChoiceResultDisplay");
var estimationChoiceResult = 0;
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
var totalDTPIDFundsDisplay = document.getElementById("totalDTPIDFundsDisplay");
var totalEventBudgetDisplay = document.getElementById("00N0b00000CbolR");
var totalEventBudget = 0;
var percentDTPIDTotalDisplay = document.getElementById("percentDTPIDTotalDisplay");
var percentDTPIDTotal = 0;
var eventMarketingTotal = 0;
var eventStaffingTotal = 0;
var eventProductionTotal = 0;
var eventOtherTotal = 0;
var summedDTPIDFundsDisplay = document.getElementById("summedDTPIDFundsDisplay");
var summedDTPIDFunds = 0;
var matchDTPIDFunds1 = document.getElementById("matchPromptTotalDisplay1");
var matchDTPIDFunds2 = document.getElementById("matchPromptTotalDisplay2");
var eventOrganizationDisplay = document.getElementById("company");
var eventOrganization = "";
var eventNameDisplay = document.getElementById("00N0b000007uwKK");
var eventName = "";
var requestedAmountDisplay = document.getElementById("00N0b00000BQW8e");
var requestedAmount = 0;
var currentDate = document.getElementById("00N0b00000CclxP");

//event listeners
//estimation choice event listener
estimationSelection.addEventListener("change", function(){
	//perform the selection actions first
	clearEstimationChoice();
	showEstimationChoice();
	//change which classes to hide and factor based on selection
	if (estimationSelection.selectedIndex == 1){
		document.getElementById("estimationChoice1").classList.remove("hide");
		showEstimationChoiceFactor(0.09);
	} else if (estimationSelection.selectedIndex == 2){
		document.getElementById("estimationChoice2").classList.remove("hide");
		showEstimationChoiceFactor(1.0);
		//this option allows you to change room rate
		hotelRoomRateDisplay.removeAttribute('readonly');
	} else if (estimationSelection.selectedIndex == 3){
		document.getElementById("estimationChoice3").classList.remove("hide");
		showEstimationChoiceFactor(0.6);
	} else {
		clearEstimationChoice();
	}
	doEstimationCalculations();
});

estimationNumberInputDisplay.addEventListener("change", function(){
	estimationNumberInput = Number(parseNumber(estimationNumberInputDisplay));
	doEstimationCalculations();
	dtpidFundsCalculations();
	estimationNumberInputDisplay.value = numberWithCommas(estimationNumberInput);
});

hotelRoomRateDisplay.addEventListener("change", function(){
	hotelRoomRate = Number(this.value);
	doEstimationCalculations();
	doTotalBudgetCalculations();
	overPercentage();
});

dtpidFundsPreApprovedDisplay.addEventListener("change", function(){
	dtpidFundsPreApproved = Number(parseNumber(dtpidFundsPreApprovedDisplay));
	checkPreApprovedOverRequested();
	dtpidFundsPreApprovedDisplay.value = numberWithCommas(dtpidFundsPreApproved);
});

lessAnyPaymentsDisplay.addEventListener("change", function(){
	lessAnyPayments = Number(parseNumber(lessAnyPaymentsDisplay));
	doLessPaymentsCalculations();
});

totalEventBudgetDisplay.addEventListener("change", function(){
	doTotalBudgetCalculations();
	overPercentage();
	showSubmit();
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
	setFundsDisplayNumbers(requestedAmount);
})

//functions
//seeing if the requested value is higher than inserted int
function checkRequestedOverVar(int){
	if (requestedAmount >= int){
		requestedAmount = int;
	}
}

//see if requestested is more than pre approved
function checkPreApprovedOverRequested(){
	if (dtpidFundsPreApproved >= requestedAmount){
		dtpidFundsPreApproved = requestedAmount;
	}
}

//this function takes an int and inputs it for the estimation choice factor
function showEstimationChoiceFactor(int){
	estimationChoiceFactor = int;
	estimationChoiceFactorDisplay.textContent = estimationChoiceFactor;
}

function doEstimationCalculations(){
	estimationChoiceResult = Math.round(estimationNumberInput * estimationChoiceFactor * 1)/1;
	estimationChoiceResultDisplay.textContent = numberWithCommas(estimationChoiceResult);
	hotelRoomNights = Number(estimationChoiceResult);
	hotelRoomNightsDisplay.value = numberWithCommas(estimationChoiceResult);
	totalRevenue = Math.round(estimationChoiceResult * hotelRoomRate * 1e12) / 1e12;
	totalRevenueDisplay.textContent = numberWithCommas(totalRevenue);
	finalDTPIDAmount = Math.floor(totalRevenue / 10);
	checkIfOverMax();
	setRequestedAmount();
	setPreApprovedAmount();
	setFundsDisplayNumbers(requestedAmount);
	fillInFinalDTPIDFields(finalDTPIDAmount);
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

function doTotalBudgetCalculations(){
	totalEventBudgetDisplay.value = parseFloat(totalEventBudgetDisplay.value.replace(/,/g, ''));
	var totalEventBudgetDisplay2 = totalEventBudgetDisplay.value;
	totalEventBudget = Number(totalEventBudgetDisplay.value) / 100;
	percentDTPIDTotal = Math.floor(requestedAmount / totalEventBudget);
	percentDTPIDTotalDisplay.textContent = percentDTPIDTotal;
	totalEventBudgetDisplay.value = numberWithCommas(totalEventBudgetDisplay2);
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

//logic to show red if percentage is not correct
function overPercentage(){
	if (percentDTPIDTotal > 35){
		percentDTPIDTotalDisplay.classList.add("showcaseRed");
	} else {
		percentDTPIDTotalDisplay.classList.remove("showcaseRed");
	}
}

//logic to make submit button read only or not
function showSubmit(){
	if(requestedAmount == summedDTPIDFunds && percentDTPIDTotal <= 35 && hotelRoomNights > 30 && totalRevenue > 5000){
		document.getElementById("submit").removeAttribute("disabled");
	}
	else {
		document.getElementById("submit")
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

// function doEstimationCalculations(){
// 	estimationChoiceResult = Math.round(estimationNumberInput * estimationChoiceFactor * 1)/1;
// 	estimationChoiceResultDisplay.textContent = numberWithCommas(estimationChoiceResult);
// 	hotelRoomNights = Number(estimationChoiceResult);
// 	hotelRoomNightsDisplay.value = numberWithCommas(estimationChoiceResult);
// 	totalRevenue = Math.round(estimationChoiceResult * hotelRoomRate * 1e12) / 1e12;
// 	totalRevenueDisplay.textContent = numberWithCommas(totalRevenue);
// 	finalDTPIDAmount = Math.floor(totalRevenue / 10);
// 	checkIfOverMax();
// 	setRequestedAmount();
// 	setPreApprovedAmount();
// }

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

function clearEstimationChoice(){
	estimationChoice0.classList.remove("hide");
	estimationChoice1.classList.add("hide");
	estimationChoice2.classList.add("hide");
	estimationChoice3.classList.add("hide");
	estimationResult.classList.add("hide");
	estimationChoiceFactor = 0;
	estimationNumberInput = 0;
	estimationNumberInputDisplay.value = 0;
	hotelRoomRate = 168;
	doEstimationCalculations();
	hotelRoomRateDisplay.value = hotelRoomRate;
	hotelRoomRateDisplay.readOnly = true;
	requestedAmount = 0;
}

//adding statement from check if over max
function fillInFinalDTPIDFields(var1){
	finalDTPIDAmountDisplay.textContent = numberWithCommas(var1);
	totalDTPIDFundsDisplay.textContent = numberWithCommas(var1);
	matchDTPIDFunds2.textContent = numberWithCommas(var1);
	dtpidFundsAvailableDisplay.textContent = numberWithCommas(var1);
}

//change requested amount, funds available and totals at once
function setFundsDisplayNumbers(num){
	requestedAmountDisplay.value = numberWithCommas(num);
	dtpidFundsAvailableDisplay.textContent = numberWithCommas(num);
	totalDTPIDFundsDisplay.textContent = numberWithCommas(num);
	matchDTPIDFunds2.textContent = numberWithCommas(num);
}

function showEstimationChoice(){
	estimationChoice0.classList.add("hide");
	estimationResult.classList.remove("hide");
	estimationChoiceFactorDisplay.textContent = estimationChoiceFactor;
}

function resetAllFinalDTPIDAmounts(){
	finalDTPIDAmountDisplay.textContent = numberWithCommas(requestedAmount);
	dtpidFundsAvailableDisplay.textContent = numberWithCommas(requestedAmount);
	totalDTPIDFundsDisplay.textContent = numberWithCommas(requestedAmount);
}
  
//function to add commas to numbers greater than 999.909  
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//submit function to open email to send extra documents
function myFunction() {
	var email = 'maribeth@visitdallas.com';
	var subject = eventOrganization + ', ' + eventName + " - Post Event: Supplemental Documents";
	window.location.href='mailto:'+email+'?subject='+subject;
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







