function applyOldTheme(){
    let themeSwitchButton = document.getElementsByClassName("theme-switch-button")[0];
    let storedTheme = localStorage.getItem("theme");
    if(storedTheme){
        if(storedTheme==="dark"){
            themeSwitchButton.click();
        }
    }
}

export {applyOldTheme};