function doTotalBudgetCalculations(){
	let totalEventBudgetDisplay = document.getElementById("00N0b00000CbKPj").value;
	let totalEventBudget = Number(totalEventBudgetDisplay) / 100;
	let percentDTPIDFundsTotal = Math.floor(requestedAmount / totalEventBudget);
	document.getElementById("percentDTPIDFundsTotalDisplay").textContent = percentDTPIDFundsTotal;
	numberWithCommas(totalEventBudgetDisplay.value);
}