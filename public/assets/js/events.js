let percentDTPIDFundsTotal = 0;
let totalEventBudgetDisplay = document.getElementsByClassName("totEBudget").item(0);

totalEventBudgetDisplay,addEventListener("change", totalFundingFunctions);

function totalFundingFunctions() {
	doTotalBudgetCalculations();
	overPercentage();
	showSubmit();
}

function doTotalBudgetCalculations(){
	let totalEventBudget = Number(parseFloat(totalEventBudgetDisplay.value.replace(/,/g, '')));
	percentDTPIDFundsTotal = Math.floor(requestedAmount / (totalEventBudget/100));
	document.getElementById("perFTotDis").textContent = percentDTPIDFundsTotal;
	totalEventBudgetDisplay.value = numberWithCommas(totalEventBudget);
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