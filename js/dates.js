
function formatDates(format) {
    
    document.querySelector("#output").textContent = "";
    let originalDatesList = document.querySelector("#input").value;
    let newDatesList = "";
    // console.log("originalDatesList: " + "\n" + originalDatesList + " and the length is: " + originalDatesList.length);

    let sortedDatesList = originalDatesList.trim().split("\n");
    // console.log("sortedDatesList: " + "\n" + sortedDatesList + " and the length is: " + sortedDatesList.length);

    //construct date for each item in the list
    sortedDatesList.forEach(date => {

        let constructedDate = "";
        let sortedMonth = "";
        let sortedDay = "";
        let sortedYear = "";

        if(format === "formatMDY") {

            //set variables for M D YYYY
            sortedMonth = date.split("/")[0];
            sortedDay = date.split("/")[1];
            sortedYear = date.split("/")[2];
            // console.log("Date: " + date + " sortedMonth: " + sortedMonth + " sortedDay: " + sortedDay + " sortedYear " + sortedYear)

            // check to see if 0's need to be applied for MM or DD
            if(sortedMonth.length < 2) {
                sortedMonth = 0 + sortedMonth;
            }
            if(sortedDay.length < 2) {
                sortedDay = 0 + sortedDay;
            }

            //construct output date in YYYYMMDD format
            constructedDate = sortedYear + sortedMonth + sortedDay;
            // console.log("Date in YYYYMMDD format: " + constructedDate);
        }

        if(format === "formatYMD") {
            //validate that it is 8 characters
            // if(format.length > 8) {
            //     return 'not a valid number of characters for date';
            // }

            //set variables for YYYY MM DD with substring
            sortedMonth = date.substring(4,6);
            sortedDay = date.substring(6,8);
            sortedYear = date.substring(0,4);

            if(sortedMonth.startsWith(0,0)) {
                sortedMonth = sortedMonth.substring(1,2);
            }

            if(sortedDay.startsWith(0,0)) {
                sortedDay = sortedDay.substring(1,2);
            }

            constructedDate = sortedMonth + '/' + sortedDay + '/' + sortedYear;
        }

        //add date validation
        // let proposedDate = new Date(sortedYear,sortedMonth - 1,sortedDay - 1);
        // console.log(proposedDate);
        // if (proposedDate.getFullYear() == sortedYear && proposedDate.getMonth() == sortedMonth && proposedDate.getDate() == sortedDay) {
        //   return "Success";
        // } else {
        // return "This is not a valid date: " + proposedDate;
        //}

        //add to final dates list that will appear in output
        newDatesList += constructedDate + "\n";

    })

    document.querySelector('#output').textContent = newDatesList;
    document.querySelector("#clear-right").removeAttribute("disabled");
    document.querySelector("#clear-all").removeAttribute("disabled");
    console.log(document.querySelector('#output').innerHTML);

}

function clearOutput(id) {

    if(id === "clear-left") {
        document.querySelector('#input').value = "";
    }
    if(id === "clear-right") {
        document.querySelector('#output').innerHTML = "";
        document.querySelector("#clear-right").setAttribute("disabled", true);
    }
    if(id === "clear-all") {
        document.querySelector('#input').value = "";
        document.querySelector('#output').innerHTML = "";
    }
}