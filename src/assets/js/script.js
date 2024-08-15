// const { window } = require("rxjs");

$(document).ready(function () {
    Toggle();
  
    ToggleSideBar(true)
})

let defaultPrompt = true
function Toggle(){
    if(defaultPrompt==true){
        $("#Starter").show()
        $("#promptArea").hide()
    }
    else{
        $("#Starter").hide()
        $("#promptArea").show()
    }
    defaultPrompt = !defaultPrompt
}
let sideBarOpened = true

function ToggleSideBar(value){
        if(value==true){
            $(".arrow_btn").hide();
            gsap.to('.sidebar-container',{
                x:0,
                width:'350px',
                minWidth:'350px',
                duration:0.30,
                ease:'ease',
                display:'block'
          })

          
        }
        else{
            $(".arrow_btn").show();
            gsap.to('.sidebar-container',{
                width:0,
                minWidth:0,
                x:-400,
                ease:'ease'
          })

        }
    
}