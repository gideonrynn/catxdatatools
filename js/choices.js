let selectedTool = "";
let selectOptions = [
     { 
        id:"1", 
        name:"id", 
        tool:"id-fiddler",
        toolName:"CATracks ID Fiddler",
        instructions:`Enter list of CATracksIDs as a single column on the left. Choose buttons with   <i class="fa fa-chevron-right fac-btn"></i> to generate desired results. Select icons in toolbar to apply actions to box content. Results are in TEXT format.`
    }, 
    {
        id:"2", 
        name:"date", 
        tool:"date-formatter",
        toolName:"Date Formatter",
        instructions:"Button options will be selected based on entries. If the format entered does not match [enter format] or [enter format], no date option will be displayed"
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
    console.log('firing')

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



init();