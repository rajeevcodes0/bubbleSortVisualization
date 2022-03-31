const convertArrayToString=(targetArray)=>{
    if(typeof targetArray==="undefined"){
        throw new Error("targetArray is undefined, no argument passed");
    }
    return "["+targetArray.toString()+"]";
}

export {convertArrayToString};