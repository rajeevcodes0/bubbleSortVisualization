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

export {convertArrayToString};