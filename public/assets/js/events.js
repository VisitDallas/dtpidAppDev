let percentDTPIDFundsTotal = 0;
let totalEventBudgetDisplay = document.getElementsByClassName("totEBudget").item(0);
let percentDTPIDTotalDisplay = document.getElementById("perFTotDis");

let estimationSelection = document.getElementById("00N0b000007v5C5");
let estimationChoice0 = document.getElementById("estimationChoice0");
let estimationChoice1 = document.getElementById("estimationChoice1");
let estimationChoice2 = document.getElementById("estimationChoice2");
let estimationChoice3 = document.getElementById("estimationChoice3");
let estimationResult = document.getElementById("estimationResult");
let estimationSelected = document.getElementsByClassName("estSel");
let estimationChoiceFactorDisplay = document.getElementById("estimationChoiceFactorDisplay");
let estimationChoiceFactor = 0;
let estimationNumberInputDisplay = document.getElementById("00N0b000007vPGg");
let estimationNumberInput = 0;
let estimationChoiceResultDisplay = document.getElementById("estimationChoiceResultDisplay");
let estimationChoiceResult = 0;

estimationSelection.addEventListener("change", function(){
	if (estimationSelection.selectedIndex === 1){
		clearEstimationChoice();
		estimationChoice1.classList.remove("hide");
		estimationChoiceFactor = 0.09;
		showEstimationChoice();
		doEstimationCalculations();
	} else if (estimationSelection.selectedIndex === 2){
		clearEstimationChoice();
		estimationChoice2.classList.remove("hide");
		estimationChoiceFactor = 1.0;
		showEstimationChoice();
		hotelRoomRateDisplay.readOnly = false;
		doEstimationCalculations();
	} else if (estimationSelection.selectedIndex === 3){
		clearEstimationChoice();
		estimationChoice3.classList.remove("hide");
		estimationChoiceFactor = 0.6;
		showEstimationChoice();
		doEstimationCalculations();
	} else{
		clearEstimationChoice();
	}
});

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
	estimationChoice0.classList.remove("hide");
	for (var i = 0; i < estimationSelected.length; i++) {
		estimationSelected[i].className += "hide";
	}
	estimationChoiceFactor = 0;
	estimationNumberInput = 0;
	estimationNumberInputDisplay.value = 0;
	hotelRoomRate = 168;
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

//logic to make submit button read only or not
function showSubmit(){
	if(requestedAmount == summedDTPIDFunds && percentDTPIDFundsTotal <= 35 && hotelRoomNights > 30 && totalRevenue > 5000){
		submitButton.removeAttribute("disabled");
	}
	else {
		submitButton.setAttribute("disabled", "true");
	}
}

