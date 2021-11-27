
function getInputValue() {

    // get original list submitted by user
    let originalList = document.getElementById("input").value;

    // trim white space and separate into array so we can evaluate each item appropriately
    let inputArray = originalList.trim().split("\n");

    return inputArray;
}

function runDuplicateValidation() {
    console.log("data entered in input for duplicates");
    
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