/*Description: settings that are agnostic to the tools that use them
*/

/*ToDo: update clearing text inputs so it will pass in the id for updates instead of specifics
*/

let selectedTool = "";
let selectOptions = [
     { 
        id:"1", 
        name:"id", 
        tool:"id-fiddler",
        toolName:"ID Fiddler",
        instructions:`Enter list of IDs as a single column on the left. Choose buttons with   <i class="fa fa-chevron-right fac-btn"></i> to generate desired results. Select icons in toolbar to apply actions to box content. Results are in TEXT format.`
    }, 
    {
        id:"2", 
        name:"date", 
        tool:"date-formatter",
        toolName:"Date Formatter",
        instructions:"Button options will be available based on data entered in input box. If the format entered does not match [enter format] or [enter format], no date option will be displayed."
    }, 
    {
        id:"3",
        name:"duplicate",
        tool:"duplicate-checker",
        toolName:"Duplicate Checker",
        instructions:"Blah blah blah"
    }
];

function init() {
    setSelection();
};

function setSelection(selection) {
    console.log('firing');

    if (!selection) {
        // by default, display the first tool in the array
        document.querySelector("#"+selectOptions[0].tool).style.display = "";
        document.querySelector("#"+selectOptions[0].name).classList.add("current");
        document.querySelector("#instructions-description").innerHTML = selectOptions[0].instructions;
    } else {
        selectOptions.forEach(option => {
            
            // display selected option
            if (selection === option.name) {
                console.log(option)
                document.querySelector("#"+option.tool).style.display = "";
                document.querySelector("#"+option.name).classList.add("current");
                document.querySelector("#instructions-description").innerHTML = option.instructions;
            } else {
                // remove visibility and selections from all other tools
                document.querySelector("#" + option.tool).style.display = "none"
                document.querySelector("#"+option.name).classList.remove("current");
            }
        });
    }
    
};

// function manualToggler() {

//     // let dataBar = document.querySelector("[data-bar='bar']");
//     // let dataBarStatus = dataBar.classList;

//     dataBar.classList.remove('show');

// }
let progressUpdate = "";
let todaysDate = new Date().toLocaleTimeString();

function gbUpdateProgress(update) {
    
    let progressText = document.querySelector("#progress-text");

    progressUpdate += todaysDate + "\t" + "\t" + update + "\n";
    progressText.textContent = progressUpdate;
    progressText.scrollHeight;
};

function clearOutput(id) {

    if(id === "clear-left") {
        document.querySelector('#input-date').value = "";
        document.querySelector("#formatYMD").setAttribute("disabled", "");
        document.querySelector("#formatMDY").setAttribute("disabled", "");
    }
    if(id === "clear-right") {
        document.querySelector('#output-date').innerHTML = "";
        document.querySelector("#clear-right").setAttribute("disabled", true);
    }
    if(id === "clear-all") {
        document.querySelector('#input-date').value = "";
        document.querySelector('#output-date').innerHTML = "";
        document.querySelector("#formatYMD").setAttribute("disabled", "");
        document.querySelector("#formatMDY").setAttribute("disabled", "");
    }
}

function clearOutput() {
    // clear output between conversions
    document.querySelector('#output').textContent = "";
}

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

function copyResultToInput() {
    document.querySelector('#input').value = "";
    let outputList = document.querySelector('#output').value;
    document.querySelector('#input').value = outputList;
    // document.querySelector('#input').innerHTML = outputList;
    // console.log("done")

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


// function clearOutput() {
//     document.querySelector('#output').innerHTML = "";
    // console.log(document.querySelector('#output').innerHTML);
    // console.log(document.querySelector('#output').textContent);
// }


// function highlightActions() {
//     console.log("highlighted");
// }

// function addCSSClass() {
// }
// function applyZeroesandQuotes {

// }


init();