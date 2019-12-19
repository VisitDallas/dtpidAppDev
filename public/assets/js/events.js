let percentDTPIDFundsTotal = 0;
let totalEventBudgetDisplay;

document.getElementById("00N0b00000CbKPj"),addEventListener("change", totalFundingFunctions);

function totalFundingFunctions() {
	doTotalBudgetCalculations();
	overPercentage();
	showSubmit();
}

function doTotalBudgetCalculations(){
	totalEventBudgetDisplay = Number(parseFloat(document.getElementById("00N0b00000CbKPj").value.replace(/,/g, '')));
	let totalEventBudget = totalEventBudgetDisplay / 100;
	percentDTPIDFundsTotal = Math.floor(requestedAmount / totalEventBudget);
	document.getElementById("percentDTPIDFundsTotalDisplay").textContent = percentDTPIDFundsTotal;
	totalEventBudgetDisplay.value.toLocaleString();
}

function numberWithCommas(x) {
    return x.toLocaleString();
}

function showSubmit(){
	if(requestedAmount == summedDTPIDFunds && percentDTPIDFundsTotal <= 35 && hotelRoomNights > 30 && totalRevenue > 5000){
		submitButton.removeAttribute("disabled");
	}
	else {
		submitButton.setAttribute("disabled", "true");
	}
}