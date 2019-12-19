let totalEventBudget = 0;
let percentDTPIDTotal = 0;

function doTotalBudgetCalculations(){
	let totalEventBudgetDisplay.value = document.getElementById("00N0b00000CbKPj");
	totalEventBudget = Number(totalEventBudgetDisplay.value) / 100;
	percentDTPIDFundsTotal = Math.floor(requestedAmount / totalEventBudget);
	document.getElementById("percentDTPIDFundsTotalDisplay").textContent = percentDTPIDFundsTotal;
	numberWithCommas(totalEventBudgetDisplay.value);
}