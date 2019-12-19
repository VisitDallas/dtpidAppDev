let totalEventBudget = 0;
let percentDTPIDTotal = 0;

function doTotalBudgetCalculations(){
	let totalEventBudgetDisplay.value = parseFloat(document.getElementById("00N0b00000CbKPj").value.replace(/,/g, ''));
	let totalEventBudgetDisplay2 = totalEventBudgetDisplay;
	totalEventBudget = Number(totalEventBudgetDisplay.value) / 100;
	percentDTPIDFundsTotal = Math.floor(requestedAmount / totalEventBudget);
	document.getElementById("percentDTPIDFundsTotalDisplay").textContent = percentDTPIDFundsTotal;
	totalEventBudgetDisplay.value = numberWithCommas(totalEventBudgetDisplay2);
}