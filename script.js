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
let sortingStatus = document.getElementsByClassName("sorting-status")[0];

//FUNCTIONS

//default value
sortingStatus.innerText="Please create a new array";

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

//a function to generate a new array, the length will always be less than 10
const generateNewArray = ()=>{
    //the length will always be between 3 and 10
    

    let length = (Math.random()*10+3)%11;
    length = Math.floor(length);
    //in case length become zero because of mod
    if(length===0 || length==1){
        length=2;
    }

    

    let newArray = [];
    for(let i=0;i<length;i++){
        let newNumber = (Math.random()*50+1)%50;
        newNumber = Math.floor(newNumber);
        newArray.push(newNumber);
    }
    return newArray;
}

const convertArrayToString=(targetArray)=>{

    let convertedArray = '[';

    for(let i=0;i<targetArray.length;i++){
        convertedArray+=targetArray[i].toString();
        if(i+1!==targetArray.length){
            convertedArray+=',';
        }else{
            convertedArray+=']';
        }
    }

    return convertedArray;
}

const createBlock = (number)=>{
    let block = document.createElement('div');
    block.className="block"
    block.innerText=number;
    return block;
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

//swap two indexes
const swap = (firstIndex,secondIndex,targetArray)=>{
    let temp;
    temp = targetArray[firstIndex];
    targetArray[firstIndex] = targetArray[secondIndex];
    targetArray[secondIndex] = temp;
}


//new stuff
const sleep = (time)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },time)
    })
}

//event handlers
const newArrayOnClickHandler =  ()=>{
    startAnimationButton.disabled=false;
    sortingStatus.innerText="Start Sorting";
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
    sortingStatus.innerText="In Progress";
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
            sortingStatus.innerText="Completed!";
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


// addBlocksToVisualizer([1,2,3]);
// console.log(generateNewArray());
// console.log(convertArrayToString([1,2,3]));