
/* TODO
	-calculate each assignment Percentage on edit
	-give each assignment green or red depening on grade change
		-also on total grades
	-Grade Marks
	-Delete added assignments
*/

let whatIfEnabled = false
let currentValue = ""
let docBody

//document.getElementById("ctl00_MainContent_subPageHead_lblPageTitle").addEventListener("click", exitWhatIfClicked)

//document.querySelector("#ctl00_MainContent_subGBS_DataDetails_ctl01_tdScore").children[0].children[0].children[0].children[0].children[0].value
//<div id="addAssignmentButton" style="color: white; background-color: rgb(57, 109, 181); margin-left: 42%; box-sizing: border-box; border-radius: 10px; height: 40px; width: 195px" class="page-title">Add Assignment <span style="color:white; font-weight: 800"><span>&nbsp;</span>+</span></div>
function loadWhatIfButton() {
	
	// let allAssignments = document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable")
	// let addDiv = document.createElement("div");
	// let addTr = document.createElement("tr");
	
	//Add What If enable button
	let whatIfButton = document.createElement("div");
	whatIfButton.innerHTML = "What-If ✎"
	whatIfButton.classList = "page-title"
	whatIfButton.id = "What-If-Button"
	whatIfButton.style = "color: white; background-color: #396DB5; box-sizing:border-box; margin-left: 30%; border-radius: 10px; height: 40px; margin-top: 2px; padding-top: 4px"
	
	let exitButton = document.createElement("div")
	exitButton.innerHTML = "Exit"
	exitButton.classList = "page-title"
	exitButton.id = "Exit-Button"
	exitButton.style = "display: none; color: white; background-color: rgb(57, 109, 181); box-sizing: border-box; margin-left: 1%; border-radius: 10px; height: 40px; margin-top: 2px; padding-top: 4px;"
	
	loadCalculateButton()
	
	
	document.querySelector(".page-head").children[0].insertAdjacentElement("afterend", exitButton)
	document.querySelector(".page-head").children[0].insertAdjacentElement("afterend", whatIfButton)
	
	document.getElementById("What-If-Button").addEventListener("click", whatIfClicked)
	document.getElementById("Exit-Button").addEventListener("click", exitWhatIfClicked)
	
	
	
	
}
loadWhatIfButton()
function loadCalculateButton() {
	document.querySelector(".SectionHeader").innerHTML += '<span style="display: none; color: #396DB5; background-color: white; box-sizing:border-box; margin-left: 30%; border-radius: 10px; height: 40px; margin-top: 2px; padding-top: 5px; padding-bottom: 4px; padding-left: 3%; padding-right: 3%" id="Calculate-Button">Calculate</span>'
	document.getElementById("Calculate-Button").addEventListener("click", whatIfClicked)
}
function loadAddAssignmentButton() {
	
	//Add assignments button
	let addAssignmentButtonMainDiv = document.createElement("div");
	let assignmentButton = document.createElement("div");
	assignmentButton.innerHTML = 'Add Assignment <span style="color:white; font-weight: 800"><span>&nbsp;</span>+</span>'
	assignmentButton.id = "addAssignmentButton"
	assignmentButton.classList = "page-title"
	assignmentButton.style = "color: white; background-color: rgb(57, 109, 181); margin-left: 42%; box-sizing: border-box; border-radius: 10px; height: 40px; width: 195px; padding-top: 5px"
	addAssignmentButtonMainDiv.classList = "page-head"
	addAssignmentButtonMainDiv.style = "margin-bottom: 30px"
	addAssignmentButtonMainDiv.appendChild(assignmentButton)
	document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable").insertAdjacentElement("afterend", addAssignmentButtonMainDiv)
	document.getElementById("addAssignmentButton").addEventListener("click", addAssignmentClicked)
	//document.getElementById("addAssignmentButton").parentElement.insertAdjacentElement("afterend", document.createElement("br"))
}

