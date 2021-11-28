/* To Do:
*export getInputValue function as module so it can be shared
*/

function getDuplicatesInputValue() {

    // get original list submitted by user
    let originalList = document.querySelector("#input-dup-one").value;

    //add to progress log as collapsed string with commas using regex
    //replace double commas - which appear when there is an empty string between values - with null
    console.log("Processing the following ids -------");
    console.log(originalList.trim().replace(/\n/g, ",").replace(/,,/g,",null,"));

    // trim white space and separate into array so we can evaluate each item appropriately
    let inputArray = originalList.trim().split("\n");

    // add to progress log
    console.log("trimmed whitespace, applied newline");

    return inputArray;
}

function runDuplicateValidation() {
    console.log("data entered in input for duplicates");
    
    let elementArray = getDuplicatesInputValue();
    console.log("Element array is: ", elementArray);
    //log number of elements in input
    let elementArrayNum = elementArray.length;
    
    //log to progress update
    console.log("The number of elements is: " + elementArrayNum);

    let validationError = false;
    let inputTypes = [];
    // let newInput = document.querySelector(".area-input");

    // //check type of elements
    // let numberOfDigitsError = false;

    // elementArray.forEach(element => {
    //     // inputTypes.push(typeof element);
    //     console.log(element.length);
    //     console.log(typeof element);
    //     inputTypes = [...new Set(typeof element)];
    // })

    //log to progress update
    // console.log(inputTypes);

    //  if(numberOfDigitsError == true) {
    //     progressUpdate += "Input contains entries with more than 10 digits" + "\n";
    //  } else {
    //     progressUpdate += "Validation complete"+ "\n";
    //  }

     //log to progress update
     console.log(progressUpdate);
    //  document.querySelector('#progress').textContent = progressUpdate;

    console.log("Executing compare values function");
    compareValues();

}

function compareValues() {
    let originalList1 = document.querySelector("#input-dup-one").value;
    let originalList2 = document.querySelector("#input-dup-two").value;
    
    let inputArray1 = originalList1.trim().split("\n");
    let inputArray2 = originalList2.trim().split("\n");

    let duplicatesArray = inputArray1.filter(value => inputArray2.includes(value)).filter((value, index, self) => self.indexOf(value) === index) ;
    
    if (duplicatesArray.length > 0 ){
        let loggedDuplicates = duplicatesArray.join('\r\n');
        progressUpdate += "Duplicates found: " + duplicatesArray;
        document.querySelector('#output-duplicate').textContent = loggedDuplicates;

        
    } else {
        document.querySelector('#output-duplicate').textContent = "No duplicates found";
    }

    
}