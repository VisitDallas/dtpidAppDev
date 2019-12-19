function doTotalBudgetCalculations(){
	let totalEventBudgetDisplay = Number(document.getElementById("00N0b00000CbKPj").value);
	let percentDTPIDFundsTotal = Math.floor(requestedAmount / (totalEventBudget / 100));
	document.getElementById("percentDTPIDFundsTotalDisplay").textContent = percentDTPIDFundsTotal;
	numberWithCommas(totalEventBudgetDisplay.value);
}