function whatIfClicked() {
	loadCalculateButton()
	document.getElementById("Exit-Button").style.display = null
	document.getElementById("What-If-Button").innerHTML = "Calculate"
	document.getElementById("Calculate-Button").style.display = null
	
	document.getElementById("ctl00_MainContent_subGBS_dlGN").onfocus = function(){exitWhatIfClicked()}
	
	if (whatIfEnabled == false) {docBody = document.querySelector("div.AllAssignments").innerHTML; console.log("ran")}
	if (document.getElementById("ctl00_MainContent_subGBS_dlGN").value != currentValue) {currentValue = document.getElementById("ctl00_MainContent_subGBS_dlGN").value; whatIfEnabled = false}
	console.log(getResults())
	if (!document.getElementById("addAssignmentButton")) {loadAddAssignmentButton()}
	if (whatIfEnabled == false) {
		whatIfEnabled = true
	}
}
function exitWhatIfClicked() {
	document.querySelector("div.AllAssignments").innerHTML = docBody
	document.getElementById("Exit-Button").style.display = "none"
	document.getElementById("Calculate-Button").style.display = "none"
	document.getElementById("What-If-Button").innerHTML = "What-If ✎"
	whatIfEnabled = false
}

function addAssignmentClicked() {
	
	let categoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody").childElementCount)-3 : (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(5) > tbody").childElementCount)-3
	let categoryNames = []
	let chosenCategoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? "4" : "5"
	for (i=0;i<categoryCount;i++) {
		categoryNames[categoryNames.length] = document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(${chosenCategoryCount}) > tbody`).children[i+2].children[0].innerHTML;
}
	let dropDownContent = ""
	
	
	console.log("here")
	let table = document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody")
	let fillerAssignment = document.createElement("tr")
	let assignments = document.getElementsByClassName("assignment-info").length
	let newNum = Number(assignments)+1
	fillerAssignment.classList = "forceHide"
	
	
	// for (i=0; i<categoryNames.length;i++) {
	// 	dropDownContent += `<div id='option${newNum}-${i}' onclick="document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(${newNum*2}) > td:nth-child(3)').innerHTML = changeLastCharachters(${newNum},${categoryNames[i]})">${categoryNames[i]}</div>`
		
	// }
	
	for (i=0; i<categoryNames.length;i++) {
		dropDownContent += `<option>${categoryNames[i]}</option>`
		
	}
	
	let newAssignment = document.createElement("tr")
	newAssignment.classList = "assignment-info zebra highlight-row normalmode TableView forceShow"
	newAssignment.innerHTML = `				
					<td class="PlainDataClear al vat NoWrap row-span" rowspan="1">
						<i class="Clickable vam icon-small-collapsed" onclick="ExpandDetails(this)" title="Click to Expand" data-expanded="false" aria-hidden="true"></i>
						${newNum}
						<div class="assignment-details" style="display: none;">
							<div class="assignment-details-inner" style="width: 1124.11px;">
								
								<span class="details-title">Date Assigned:</span>&nbsp; &nbsp; <span class="details-title">Due Time:</span> 
								<div class="description">
									<span class="details-title">Long Description:</span> &nbsp;
								</div>
							
							</div>
						</div>					
					</td>
					<td class="PlainDataClear al vat"><input type="text"></input></td>
					<td class="PlainDataClear al vat" id="addedAssignment${newNum}" style="white-space: nowrap;"><select id="select${newNum}" class="selectCategory" onchange="document.querySelector('addedAssignment${newNum}').outerHTML = changeLastCharachters(${newNum},document.getElementById("select${newNum}").value);">
					<option selected disabled></option>
					${dropDownContent}
					</select> Annotations/Classwork</td>

					

					<td id="ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(newNum-1)}_tdScore" class="PlainDataClear ar vat score" align="right" style="padding-right:5px; padding-left:5px;">
						<table border="0" cellpadding="0" cellspacing="0"><tbody><tr>
							<td width="49%" style="white-space:nowrap;"><input type="text" style="width:50px; heigth:20px" value=""></td>
							<td width="2%" style="">&nbsp;/&nbsp;</td>
							<td width="49%" align="left" style="">10</td>
						</tr></tbody></table>
					</td>

					<td id="ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(newNum-1)}_tdCorrect" class="PlainDataClear ar vat row-span" style="padding-right:5px;">
						<table border="0" cellpadding="0" cellspacing="0" style=""><tbody><tr>
							<td width="49%" style="white-space:nowrap;">&nbsp;&nbsp;&nbsp;</td>
							<td width="2%" style=";">&nbsp;/&nbsp;</td>
							<td width="49%" align="left" style=";">10</td>
						</tr></tbody></table>
					</td>

					<td id="ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(newNum-1)}_tdPerc" class="PlainDataClear ar vat row-span" style="padding-right:5px;"></td>

				
					

					<td class="PlainDataClear al vat row-span"></td>

					<td class="PlainDataClear ar vat row-span"></td>
					<td class="PlainDataClear ar vat row-span">10/01/2021</td>
					<td class="PlainDataClear ac vat row-span">No</td>
					<td class="PlainDataClear al vat row-span">
						
					`
		table.insertAdjacentElement("beforeend", fillerAssignment)
		table.insertAdjacentElement("beforeend", newAssignment)
		
		
	console.log("clicked")
	
}

function getCategoryNames(categoryCount) {
	let categoryNames = []
	let chosenCategoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? "4" : "5"
	for (i=0;i<categoryCount;i++) {
categoryNames[categoryNames.length] = document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(${chosenCategoryCount}) > tbody`).children[i+2].children[0].innerHTML;
percentOfGrade[percentOfGrade.length] = (document.querySelector("#ctl00_MainContent_subGBS_DataSummary_ctl"+twoDigit(i)+"_tdPctOfGrade")) ? document.querySelector("#ctl00_MainContent_subGBS_DataSummary_ctl"+twoDigit(i)+"_tdPctOfGrade").innerHTML : "100.00%"
}
	return categoryNames
}

