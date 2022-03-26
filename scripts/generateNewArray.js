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

export {generateNewArray};