let selectedTool = "";
let selectOptions = [
     { 
        id:"1", 
        name:"id", 
        tool:"id-fiddler",
        toolName:"CATracks ID Fiddler"
    }, 
    {
        id:"2", 
        name:"date", 
        tool:"date-formatter",
        toolName:"Date Formatter"
    }, 
    {
        id:"3",
        name:"duplicate",
        tool:"duplicate-checker",
        toolName:"Duplicate Checker"
    }
];

function init() {
    setSelection();
};

function setSelection(selection) {

    if (!selection) {
        // by default, display the first tool in the array
        document.querySelector("#"+selectOptions[0].tool).style.display = "";
        document.querySelector("#"+selectOptions[0].name).classList.add("current");
    } else {
        selectOptions.forEach(option => {
            // display selected option
            if (selection === option.name) {
                document.querySelector("#"+option.tool).style.display = "";
                document.querySelector("#"+option.name).classList.add("current");
            } else {
                // remove visibility and selections from all other tools
                document.querySelector("#" + option.tool).style.display = "none"
                document.querySelector("#"+option.name).classList.remove("current");
            }
        });
    }
    
};



init();