function cleanResults(res) {
	let cleaned = ""
	for (a=0;a < res[0].length; a++) {
	cleaned += `${(res[0][a]).toString()}: `
		for (b=0; b < res[1][a].length; b++) {
			cleaned += `${res[1][a][b]}  `
		}
		cleaned += `\n`
	}
	cleaned += `Total: `
	return cleaned
}

function changeLastCharachters(index, replacement) {
	console.log(index, replacement)
	//return document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(${index*2}) > td:nth-child(3)`).innerHTML.substr(0, ((document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(${index*2}) > td:nth-child(3)`).innerHTML.length)-replacement.length)) + replacement.toString()
	return `document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(2) > td:nth-child(3)').innerHTML.substr(0, ((document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(${index*2}) > td:nth-child(3)').innerHTML.length)-(document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(${index*2}) > td:nth-child(3)').innerText.length-1))) + '${replacement.toString()}'`
	console.log("again")
	
}

function twoDigit(i) {
if(i<9) {

return "0"+(i+1).toString()
}else{
return (i+1).toString()
}
}
function getResults() {
	console.log("getResults Running")
let assignments = document.getElementsByClassName("assignment-info")
function checkNum(i) {
input = Number(i)
if (isNaN(i) == false) {return i} else {return "0"}
}

let amountCorrect = 0
let amountTotal = 0
let activePoints = 0
let totalPercentage = 0
let totalGrade = 0
let results = []
let percentOfGrade = []
let values = []

let categoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody").childElementCount)-3 : (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(5) > tbody").childElementCount)-3

