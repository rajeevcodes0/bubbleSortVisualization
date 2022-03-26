const createBlock = (number)=>{
    let block = document.createElement('div');
    block.className="block"
    block.innerText=number;
    return block;
}

export {createBlock};