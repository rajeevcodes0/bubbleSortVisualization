import {sleep} from "./scripts/sleep.js";
import {generateNewArray} from "./scripts/generateNewArray.js";
import {convertArrayToString} from "./scripts/convertArrayToString.js";
import {createBlock} from "./scripts/createBlock.js";
import {swap} from "./scripts/swap.js";

//so that globals don't do scope pollution
function init(){
    
    //globals
    let arrayBeingAnimatedInitialState = [];
    let arrayBeingAnimatedCurrentState = [];
    let globalIndex = 0;
    let globalPass = 1;
    let shouldLoopRun = false;
    
    //dom elements that we need to manipulate
    let visualizer = document.getElementsByClassName("visualizer")[0];
    let arrayToTextContainer = document.getElementsByClassName("array-to-text-container")[0];
    let newArrayButton = document.getElementsByClassName("new-array-button")[0];
    let startAnimationButton = document.getElementsByClassName("start-animation-button")[0];
    let sortingStatusDiv = document.getElementsByClassName("sorting-status-div")[0];
    
    //FUNCTIONS
    
    //default value
    sortingStatusDiv.innerText="Please create a new array";
    
    const indexIncrementHandler = (calledFrom)=>{
        console.log(calledFrom);
        console.log("inside index handler");
        console.log("globalIndex",globalIndex,"globalPass",globalPass,"length",arrayBeingAnimatedCurrentState.length);
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
    
    
    
    const addBlocksToVisualizer = (targetArray)=>{
        let blocksArray = targetArray.map((number)=>{
            return createBlock(number);
        })
    
        //empty the visualizer before adding new
        visualizer.innerHTML="";
        
        for(let i=0;i<blocksArray.length;i++){
            visualizer.appendChild(blocksArray[i]);
        }
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
        console.log("starting animation");
        sortingStatusDiv.innerText="In Progress";
        console.log("HI");
        let iterationCounter = 0;
        shouldLoopRun=true;
        while(shouldLoopRun){
            console.log("while loop scout");
            
            let index=globalIndex;
            let blocksArray = document.getElementsByClassName("block");
            blocksArray[index].classList.add("block-in-focus");
            blocksArray[index+1].classList.add("block-in-focus");
    
            console.log("before swap",globalIndex,globalPass);
            console.log(arrayBeingAnimatedCurrentState);
    
            if(arrayBeingAnimatedCurrentState[index]>arrayBeingAnimatedCurrentState[index+1]){
                blocksArray[index+1].classList.add('move-left');
                blocksArray[index].classList.add('move-right');
                //the elements
                swap(index,index+1,arrayBeingAnimatedCurrentState);
                console.log("swapped");
                
            }
            await sleep(1000);
            //now remove the focus from blocks
            blocksArray[index+1].classList.remove('block-in-focus');
            blocksArray[index].classList.remove('block-in-focus');
            await sleep(1000);
            if(!shouldLoopRun){
                break;
            }
    
            //increment the index
            //if it returns false,break the while loop
            if(!indexIncrementHandler("called from while loop")){
                sortingStatusDiv.innerText="Completed!";
                break;
            }
            console.log("after increment",globalPass,globalIndex);
            console.log(globalIndex,globalPass);
    
            //if the loop is not broken
            addBlocksToVisualizer(arrayBeingAnimatedCurrentState);
            //wait for 1sec
            //to avoid infinite loop
            iterationCounter++;
            if(iterationCounter==100){
                break;
            }
        }
    }
    
    //event listeners
    newArrayButton.addEventListener('click',newArrayOnClickHandler);
    startAnimationButton.addEventListener("click",startAnimationOnClickHandler);
}

init();
