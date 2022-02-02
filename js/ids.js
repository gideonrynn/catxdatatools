/* To Do:
*export getInputValue function as module so it can be shared
*set up progress log field
*fix 4 lines to 1 line if it still has issues switching
*/

// let validationRun = false;

function idGetInputValue() {

    // get original list submitted by user
    let originalList = document.querySelector("#input-fiddler").value;

    //add to progress log as collapsed string with commas using regex
    //replace double commas - which appear when there is an empty string between values - with null

    gbUpdateProgress("Processing the following ids -----");
    gbUpdateProgress(originalList.trim().replace(/\n/g, ", ").replace(/,,/g,",null"));
    
    // trim white space and separate into array so we can evaluate each item appropriately
    let inputArray = originalList.trim().split("\n");
    gbUpdateProgress("Trimmed whitespace, applied newline");

    let idsTotal = inputArray.length;
    gbUpdateProgress("Total of " + idsTotal + " ids in input");

    return inputArray;
}

// function noInput() {
//     let originalList = document.querySelector('#input').value;
//     if(!originalList) {
//         document.querySelector('#output').textContent = "No info";
//     }
// }

function runValidation() {

    gbUpdateProgress("Starting validation on ids input...");
    
    numArray = idGetInputValue();

    let validationError = false;
    let plusTenDigits = [];
    let nonIds = [];
    let blankLines = false;

    //will need to decide if styling will be applied to textarea numbers, would need to use contenteditable
    let newInput = document.querySelector("#input-fiddler");

    numArray.forEach(number => {
        
        let regCheck = /^-?[0-9]+$/;

        if (number === null || number === "") {

            blankLines = true;
            return;
            
        } 

        //if string value contains values other than 0-9, it is not a number that should be processed as a CATracks ID
        //and the user should be notified
        if (!regCheck.test(number)) {

            nonIds.push(number || "blank");
            gbUpdateProgress("This is not a number: " + number);

        } else {
        
            let numberOfDigits = number.length;

            if (number !== "" && number !== null && numberOfDigits > 10) {
                plusTenDigits.push(number);
                // will need to decide if styling will be applied to textarea numbers, would need to use contenteditable
                // newInput.classList.add("warning");

            } else {
                //will need to decide if styling will be applied to textarea numbers, would need to use contenteditable
                //if not, remove this else
                //newInput.classList.remove("warning");  
            }

        }

    })

    if(plusTenDigits > 0) {
        gbUpdateProgress("Input contains entries with more than 10 digits: " + "\n" + plusTenDigits || "\n");
    }

    if (nonIds.length > 0) {
        gbUpdateProgress("Input contains non id values: " + "\n" + nonIds + "\n");
    }

    if (blankLines) {
        gbUpdateProgress("Blank line(s) detected" + "\n");
    }
    
    gbUpdateProgress("Validation complete on ids input");
}

function addZeroes(id) {

    clearOutput();

    numArray = idGetInputValue();
    // console.log("numarray: " + numArray);

    let tenDigitNums = "";
    let existingIds = [];

    // calculate number of zeroes to be created if any
    numArray.forEach(number => {

        if (number !== "" && number !== null) {
            number = parseInt(number, 10);

            let numberOfDigits = number.toString().length;
            let numberOfZeroes = 10 - numberOfDigits;

            if(numberOfZeroes > 0 && number !== null && number !== "") {
                for(let counter = 0; counter < numberOfZeroes; counter++) {
                    tenDigitNums += 0
                };
                // console.log(tenDigitNums);
            } else if (numberOfZeroes <= 0 && number !== null && number !== "") {

                existingIds.push(number);            
                gbUpdateProgress(`${number} already 10 digit id`);
            }

            tenDigitNums = tenDigitNums + number + "\n"; 

        } else {
 
            gbUpdateProgress("Empty string, removing from output");
        }
        
    })

    if(id) {

        //log to progress update
        gbUpdateProgress(existingIds.length + " value already contains 10 digits" + "\n" + existingIds);
        gbUpdateProgress(tenDigitNums.length + " ids updated with zeroes");

        return tenDigitNums;

    } else {
        
        //add to progress log
        gbUpdateProgress(existingIds.length + " already contain 10 digits" + "\n" + existingIds);
        gbUpdateProgress("Zeroes applied: " + tenDigitNums.trim().replace(/\n/g, ", ").replace(/,,/g,",null,") + "\n");
        document.querySelector('#output').innerHTML = tenDigitNums;

        // document.querySelector('#progress').innerHTML = progressUpdate;
        // console.log(progressUpdate);

        // document.querySelector("#clear-right").removeAttribute("disabled");
        // document.querySelector("#results-to-input").removeAttribute("disabled");
        // document.querySelector("#four-line-submit").removeAttribute("disabled");
        // console.log("done")

    }
   
}


function addQuotes(zeroes) {

    document.querySelector('#output').textContent = "";
    let originalList = "";

    if(zeroes) {

        originalList = zeroes;

    } else {

        originalList = document.querySelector('#input-fiddler').value;

    }
        
    let quotesList = "";

    let numArray = originalList.trim().split("\n");
    // console.log("this is the modified list: " + "\n" + numArray + " and the length is: " + numArray.length);

    // remove whitespace and apply quotes
    numArray.forEach((number, index) => {

        CATracksID = number.trim();

        // if last item in array, do not apply comma
        if(index === numArray.length - 1) {
            // console.log("index", index)
            // console.log("index of last item", numArray.length - 1);
            quotesList += "'" + CATracksID + "'";
        } else {
            quotesList += "'" + CATracksID + "'" + "," + " " + "\n";
        }
     
    })

    document.querySelector('#output').textContent = quotesList;
    // document.querySelector("#copy").removeAttribute("disabled");
    // document.querySelector("#clear-right").removeAttribute("disabled");
    // document.querySelector("#results-to-input").removeAttribute("disabled");
    // document.querySelector("#four-line-submit").removeAttribute("disabled");
    // console.log(document.querySelector('#output').innerHTML);
}


function addZeroesAndQuotes(id) {

    let withZeroes = addZeroes(id);
    addQuotes(withZeroes);

}

function onePerLine() {
    let outputList = document.querySelector('#output').value;

    let newOutputList = '';  
    let numArray = outputList.trim().replace(/["]/g, "").split("  ");
    console.log(numArray);

    numArray.forEach((number, index) => {

        console.log(number);
        newOutputList += number + "\n";

    })
       
    console.log(newOutputList);
    document.querySelector('#output').textContent = newOutputList;
    //remove console log
    // console.log(document.querySelector('#output').innerHTML);

}


function fourPerLine() {
    let outputList = document.querySelector('#output').value;

    let newOutputList = '';  
    let numArray = outputList.trim().split("\n");
    // console.log("this is the modified list: " + "\n" + numArray + " and the length is: " + numArray.length);

    //if it is the 4th item, add new line
    //otherwise, take every item in array and add it to that array with a space
    for (var i = 0; i < numArray.length; i++) {

        if(i % 4 === 3) {
            newOutputList += numArray[i] + "\n";
        } else {
            
            newOutputList += numArray[i] + " ";
        }
        
       newOutputList;
    };
    
    document.querySelector('#output').textContent = newOutputList;
    //remove console log
    // console.log(document.querySelector('#output').innerHTML);

}