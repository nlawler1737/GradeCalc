
/* TODO
	-calculate each assignment Percentage on edit
	-give each assignment green or red depening on grade change
		-also on total grades
	-Grade Marks
	-Delete added assignments??
*/

/*document.querySelector("style").innerHTML += `

#What-If-Button:hover{
	background-color: #507fbf;
}
#addAssignmentButton:hover{
	background-color: #507fbf;
}
#Calculate-Button:hover{
	background-color: #e2e9f2;
}
#Exit-Button:hover{
	background-color: #507fbf;
}

`
*/
let whatIfEnabled = false
let currentValue = ""
let docBody
let values = [[],[],[]]
let totals = []
let mainTotal
let categoryCount
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
	//document.getElementById("Calculate-Button").style.display = null
	
	document.getElementById("ctl00_MainContent_subGBS_dlGN").onfocus = function(){exitWhatIfClicked()}
	
	if (whatIfEnabled == false) {docBody = document.querySelector("div.AllAssignments").innerHTML; //console.log("ran")
		
	}
	if (document.getElementById("ctl00_MainContent_subGBS_dlGN").value != currentValue) {
		currentValue = document.getElementById("ctl00_MainContent_subGBS_dlGN").value;
		whatIfEnabled = false;
		categoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody").childElementCount)-3 : (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(5) > tbody").childElementCount)-3
		values = [[],[],[]];
		mainTotal = Number(document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(categoryCount)}_tdPCT`).innerHTML.replace("%",""))
		for (i=0;i<categoryCount;i++) {
			totals[i] = [
				Number(document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPTS`).innerHTML),
				Number(document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMX`).innerHTML),
				Number(document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPCT`).innerHTML.replace("%",""))
				]
		}
		
	}
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
	document.getElementById("modifiedGradeModal").outerHTML = ""
	whatIfEnabled = false
}

function addAssignmentClicked() {
	
	let categoryNames = []
	let chosenCategoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? "4" : "5"
	for (i=0;i<categoryCount;i++) {
		categoryNames[categoryNames.length] = document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(${chosenCategoryCount}) > tbody`).children[i+2].children[0].innerHTML;
}
	let dropDownContent = ""
	
	
	//console.log("here")
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
					<td class="PlainDataClear al vat"><input type="text" placeholder="(optional)"></input></td>
					<td class="PlainDataClear al vat" id="addedAssignment${newNum}" style="white-space: nowrap;"><select id="select${newNum}" class="selectCategory" onchange="changeLastCharachters(this);">
					<option selected disabled></option>
					${dropDownContent}
					</select> <-- Select Category</td>

					

					<td id="ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(newNum-1)}_tdScore" class="PlainDataClear ar vat score" align="right" style="padding-right:5px; padding-left:5px;">
						<table border="0" cellpadding="0" cellspacing="0"><tbody><tr>
							<td width="49%" style="white-space:nowrap;"><input type="text" class="addedInputField" style="width:50px; heigth:20px" value=""></td>
							<td width="2%" style="">&nbsp;/&nbsp;</td>
							<td width="49%" align="left" style=""><input type="text" class="addedInputField" style="width:50px; heigth:20px" value=""></td>
						</tr></tbody></table>
					</td>

					<td id="ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(newNum-1)}_tdCorrect" class="PlainDataClear ar vat row-span" style="padding-right:5px;">
						<table border="0" cellpadding="0" cellspacing="0" style=""><tbody><tr>
							<td width="49%" style="white-space:nowrap;"></td>
							<td width="2%" style=";"></td>
							<td width="49%" align="left" style=";"></td>
						</tr></tbody></table>
					</td>

					<td id="ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(newNum-1)}_tdPerc" class="PlainDataClear ar vat row-span" style="padding-right:5px;"></td>

				
					

					<td class="PlainDataClear al vat row-span"></td>

					<td class="PlainDataClear ar vat row-span"></td>
					<td class="PlainDataClear ar vat row-span"></td>
					<td class="PlainDataClear ac vat row-span">What-If</td>
					<td class="PlainDataClear al vat row-span">
						
					`
		table.insertAdjacentElement("beforeend", fillerAssignment)
		table.insertAdjacentElement("beforeend", newAssignment)
		
		updateOnBlur()
	//console.log("clicked")
	
}

function setPercentInfo(i, type) {
	//i += -1
	selector = "#ctl00_MainContent_subGBS_DataDetails_ctl" + twoDigit(i) + "_tdScore"
if (type == true) {
	document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).innerHTML = ((Number(document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value)/Number(document.querySelector(selector).children[0].children[0].children[0].children[2].children[0].value))*100).toFixed(2) + "%"
	document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).style.color = "black"
} else if (type == false) {
	document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).innerHTML = "Dropped"
	document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).style.color = "black"
} else if (type == "extra") {
	document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).innerHTML = "+" + Number(document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value) + "pts"
	document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).style.color = "#009300"
} else if (type == "down") {
	document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).style.color = "red"
} else if (type == "up") {
	//document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).innerHTML = ((Number(document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value)/Number(document.querySelector(selector).children[0].children[0].children[0].children[2].children[0].value))*100).toFixed(2) + "%"
	document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).style.color = "#009300"
}
}

