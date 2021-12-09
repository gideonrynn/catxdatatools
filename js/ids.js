/* To Do:
*export getInputValue function as module so it can be shared
*set up progress log field
*/

let progressUpdate = "";
// let validationRun = false;

function getIdsInputValue() {

    // get original list submitted by user
    let originalList = document.querySelector("#input-fiddler").value;

    //add to progress log as collapsed string with commas using regex
    //replace double commas - which appear when there is an empty string between values - with null
    console.log("Processing the following ids -------");
    console.log(originalList.trim().replace(/\n/g, ",").replace(/,,/g,",null"));

    // trim white space and separate into array so we can evaluate each item appropriately
    let inputArray = originalList.trim().split("\n");

    // add to progress log
    console.log("Trimmed whitespace, applied newline");

    return inputArray;
}

function clearOutput() {
    // clear output between conversions
    document.querySelector('#output').textContent = "";
}

function noInput() {
    let originalList = document.querySelector('#input').value;
    if(!originalList) {
        document.querySelector('#output').textContent = "No info";
    }
}

function runValidation() {

    //add to progress log
    console.log("Starting validation on id input...");
    
    numArray = getIdsInputValue();

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

            //log to progress updates
            console.log("This is not a number: " + number);

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
        progressUpdate += "Input contains entries with more than 10 digits: " + "\n" + plusTenDigits + "\n";
    }

    if (nonIds.length > 0) {
        progressUpdate += "Input contains non id values: " + "\n" + nonIds + "\n";
    }

    if (blankLines) {
        progressUpdate += "Blank line(s) detected" + "\n";
    }
    
    progressUpdate += "Validation complete on ids input"+ "\n";

    //add to progress log
    console.log(progressUpdate);

    //  document.querySelector('#progress').textContent = progressUpdate;
  
}

function addZeroes(id) {

    clearOutput();

    numArray = getIdsInputValue();
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
                //log to progress update
                console.log(`${number} already 10 digit id`);
            }

            tenDigitNums = tenDigitNums + number + "\n"; 

            
        } else {
            //log to progress update
            console.log("Empty string, removing from output");
        }
        
    })

    if(id) {

        //log to progress update
        progressUpdate += existingIds.length + " already contains 10 digits" + "\n" + existingIds;
        progressUpdate += tenDigitNums.length + " ids updated with zeroes" + "\n";

        return tenDigitNums;

    } else {
        
        //add to progress log
        progressUpdate += existingIds.length + " already contain 10 digits" + "\n" + existingIds;
        progressUpdate += "Zeroes applied: " + tenDigitNums.trim().replace(/\n/g, ", ").replace(/,,/g,",null,") + "\n";
        document.querySelector('#output').innerHTML = tenDigitNums;

        // document.querySelector('#progress').innerHTML = progressUpdate;
        console.log(progressUpdate);

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
    console.log(document.querySelector('#output').innerHTML);
}


function addZeroesAndQuotes(id) {

    let withZeroes = addZeroes(id);
    addQuotes(withZeroes);

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

function copyResultToInput() {
    document.querySelector('#input').value = "";
    let outputList = document.querySelector('#output').value;
    document.querySelector('#input').value = outputList;
    // document.querySelector('#input').innerHTML = outputList;
    // console.log("done")

}

// function clearOutput() {
//     document.querySelector('#output').innerHTML = "";
    // console.log(document.querySelector('#output').innerHTML);
    // console.log(document.querySelector('#output').textContent);
// }

function clearOutputRight() {
    document.querySelector('#output').innerHTML = "";
    // document.querySelector('#output-comment').innerHTML = "";
    // document.querySelector('#output-comment').classList.remove("overTen");
    document.querySelector("#clear-right").setAttribute("disabled", true);
    // document.querySelector("#results-to-input").setAttribute("disabled", true);
}

function clearInputLeft() {
    // console.log("clicked!")
    document.querySelector('#input-fiddler').value = "";
    // document.querySelector('#input-comment').innerHTML = "";
}

function copyToClipboard() {
    let copyOutput = document.querySelector("#output").textContent;
    // copyOutput.select();
    // copyOutput.setSelectionRange(0, 99999);
    // document.execCommand("copy");

    navigator.clipboard.writeText(copyOutput)
    .then(() => {
    console.log("Text copied to clipboard...")
})
    .catch(err => {
    console.log('Something went wrong', err);
})
}

// function highlightActions() {
//     console.log("highlighted");
// }

// function addCSSClass() {
// }
// function applyZeroesandQuotes {

// }