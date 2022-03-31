import {createBlock} from "./createBlock.js";

const addBlocksToVisualizer = (targetArray)=>{

    let visualizer = document.querySelector(".visualizer");

    let blocksArray = targetArray.map((number)=>{
        return createBlock(number);
    })

    //empty the visualizer before adding new
    visualizer.innerHTML="";
    
    for(let i=0;i<blocksArray.length;i++){
        visualizer.appendChild(blocksArray[i]);
    }
}

export {addBlocksToVisualizer};