function createModal(res, total) {
	//console.log(res)
	//console.log(total);
	let modalHeight = 45
	let addedCategoryInfo = ''
	let names = getCategoryNames(categoryCount)
	for (i=0;i<categoryCount;i++) {
		if (res[i][2] >= 97) {
			letterGrade = "A+"
		} else if (res[i][2] >= 93) {
			letterGrade = "A"
		} else if (res[i][2] >= 90) {
			letterGrade = "A-"
		} else if (res[i][2] >= 87) {
			letterGrade = "B+"
		} else if (res[i][2] >= 83) {
			letterGrade = "B"
		} else if (res[i][2] >= 80) {
			letterGrade = "B-"
		} else if (res[i][2] >= 77) {
			letterGrade = "C+"
		} else if (res[i][2] >= 73) {
			letterGrade = "C"
		} else if (res[i][2] >= 70) {
			letterGrade = "C-"
		} else if (res[i][2] >= 67) {
			letterGrade = "D+"
		} else if (res[i][2] >= 65) {
			letterGrade = "D"
		} else if (res[i][2] >= 60) {
			letterGrade = "D-"
		} else if (Number(res[i][1]) == 0) {
			letterGrade = "-"
		} else {
			letterGrade = "F"
		}
		
	let color = ["black","black","black","black"]
		if (res[i][0] > totals[i][0]+0.01) {
			color[0] = "green"
		} else if (res[i][0] < totals[i][0]-0.01) {
			color[0] = "red"
		}
		if (res[i][1] > totals[i][1]+0.01) {
			color[1] = "green"
		} else if (res[i][1] < totals[i][1]-0.01) {
			color[1] = "red"
		}
		if (res[i][2] > totals[i][2]+0.01) {
			color[2] = "green"
		} else if (res[i][2] < totals[i][2]-0.01) {
			color[2] = "red"
		}
		if (res[i][3] > totals[i][3]+0.01) {
			color[3] = "green"
		} else if (res[i][3] < totals[i][3]-0.01) {
			color[3] = "red"
		}
		console.log(names[i])
		console.log(names[i].toString())
		names[i] = (names[i].length <= 12) ? names[i] : names[i].substring(0,12) + "..."
		console.log(names[i])
		
		addedCategoryInfo += `
		<tr>
		<td class="PlainDataClear al vat row-span" row-span="1" style="width:33.33%; padding-right: 10px;">
		${names[i]}
		</td>
		<td class="PlainDataClear ar vat row-span" row-span="1" style="width:33.33%; padding-right: 10px; color: ${color[0]}">
		${res[i][0]}
		</td>
		<td class="PlainDataClear ar vat row-span" row-span="1" style="width:33.33%; padding-right: 10px; color: ${color[1]}">
		${res[i][1]}
		</td>
		<td class="PlainDataClear ar vat row-span" row-span="1" style="width:33.33%; padding-right: 10px; color: ${color[2]}">
		${res[i][2]}%
		</td>
		<td class="PlainDataClear ac vat row-span" row-span="1" style="width:33.33%; padding-right: 10px; color: ${color[3]}">
		${letterGrade}
		</td>
		</tr>
		`
		modalHeight += 22
	}
	let color = "black"
	let mainTotal = Number(document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(categoryCount)}_tdPCT`).innerHTML.replace("%",""))
	if (Number(total) > mainTotal+0.01) {
		color = "green"
	} else if (Number(total) < mainTotal-0.01) {
		color = "red"
	}
	
	let modal = document.createElement("div")
	modal.id = "modifiedGradeModal"
	document.body.insertAdjacentElement("beforeend", modal)
	document.getElementById("modifiedGradeModal").outerHTML = `
	<div  id="modifiedGradeModal" style="display: block;position: fixed;bottom: 0;right: 0;padding-bottom: 10px;">
	
	<div style="padding-left: 96px; padding-bottom: 5px">
	<span class="modal-button" style="padding-left: 20px; padding-right:20px; background-color: #6C788D; padding-top: 3px; padding-bottom: 3px; border-radius: 10px; color: white;" >Calculate</span>
	<span class="modal-button" style="padding-left: 20px; padding-right:20px; background-color: #6C788D; padding-top: 3px; padding-bottom: 3px; border-radius: 10px; color: white;" >Exit</span>
	</div>
	
	<table style="background-color: white; width: 360px; height: ${modalHeight}px; border-radius: 10px;box-shadow: 0px 0px 20px 0px #888888; margin-right: 15px;margin-bottom: 25px;">
    <tbody>
        <tr>
            <td class="PlainDataClear al vat row-span" row-span="1" style="width:50%; padding-right: 10px">
                <strong>Category</strong>
            </td>
            <td class="PlainDataClear ac vat row-span" row-span="1" style="width:33.33%; padding-right: 10px">
                <strong>Points</strong>
            </td>
            <td class="PlainDataClear ac vat row-span" row-span="1" style="width:33.33%; padding-right: 10px">
                <strong>Max</strong>
            </td>
            <td class="PlainDataClear ac vat row-span" row-span="1" style="width:33.33%; padding-right: 10px">
                <strong>Perc</strong>
            </td>
            <td class="PlainDataClear ac vat row-span" row-span="1" style="width:33.33%; padding-right: 10px">
                <strong>Mark</strong>
            </td>
        </tr>
		${addedCategoryInfo}
		<tr>
			<td class="PlainDataClear al vat row-span" style="width: 50%">
			<strong>Total</strong>
			</td>
			<td class="PlainDataClear al vat row-span" style="width: 33.33%">
			&nbsp;
			</td>
			<td class="PlainDataClear al vat row-span" style="width: 33.33%">
			&nbsp;
			</td>
			<td class="PlainDataClear ac vat row-span" style="width: 33.33%; color: ${color}">
			<strong>${total}%</strong>
			</td>
			<td class="PlainDataClear ac vat row-span" style="width: 33.33%; color: ${color}">
			<strong>${getLetterGrade(Number(total))}</strong>
			</td>
		</tr>
    </tbody>
</table>
</div>
	`
	document.querySelectorAll('.modal-button')[0].addEventListener("click", whatIfClicked)
	document.querySelectorAll('.modal-button')[1].addEventListener("click", exitWhatIfClicked)
}


function getCategoryNames(categoryCount) {
	let categoryNames = []
	let chosenCategoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? "4" : "5"
	for (i=0;i<categoryCount;i++) {
		categoryNames[categoryNames.length] = document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(${chosenCategoryCount}) > tbody`).children[i+2].children[0].innerText;
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

