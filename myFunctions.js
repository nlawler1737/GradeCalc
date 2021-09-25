
//function getResults() {
  let assignments = document.getElementsByClassName("assignment-info")
  function checkNum(i) {
    input = Number(i)
    if (isNaN(i) == false) {return i} else {return "0"}
  }
  function twoDigit(i) {
    if(i<9) {

      return "0"+(i+1).toString()
      }else{
      return (i+1).toString()
    }
  }
  let amountCorrect = 0
  let amountTotal = 0
  let totalPercentage = 0
  let results = []
  let categoryCount = (document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody").childElementCount)-3
  let categoryNames = []

  for (i=0;i<categoryCount;i++) {
    categoryNames[categoryNames.length] = document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table:nth-child(4) > tbody").children[i+2].children[0].innerHTML;
    //console.log("THIS RAN")
  }
  //console.log("CATEGORYNAMES: " + categoryNames)

  for (c=0;c<categoryCount;c++){
    name = categoryNames[c]
    //console.log("NAME: "+ name)
    for (i=0;i<assignments.length;i++) {
      currentName = (document.querySelector('#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child('+((i+1)*2).toString()+') > td:nth-child(3)').textContent).trim()
      //console.log(currentName)
      gradingComplete = document.querySelector("#ctl00_MainContent_subGBS_assignmentsView > table.GradebookDetailsTable.ResultsTable > tbody > tr:nth-child("+((i+1)*2).toString()+") > td.PlainDataClear.ac.vat.row-span").innerHTML
      if (currentName == name && gradingComplete == "Yes"){


        //iString = (i+1).toString()
        selector = "#ctl00_MainContent_subGBS_DataDetails_ctl" + twoDigit(i) + "_tdScore"
        //console.log(selector)
        //console.log(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[0].innerHTML))
        //console.log(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[2].innerHTML))

        amountCorrect += Number(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[0].innerHTML))
        //console.log(amountCorrect)
        amountTotal += Number(checkNum(document.querySelector(selector).children[0].children[0].children[0].children[2].innerHTML))


      }
    }
    totalPercentage = checkNum(Number((amountCorrect)/Number(amountTotal))*100)
    results[results.length] = [amountCorrect.toFixed(2), amountTotal, Number(totalPercentage).toFixed(2)]

    //console.log(amountCorrect,amountTotal, ((amountCorrect/amountTotal)*100).toFixed(2))
    amountCorrect = 0, amountTotal = 0, totalPercentage = 0
  }
  //console.log(results)
  return results
//}
