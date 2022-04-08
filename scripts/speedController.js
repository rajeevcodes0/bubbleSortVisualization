const speedController = ()=>{
    let speedControllerDiv = document.querySelector(".speed-controller");
    let speedControllerDivNumber = speedControllerDiv.querySelector("span");
    let root = document.querySelector(":root");
    
    speedControllerDiv.addEventListener("click",function(){
        if(speedControllerDivNumber.innerText==="1"){
            speedControllerDivNumber.innerText="2";
            root.style.setProperty("--animation-duration","0.5s");
        }else if(speedControllerDivNumber.innerText==="2"){
            speedControllerDivNumber.innerText="3";
            root.style.setProperty("--animation-duration","0.25s");
        }else if(speedControllerDivNumber.innerText==="3"){
            speedControllerDivNumber.innerText="1";
            root.style.setProperty("--animation-duration","1s");
        }

    })

}

export {speedController};