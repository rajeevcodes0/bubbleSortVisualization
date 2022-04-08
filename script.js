import {sleep} from "./scripts/sleep.js";
import {generateNewArray} from "./scripts/generateNewArray.js";
import {convertArrayToString} from "./scripts/convertArrayToString.js";
import {swap} from "./scripts/swap.js";
import {addBlocksToVisualizer} from './scripts/addBlocksToVisualizer.js';
import {applyOldTheme} from "./scripts/applyOldTheme.js";
import {speedController} from "./scripts/speedController.js";


//so that globals don't do scope pollution
function init(){
    
    //globals
    let arrayBeingAnimatedInitialState = [];
    let arrayBeingAnimatedCurrentState = [];
    let globalIndex = 0;
    let globalPass = 1;
    let shouldLoopRun = false;
    let sleepFunctionTime = 1000;
    
    //dom elements that we need to manipulate
    let arrayToTextContainer = document.getElementsByClassName("array-to-text-container")[0];
    let newArrayButton = document.getElementsByClassName("new-array-button")[0];
    let startAnimationButton = document.getElementsByClassName("start-animation-button")[0];
    let sortingStatusDiv = document.getElementsByClassName("sorting-status-div")[0];
    let themeSwitchButton = document.getElementsByClassName("theme-switch-button")[0];

    
    
    
    //FUNCTIONS
    
    //default value
    sortingStatusDiv.innerText="Please create a new array";
    
    const indexIncrementHandler = ()=>{
        globalIndex++;
        if(globalIndex===arrayBeingAnimatedCurrentState.length-globalPass){
            globalPass++;
            globalIndex=0;
            if(globalPass===arrayBeingAnimatedInitialState.length){
                return false;
            }
        }
        return true;
    }
    
        
    const changeArrayToTextContainer = (value)=>{
        arrayToTextContainer.innerHTML = value;
    }
    
    
    
    
    //event handlers
    const newArrayOnClickHandler =  ()=>{
        startAnimationButton.disabled=false;
        sortingStatusDiv.innerText="Start Sorting";
        shouldLoopRun=false;
        let newArray = generateNewArray();
        let arrayToStringValue = convertArrayToString(newArray);
        changeArrayToTextContainer(arrayToStringValue);
        addBlocksToVisualizer(newArray);
        //assign the generated array to global so that we can keep track of length
        //and call various functions
        arrayBeingAnimatedInitialState = newArray;
        arrayBeingAnimatedCurrentState = newArray;
        globalIndex=0;
        globalPass=1;
    }
    
    const startAnimationOnClickHandler = async()=>{
        startAnimationButton.disabled=true;
        sortingStatusDiv.innerText="In Progress";

        //to prevent infinite loop
        let iterationCounter = 0;
        shouldLoopRun=true;
        while(shouldLoopRun){
            
            let index=globalIndex;
            let blocksArray = document.getElementsByClassName("block");

            let animationDurationInRoot = document.querySelector(":root").style.getPropertyValue("--animation-duration");
            console.log(animationDurationInRoot);
            if(animationDurationInRoot==="1s"){
                sleepFunctionTime=1000;
            }else if(animationDurationInRoot==="0.5s"){
                sleepFunctionTime=500;
            }else if(animationDurationInRoot==="0.25s"){
                sleepFunctionTime=250;
            }

            //highlight the elements in focus
            blocksArray[index].classList.add("block-in-focus");
            blocksArray[index+1].classList.add("block-in-focus");
    

            //if the current element is greater than the next element, swap them
            if(arrayBeingAnimatedCurrentState[index]>arrayBeingAnimatedCurrentState[index+1]){

                //animation classes, this starts the animation
                blocksArray[index+1].classList.add('move-left');
                blocksArray[index].classList.add('move-right');

                //swap the elements internally
                swap(index,index+1,arrayBeingAnimatedCurrentState);
                
            }
            //wait for animation to end
            await sleep(sleepFunctionTime);

            //now remove the focus from blocks and wait few more seconds
            blocksArray[index+1].classList.remove('block-in-focus');
            blocksArray[index].classList.remove('block-in-focus');

            await sleep(sleepFunctionTime);

            //if the user created a new array,
            //then we set false to shouldLoopRun, if that is not the case
            //or sorting has completed, keep running

            if(!shouldLoopRun){
                break;
            }
    
            //increment the index
            //if it returns false,break the while loop
            if(!indexIncrementHandler()){
                sortingStatusDiv.innerText="Completed!";
                break;
            }
    
            //if the loop is not broken
            addBlocksToVisualizer(arrayBeingAnimatedCurrentState);
            //to avoid infinite loop
            iterationCounter++;
            if(iterationCounter===1000){
                break;
            }
        }
    }
    
    //event listeners
    newArrayButton.addEventListener('click',newArrayOnClickHandler);
    startAnimationButton.addEventListener("click",startAnimationOnClickHandler);

    themeSwitchButton.addEventListener("click",function(){

        if(this.classList.contains("theme-switch-button-light-mode")){

            this.classList.remove("theme-switch-button-light-mode");
            
            this.classList.add("theme-switch-button-dark-mode");

            let root = document.querySelector(":root");
            root.style.setProperty("--background-color-light","rgb(110, 99, 99)");
            root.style.setProperty("--background-color-dark","rgb(51, 47, 47)");
            root.style.setProperty("--container-box-shadow","rgb(29, 27, 27)");
            root.style.setProperty("--container-color-light","white");
            root.style.setProperty("--container-color-dark","rgb(223, 211, 211)");
            root.style.setProperty("--container-color-darker","rgb(154, 144, 144)");
            root.style.setProperty("--content-color-one-base","rgb(148, 0, 211)");
            root.style.setProperty("--content-color-one-light","rgb(175, 24, 240)");
            root.style.setProperty("--content-color-one-dark","rgb(104, 1, 148)");
            root.style.setProperty("--content-color-two-base","rgb(71, 67, 67)");
            root.style.setProperty("--disabled-button-background","rgb(154, 144, 144)");
            root.style.setProperty("--disabled-button-color","rgb(0, 0, 0)");

            localStorage.setItem("theme","dark");

        }else{
            this.classList.remove("theme-switch-button-dark-mode");
            this.classList.add("theme-switch-button-light-mode");

            let root = document.querySelector(":root");
            root.style.setProperty("--background-color-light","#f5f5f5");
            root.style.setProperty("--background-color-dark","#e9e8e8");
            root.style.setProperty("--container-box-shadow","rgb(29, 27, 27)");
            root.style.setProperty("--container-color-light","white");
            root.style.setProperty("--container-color-dark","rgb(251, 249, 249)");
            root.style.setProperty("--container-color-darker","rgb(221, 220, 220)");
            root.style.setProperty("--content-color-one-base","#ff624f");
            root.style.setProperty("--content-color-one-light","#fc7060");
            root.style.setProperty("--content-color-one-dark","#e75646");
            root.style.setProperty("--content-color-two-base","#484e49");
            root.style.setProperty("--disabled-button-background","rgb(154, 144, 144)");
            root.style.setProperty("--disabled-button-color","rgb(0, 0, 0)");

            localStorage.setItem("theme","light");

        }
    })
    //remembers the last selected theme
    applyOldTheme();
    //added event listener to speed controller
    speedController();
}

init();