//if (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) {return (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody").childElementCount)-3 } else { return (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(5) > tbody").childElementCount)-3}
let categoryNames = []
	let chosenCategoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? "4" : "5"
	for (i=0;i<categoryCount;i++) {
categoryNames[categoryNames.length] = document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(${chosenCategoryCount}) > tbody`).children[i+2].children[0].innerHTML;
percentOfGrade[percentOfGrade.length] = (document.querySelector("#ctl00_MainContent_subGBS_DataSummary_ctl"+twoDigit(i)+"_tdPctOfGrade")) ? document.querySelector("#ctl00_MainContent_subGBS_DataSummary_ctl"+twoDigit(i)+"_tdPctOfGrade").innerHTML : "100.00%"
}


console.log("CATEGORYNAMES: " + categoryNames)


for (c=0;c<categoryCount;c++){
name = categoryNames[c]
//console.log("NAME: "+ name)
for (i=0;i<assignments.length;i++) {
currentName = (document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child('+((i+1)*2).toString()+') > td:nth-child(3)').textContent).trim()
//console.log(currentName)
gradingComplete = document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child("+((i+1)*2).toString()+") > td.PlainDataClear.ac.vat.row-span").innerHTML
selector = "#ctl00_MainContent_subGBS_DataDetails_ctl" + twoDigit(i) + "_tdScore"

//Adding Input Feilds
if (whatIfEnabled == false) {
	
	document.querySelector(selector).children[0].children[0].children[0].children[1].style = ";"
	document.querySelector(selector).children[0].children[0].children[0].children[2].style = ";"
	
	//currentValue = document.getElementById("ctl00_MainContent_subGBS_dlGN").value
values[values.length] = (document.querySelector(selector).children[0].children[0].children[0].children[0].innerHTML).trim()
	let isMissing = ""
	if (document.querySelector(selector).children[0].children[0].children[0].children[0].style.backgroundColor == "rgb(255, 0, 0)") {
		isMissing = "border-color: rgb(255,0,0);"
	}
console.log("InputFeild")
document.querySelector(selector).children[0].children[0].children[0].children[0].innerHTML = `<input type='text' style='${isMissing}width:50px; heigth:20px' value='${(values[i]).replace(/&nbsp;/gi,'')}'>`
//console.log("isNaN: "+isNaN(checkNum(document.querySelector("#ctl00_MainContent_subGBS_DataDetails_ctl01_tdScore").children[0].children[0].children[0].children[0].children[0].value)))
	isMissing = ""
}
//--Adding Input Feilds
console.log("inserted");
if (currentName == name && ((document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value).trim() != "" || document.querySelector(selector).children[0].children[0].children[0].children[0].style.backgroundColor == "rgb(255, 0, 0)"/*gradingComplete == "Yes"*/)){

console.log("name if")
//iString = (i+1).toString()
//console.log(selector)
//console.log(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[0].innerHTML))
//console.log(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[2].innerHTML))

amountCorrect += Number(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value))
//console.log("TEST: "+document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value)
console.log(amountTotal, currentName, i+1)
amountTotal += Number(document.querySelector(selector).children[0].children[0].children[0].children[2].innerHTML)


}
console.log("here?")
}
console.log("end of first for");

totalPercentage = checkNum(Number((amountCorrect)/Number(amountTotal))*100)
results[results.length] = [amountCorrect.toFixed(2), amountTotal, Number(totalPercentage).toFixed(2)]

//console.log(amountCorrect,amountTotal, ((amountCorrect/amountTotal)*100).toFixed(2))
amountCorrect = 0, amountTotal = 0, totalPercentage = 0
}
console.log("end of for");
	///Get Total Grade Percentage
for (i=0;i<percentOfGrade.length;i++) {
	if (Number(results[i][1]) != 0) {
		activePoints += Number(percentOfGrade[i].slice(0,-1)/100)
		//console.log("Acticve Points Upper: "+activePoints)
	}
	//console.log(Number(percentOfGrade[i].slice(0,-1)/100))
	//console.log(Number(results[i][2]))
	totalGrade += (Number(percentOfGrade[i].slice(0,-1)/100) * Number(results[i][2]))
	//console.log(totalGrade)
}
//console.log("Acticve Points: "+activePoints)
totalGrade = totalGrade / activePoints


console.log(percentOfGrade)
//console.log(results)
 alert(cleanResults([categoryNames, results]) + totalGrade.toFixed(2))
return cleanResults([categoryNames, results]) + totalGrade.toFixed(2)
}
