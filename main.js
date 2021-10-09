
let bondData;
let bondIDs = [];
// [bondId, bondDuration, bondYield, bondAccruedint, bondPrice]
function getBondData(stock){
    
    bondData = stock;
    console.log(stock);
    bondData.securities.data.forEach(element => {
        if(element[20].indexOf("ОФЗ-ПД") !== -1) {
            bondIDs.push(element[0]);
        }
        
    });
    
    console.log(bondIDs);
}


fetch('https://iss.moex.com/iss/engines/stock/markets/bonds/boards/tqob/securities.json')
    .then(res=>res.json())
    .then(res=>getBondData(res));


let duration;

function changeNum() {
    let selectedOption = document.getElementById("duration").options.selectedIndex;
    duration = document.getElementById("duration").options[selectedOption].value;
    console.log(duration);
}


