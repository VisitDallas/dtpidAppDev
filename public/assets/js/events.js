let percentDTPIDFundsTotal = 0;
let totalEventBudgetDisplay = document.getElementsByClassName("totEBudget").item(0);
let percentDTPIDTotalDisplay = document.getElementById("perFTotDis");

//let estimationSelection = document.getElementById("00N0b000007v5C5");
let estimationChoicePicker = document.getElementsByClassName("estCP").item(0);
let estimationChoiceDisplay = document.getElementsByClassName("estChoiceDisplay");
let estimationChoice0 = document.getElementById("estimationChoice0");
let estimationResult = document.getElementById("estimationResult");
let estimationChoiceFactorDisplay = document.getElementById("estimationChoiceFactorDisplay");
let estimationChoiceFactor = 0;
let estimationNumberInputDisplay = document.getElementsByClassName("numIn").item(0);
let estimationNumberInput = 0;
let estimationChoiceResultDisplay = document.getElementById("estimationChoiceResultDisplay");
let estimationChoiceResult = 0;

let partialPaymentMath = .25;
let partialRequestedAmount = document.getElementById("00N0b00000899kp");
let finalRequestedAmount = document.getElementById("00N0b00000Cbqrv");
let matchDTPIDFunds1 = document.getElementById("matchDTPIDFunds1");
let matchDTPIDFunds2 = document.getElementById("matchDTPIDFunds2");
let totalDTPIDFundsDisplay = document.getElementById("totFDis");
let submitButton = document.getElementById("submit");

//based on what is selected for estimation choice, setting appropriate values
estimationChoicePicker.addEventListener("change", function(){
	if (estimationChoicePicker.selectedIndex === 1){
		setEstimationAmounts(0.09, 1);
	} else if (estimationChoicePicker.selectedIndex === 2){
		setEstimationAmounts(1.0, 2);
		hotelRoomRateDisplay.readOnly = false;
	} else if (estimationChoicePicker.selectedIndex === 3) {
		setEstimationAmounts(0.6, 3);
	} else{
		clearEstimationChoice();
	}
});

//do math and show proper value based on estimation factor and index of item
function setEstimationAmounts(factor, index) {
	//reseting math
	clearEstimationChoice();
	//showing appropriate explanation and factor value
	estimationChoiceDisplay.item(index).classList.remove("hide");
	estimationChoiceFactor = factor;
	//showing factor and total room nights
	showEstimationChoice();
	//doing math
	doEstimationCalculations();
}

//reseting all values to givens
function setDefaultChoices() {
	estimationChoice0.classList.remove("hide");
	//hiding all estimation explanations
	for (i = 1; i < estimationChoiceDisplay.length; i++) {
		estimationChoiceDisplay.item(i).classList.add("hide");
	}
	estimationResult.classList.add("hide");
	//reseting values to default
	estimationChoiceFactor = estimationNumberInput = 0;
	estimationNumberInputDisplay.value = 0;
	hotelRoomRate = 168;
}

estimationNumberInputDisplay.addEventListener("change", function(){
	estimationNumberInputDisplay.value = parseFloat(estimationNumberInputDisplay.value.replace(/,/g, ''));
	estimationNumberInput = Number(estimationNumberInputDisplay.value);
	doEstimationCalculations();
	matchTotals();
	showSubmit();
	doTotalBudgetCalculations();
	overPercentage();
	estimationNumberInputDisplay.value = numberWithCommas(estimationNumberInput);
});

function clearEstimationChoice(){
	setDefaultChoices();
	doEstimationCalculations();
	hotelRoomRateDisplay.value = hotelRoomRate;
	hotelRoomRateDisplay.readOnly = true;
	requestedAmount = 0;
}

function showEstimationChoice(){
	estimationChoice0.classList.add("hide");
	estimationResult.classList.remove("hide");
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
	partialCalculator();
	finalDTPIDAmountDisplay.textContent = numberWithCommas(finalDTPIDAmount);
	totalDTPIDFundsDisplay.textContent = numberWithCommas(requestedAmount);
	matchDTPIDFunds2.textContent = numberWithCommas(requestedAmount);	
}

totalEventBudgetDisplay,addEventListener("change", totalFundingFunctions);

function totalFundingFunctions() {
	doTotalBudgetCalculations();
	overPercentage();
	showSubmit();
}

function partialCalculator(){
	//calculate the partial payment
	let partialRequestedAmount1 = partialPaymentMath * requestedAmount;
	partialRequestedAmount.value = partialPaymentMath * requestedAmount;
	//calculate the final payment
	finalRequestedAmount.value = requestedAmount - partialRequestedAmount1;
}

function doTotalBudgetCalculations(){
	let totalEventBudget = Number(parseFloat(totalEventBudgetDisplay.value.replace(/,/g, '')));
	percentDTPIDFundsTotal = Math.floor(requestedAmount / (totalEventBudget/100));
	percentDTPIDTotalDisplay.textContent = percentDTPIDFundsTotal;
	totalEventBudgetDisplay.value = numberWithCommas(totalEventBudget);
}

//logic to show red if percentage is not correct
function overPercentage(){
	if (percentDTPIDFundsTotal > 35){
		percentDTPIDTotalDisplay.classList.add("showcaseRed");
	} else {
		percentDTPIDTotalDisplay.classList.remove("showcaseRed");
	}
}

//function to add commas to numbers
function numberWithCommas(x) {
    return x.toLocaleString();
}

function formatPhoneNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}
	return phoneNumberString;
}

//logic to make submit button read only or not
function showSubmit(){
	if(requestedAmount == summedDTPIDFunds && percentDTPIDFundsTotal <= 35 && hotelRoomNights > 30 && totalRevenue > 5000){
		submitButton.removeAttribute("disabled");
	}
	else {
		submitButton.setAttribute("disabled", "true");
	}
}

