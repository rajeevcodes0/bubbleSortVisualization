import {createBlock} from "./createBlock.js";

const addBlocksToVisualizer = (targetArray)=>{

    let visualizer = document.querySelector(".visualizer");

    let arrayOfBlocks = targetArray.map((number)=>{
        return createBlock(number);
    })

    //empty the visualizer before adding new blocks
    visualizer.innerHTML="";
    
    for(let i=0;i<arrayOfBlocks.length;i++){
        visualizer.appendChild(arrayOfBlocks[i]);
    }
}

export {addBlocksToVisualizer};