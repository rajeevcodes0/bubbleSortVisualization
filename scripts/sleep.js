const sleep = (time)=>{
    //create a new promise and return it
    return new Promise((resolve,reject)=>{
        //call the setTimeout after the specified time
        //await will hold the function execution unless the promise is fulfilled  
        setTimeout(()=>{
            resolve();
        },time)
    })
}

//export this function
export {sleep};