function setTotals(results, total) {
	for (a=0;a<results.length;a++) {
  	arr = results[a]
		for (b=0;b<arr.length;b++) {
			results[a][b] = Number(results[a][b])
		}
	}
	let resultsTotal = Number(total.replace("%",""))
	let letterGrade = ""
	document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(categoryCount)}_tdPCT`).innerHTML = total + "%"
	for (i=0; i<categoryCount; i++) {
		document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPTS`).innerHTML = results[i][0].toFixed(2)
		document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMX`).innerHTML = results[i][1]
		document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPCT`).innerHTML = results[i][2]+"%"
		
		if (results[i][0] > totals[i][0]+0.01) {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPTS`).style.color = "#009300"
		} else if (results[i][0] < totals[i][0]) {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPTS`).style.color = "red"
		} else {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPTS`).style.color = "black"
		}
		
		if (results[i][1] > totals[i][1]+0.01) {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMX`).style.color = "#009300"
		} else if (results[i][1] < totals[i][1]) {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMX`).style.color = "red"
		} else {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMX`).style.color = "black"
		}
		
		if (results[i][2] > totals[i][2]+0.01) {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPCT`).style.color = "#009300"
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMK`).style.color = "#009300"
		} else if (results[i][2] < totals[i][2]) {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPCT`).style.color = "red"
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMK`).style.color = "red"
		} else {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPCT`).style.color = "black"
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMK`).style.color = "black"
		}
		
		if (resultsTotal > (mainTotal + 0.01)) {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(categoryCount)}_tdPCT`).style.color = "#009300"
		} else if (resultsTotal < mainTotal) {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(categoryCount)}_tdPCT`).style.color = "red"
		} else {
			document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(categoryCount)}_tdPCT`).style.color = "black"
		}


		if (results[i][2] >= 97) {
			letterGrade = "A+"
		} else if (results[i][2] >= 93) {
			letterGrade = "A"
		} else if (results[i][2] >= 90) {
			letterGrade = "A-"
		} else if (results[i][2] >= 87) {
			letterGrade = "B+"
		} else if (results[i][2] >= 83) {
			letterGrade = "B"
		} else if (results[i][2] >= 80) {
			letterGrade = "B-"
		} else if (results[i][2] >= 77) {
			letterGrade = "C+"
		} else if (results[i][2] >= 73) {
			letterGrade = "C"
		} else if (results[i][2] >= 70) {
			letterGrade = "C-"
		} else if (results[i][2] >= 67) {
			letterGrade = "D+"
		} else if (results[i][2] >= 65) {
			letterGrade = "D"
		} else if (results[i][2] >= 60) {
			letterGrade = "D-"
		} else {
			letterGrade = "F"
		}
		
		document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMK`).innerHTML = letterGrade
		
	}
}

