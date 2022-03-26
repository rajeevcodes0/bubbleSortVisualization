//swap two indexes
const swap = (firstIndex,secondIndex,targetArray)=>{
    let temp;
    temp = targetArray[firstIndex];
    targetArray[firstIndex] = targetArray[secondIndex];
    targetArray[secondIndex] = temp;
}

export {swap};