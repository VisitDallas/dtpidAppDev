let percentDTPIDFundsTotal = 0;
let totalEventBudgetDisplay = document.getElementById("00N0b00000CbKPj");

document.getElementById("00N0b00000CbKPj"),addEventListener("change", totalFundingFunctions);

function totalFundingFunctions() {
	doTotalBudgetCalculations();
	overPercentage();
	showSubmit();
}

function doTotalBudgetCalculations(){
	let totalEventBudget = Number(parseFloat(totalEventBudgetDisplay.value.replace(/,/g, '')));
	percentDTPIDFundsTotal = Math.floor(requestedAmount / (totalEventBudget/100));
	document.getElementById("percentDTPIDFundsTotalDisplay").textContent = percentDTPIDFundsTotal;
	totalEventBudgetDisplay.value = numberWithCommas(totalEventBudget);
}

function showSubmit(){
	if(requestedAmount == summedDTPIDFunds && percentDTPIDFundsTotal <= 35 && hotelRoomNights > 30 && totalRevenue > 5000){
		submitButton.removeAttribute("disabled");
	}
	else {
		submitButton.setAttribute("disabled", "true");
	}
}