function getLetterGrade(perc) {
	if (perc >= 97) {
			return "A+"
		} else if (perc >= 93) {
			return "A"
		} else if (perc >= 90) {
			return "A-"
		} else if (perc >= 87) {
			return "B+"
		} else if (perc >= 83) {
			return "B"
		} else if (perc >= 80) {
			return "B-"
		} else if (perc >= 77) {
			return "C+"
		} else if (perc >= 73) {
			return "C"
		} else if (perc >= 70) {
			return "C-"
		} else if (perc >= 67) {
			return "D+"
		} else if (perc >= 65) {
			return "D"
		} else if (perc >= 60) {
			return "D-"
		} else {
			return "F"
		}
}

function changeLastCharachters(input/*index, replacement*/) {
	let newValue = input.value
	let idNum = input.id.replace("select", "")
	document.getElementById(`addedAssignment${idNum}`).innerHTML = document.getElementById(`addedAssignment${idNum}`).innerHTML.substr(0, ((document.getElementById(`addedAssignment${idNum}`).innerHTML.length)-(document.getElementById(`addedAssignment${idNum}`).innerHTML.replace(/.*(\>)/g,"").trim()).length)) + `${newValue}`
	/*
	console.log(input)
	//return document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(${index*2}) > td:nth-child(3)`).innerHTML.substr(0, ((document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(${index*2}) > td:nth-child(3)`).innerHTML.length)-replacement.length)) + replacement.toString()
	return `document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(2) > td:nth-child(3)').innerHTML.substr(0, ((document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(${index*2}) > td:nth-child(3)').innerHTML.length)-(document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child(${index*2}) > td:nth-child(3)').innerText.length-1))) + '${replacement.toString()}'`
	console.log("again")
	*/
}

