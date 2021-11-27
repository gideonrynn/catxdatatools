let progressUpdate = "";
 
function getInputValue() {

    // get original list submitted by user
    let originalList = document.getElementById("input").value;

    // trim white space and separate into array so we can evaluate each item appropriately
    let inputArray = originalList.trim().split("\n");

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
    console.log("data entered in input for ids")
    
    numArray = getInputValue();
    let validationError = false;
    let numberOfDigitsError = false;
    let newInput = document.querySelector(".area-input");

    numArray.forEach(number => {

        console.log(number);
        thisNumber = parseInt(number, 10);
        
        let numberOfDigits = thisNumber.toString().length;
        console.log(numberOfDigits);
        if (number !== "" && number !== null && numberOfDigits > 10) {
       
            newInput.classList.add("warning");
            numberOfDigitsError = true;

         } else {
            newInput.classList.remove("warning");
            
         }

     })

     if(numberOfDigitsError == true) {
        progressUpdate += "Input contains entries with more than 10 digits" + "\n";
     } else {
        progressUpdate += "Validation complete"+ "\n";
     }

     document.querySelector('#progress').textContent = progressUpdate;

}

function addZeroes(id) {

    clearOutput();

    numArray = getInputValue();
    // console.log("numarray: " + numArray);

    let tenDigitNums = "";

    // calculate number of zeroes to be created if any
    numArray.forEach(number => {

        if (number !== "" && number !== null) {
            number = parseInt(number, 10);
            // console.log("This is the number: " + number + " and this is the type: " + typeof number);
            let numberOfDigits = number.toString().length;
            let numberOfZeroes = 10 - numberOfDigits;

            // if(numberOfDigits > 10) {
            //     document.querySelector('#input-comment').innerHTML = "One of the items below has more than 10 digits";
            //     document.querySelector('#input-comment').classList.add("overTen");
            // }

            if(numberOfZeroes > 0 && number !== null && number !== "") {
                for(let counter = 0; counter < numberOfZeroes; counter++) {
                    tenDigitNums += 0
                };
                // console.log(tenDigitNums);
            }

            tenDigitNums = tenDigitNums + number + "\n"; 
        } else {
            console.log("Empty string, removing from output");
        }
        
    })

    if(id) {
        return tenDigitNums;
    } else {
        // console.log(typeof tenDigitNums);
        progressUpdate += "Zeroes applied: " + tenDigitNums;
        document.querySelector('#output').innerHTML = tenDigitNums;
        document.querySelector('#progress').innerHTML = progressUpdate;
        document.querySelector("#clear-right").removeAttribute("disabled");
        document.querySelector("#results-to-input").removeAttribute("disabled");
        document.querySelector("#four-line-submit").removeAttribute("disabled");
        // console.log("done")

    }

   
}


function addQuotes(zeroes) {

    document.querySelector('#output').textContent = "";
    let originalList = "";

    if(zeroes) {

        originalList = zeroes;

    } else {

        originalList = document.querySelector('#input').value;

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
    document.querySelector("#clear-right").removeAttribute("disabled");
    document.querySelector("#results-to-input").removeAttribute("disabled");
    document.querySelector("#four-line-submit").removeAttribute("disabled");
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
    console.log(document.querySelector('#output').innerHTML);

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
    document.querySelector("#results-to-input").setAttribute("disabled", true);
}

function clearInputLeft() {
    // console.log("clicked!")
    document.querySelector('#input').value = "";
    // document.querySelector('#input-comment').innerHTML = "";
}

// function copyToClipboard() {
//     let copyOutput = document.querySelector("#output");
//     copyOutput.select();
//     copyOutput.setSelectionRange(0, 99999);
//     document.execCommand("copy");
// }

// function highlightActions() {
//     console.log("highlighted");
// }

// function addCSSClass() {
// }
// function applyZeroesandQuotes {

// }