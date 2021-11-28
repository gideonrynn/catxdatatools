
function getDateInputValue() {

    // get original list submitted by user
    let originalList = document.querySelector("#input-date").value;

    //add to progress log as collapsed string with commas using regex
    //replace double commas - which appear when there is an empty string between values - with null
    console.log("Processing the following dates -------");
    console.log(originalList.trim().replace(/\n/g, ",").replace(/,,/g,",null"));

    // trim white space and separate into array so we can evaluate each item appropriately
    let inputArray = originalList.trim().split("\n");

    // add to progress log
    console.log("Trimmed whitespace, applied newline");

    return inputArray;
}

function runDateValidation() {
    
    dateArray = getDateInputValue();

    if (dateArray.length > 0) {
        console.log("Starting validation on date input...");

        let inputFormat = [];
        //d metacharacter [0-9]
        let regFormatMDYYYY = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        let regFormatYYYYMMDD = /^\d{4}\d{1,2}\d{1,2}$/;

        //optional - allow to be any separators /^\d{2}[./-]\d{2}[./-]\d{4}$/

        dateArray.forEach(date => {

            if (regFormatMDYYYY.test(date)) {
                console.log("Format M/D/YYYY", date);
                inputFormat.push("MDYYYY");
            } else if (regFormatYYYYMMDD.test(date)) {
                console.log("Format YYYYMMDD", date);
                inputFormat.push("YYYYMMDD");
            } else {
                console.log("Values in input do not match the formats on file");
                progressUpdate += "Values in input do not match the formats on file" + "\n";
            }

        });

        // get unique value using Set or filter/index of
        let checkFormats = [...new Set(inputFormat)];
        console.log(checkFormats);

        if (checkFormats.length > 1) {
            console.log("There are multiple date formats");
            progressUpdate += "Input contains multiple date formats. Update input values." + 
            "\n";
        } else {
            progressUpdate += "Format = " + checkFormats + "\n";
        }

        if (checkFormats[0] === "MDYYYY") {
            document.querySelector("#formatMDY").removeAttribute("disabled");
        } else if (checkFormats[0] === "YYYYMMDD") {
            document.querySelector("#formatYMD").removeAttribute("disabled");
        }

        console.log(progressUpdate);

    }
    
}

function formatDates(format) {
    
    document.querySelector("#output").textContent = "";
    let originalDatesList = document.querySelector("#input-date").value;
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

    console.log(newDatesList);

    document.querySelector('#output-date').textContent = newDatesList;
    document.querySelector("#clear-right").removeAttribute("disabled");
    document.querySelector("#clear-all").removeAttribute("disabled");

}

function clearOutput(id) {

    if(id === "clear-left") {
        document.querySelector('#input').value = "";
    }
    if(id === "clear-right") {
        document.querySelector('#output-date').innerHTML = "";
        document.querySelector("#clear-right").setAttribute("disabled", true);
    }
    if(id === "clear-all") {
        document.querySelector('#input-date').value = "";
        document.querySelector('#output-date').innerHTML = "";
    }
}