function updateOnBlur() {
	for (i=0;i<document.getElementsByClassName("addedInputField").length;i++) {
	document.getElementsByClassName("addedInputField")[i].addEventListener("input",getResults)
	}
}

function twoDigit(i) {
if(i<9) {

return "0"+(i+1).toString()
}else{
return (i+1).toString()
}
}
let timesRan = 0
// let totals = []
// let mainTotal = Number(document.getElementById("ctl00_MainContent_subGBS_DataSummary_ctl04_tdPCT").innerHTML.replace("%",""))
// for (i=0;i<categoryCount;i++) {
// 	totals[i] = [
// 		Number(document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPTS`).innerHTML),
// 		Number(document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdMX`).innerHTML),
// 		Number(document.getElementById(`ctl00_MainContent_subGBS_DataSummary_ctl${twoDigit(i)}_tdPCT`).innerHTML.replace("%",""))
// 		]
// }




function getResults() {
	//console.log("getResults Running")
let assignments = document.getElementsByClassName("assignment-info")
function checkNum(i) {
input = Number(i)
if (isNaN(i) == false) {return i} else {return "0"}
}
// if (document.getElementById("ctl00_MainContent_subGBS_dlGN").value) {
// 	values = [[],[],[]]
// }
let amountCorrect = 0
let amountTotal = 0
let activePoints = 0
let totalPercentage = 0
let totalGrade = 0
let results = []
let percentOfGrade = []
//let categoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody").childElementCount)-3 : (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(5) > tbody").childElementCount)-3

//if (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) {return (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody").childElementCount)-3 } else { return (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(5) > tbody").childElementCount)-3}
let categoryNames = []
	let chosenCategoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody")) ? "4" : "5"
	for (i=0;i<categoryCount;i++) {
categoryNames[categoryNames.length] = document.querySelector(`#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(${chosenCategoryCount}) > tbody`).children[i+2].children[0].innerHTML;
percentOfGrade[percentOfGrade.length] = (document.querySelector("#ctl00_MainContent_subGBS_DataSummary_ctl"+twoDigit(i)+"_tdPctOfGrade")) ? document.querySelector("#ctl00_MainContent_subGBS_DataSummary_ctl"+twoDigit(i)+"_tdPctOfGrade").innerHTML : "100.00%"
}


//console.log("CATEGORYNAMES: " + categoryNames)


for (c=0;c<categoryCount;c++){
name = categoryNames[c]
//console.log("NAME: "+ name)
for (i=0;i<assignments.length;i++) {
currentName = document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child('+((i+1)*2).toString()+') > td:nth-child(3)').innerHTML.replace(/.*(\>)/g,"").trim()
//console.log(currentName)
gradingComplete = document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child("+((i+1)*2).toString()+") > td.PlainDataClear.ac.vat.row-span").innerHTML
selector = "#ctl00_MainContent_subGBS_DataDetails_ctl" + twoDigit(i) + "_tdScore"

//Adding Input Feilds
if (whatIfEnabled == false) {
	
	document.querySelector(selector).children[0].children[0].children[0].children[1].style = ";"
	document.querySelector(selector).children[0].children[0].children[0].children[2].style = ";"
	//currentValue = document.getElementById("ctl00_MainContent_subGBS_dlGN").value
	
	
	
values[0][values[0].length] = (document.querySelector(selector).children[0].children[0].children[0].children[0].innerHTML).trim()
values[1][values[1].length] = (document.querySelector(selector).children[0].children[0].children[0].children[2].innerHTML).trim()


	let isMissing = ""
	if (document.querySelector(selector).children[0].children[0].children[0].children[0].style.backgroundColor == "rgb(255, 0, 0)") {
		isMissing = "border-color: rgb(255,0,0);"
	}
//console.log("InputFeild")
document.querySelector(selector).children[0].children[0].children[0].children[0].innerHTML = `<input type='text' class="addedInputField" style='${isMissing}width:50px; heigth:20px' value='${(values[0][i]).replace(/&nbsp;/g,'')}'>`
document.querySelector(selector).children[0].children[0].children[0].children[2].innerHTML = `<input type='text' class="addedInputField" style='width:50px; heigth:20px' value='${(values[1][i]).replace(/&nbsp;/g,'')}'>`

//console.log("isNaN: "+isNaN(checkNum(document.querySelector("#ctl00_MainContent_subGBS_DataDetails_ctl01_tdScore").children[0].children[0].children[0].children[0].children[0].value)))
	isMissing = ""
	
}
if (timesRan < assignments.length) {
values[2][values[2].length] = (document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).innerHTML.replace("%","")).trim()

}

setPercentInfo(i, true)
//if (timesRan < assignments.length) {
	
	let currentNumber = Number(values[2][i])
	let calculatedPersentage = Number(document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).innerHTML.replace("%",""))
	//console.log("CALCULATED PERSENTAGE "+calculatedPersentage)
	//console.log("CURRENT NUMBER "+currentNumber)
	
if (document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value == "") {
	setPercentInfo(i, false)
	//console.log("false")
} else if (document.querySelector(selector).children[0].children[0].children[0].children[2].children[0].value == "0") {
	setPercentInfo(i, "extra")
	//console.log("extre")
} else if ((Number(document.querySelector(`#ctl00_MainContent_subGBS_DataDetails_ctl${twoDigit(i)}_tdPerc`).innerHTML.replace("%",""))) < Number(values[2][i])) {
	setPercentInfo(i, "down")
	//console.log("down")
} else if (calculatedPersentage > currentNumber) {
	setPercentInfo(i, "up")
	//console.log("up")
} else if (values[2][i] == "" && calculatedPersentage == 0) {
	setPercentInfo(i, "down")
}
//}


//--Adding Input Feilds
//console.log("inserted");
if (currentName == name && ((document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value).trim() != "" || document.querySelector(selector).children[0].children[0].children[0].children[0].style.backgroundColor == "rgb(255, 0, 0)"/*gradingComplete == "Yes"*/)){
if (document.querySelector(selector).children[0].children[0].children[0].children[2].children[0].value == "") {
	document.querySelector(selector).children[0].children[0].children[0].children[2].children[0].value = 0
}
//console.log("name if")
//iString = (i+1).toString()
//console.log(selector)
//console.log(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[0].innerHTML))
//console.log(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[2].innerHTML))

amountCorrect += Number(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value))
//console.log("TEST: "+document.querySelector(selector).children[0].children[0].children[0].children[0].children[0].value)
//console.log(amountTotal, currentName, i+1)
//amountTotal += Number(document.querySelector(selector).children[0].children[0].children[0].children[2].innerHTML)
amountTotal += Number(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[2].children[0].value))

}
//console.log("here?")
timesRan += 1
}
//console.log("end of first for");

totalPercentage = checkNum(Number((amountCorrect)/Number(amountTotal))*100)
results[results.length] = [amountCorrect.toFixed(2), amountTotal, Number(totalPercentage).toFixed(2)]

//console.log(amountCorrect,amountTotal, ((amountCorrect/amountTotal)*100).toFixed(2))
amountCorrect = 0, amountTotal = 0, totalPercentage = 0
}
//console.log("end of for");
//console.log(values[2])
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

updateOnBlur()
//console.log(percentOfGrade)
//console.log(results)
//if (whatIfEnabled == true) {console.log("It did run");alert(cleanResults([categoryNames, results]) + totalGrade.toFixed(2))}
//setTotals(results, totalGrade.toFixed(2))
createModal(results, totalGrade.toFixed(2))
return cleanResults([categoryNames, results]) + totalGrade.toFixed(2)
}
