let percentDTPIDFundsTotal = 0;
let totalEventBudgetDisplay = document.getElementsByClassName("totEBudget").item(0);
let percentDTPIDTotalDisplay = document.getElementById("perFTotDis");

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
	if (percentDTPIDTotal > 35){
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

