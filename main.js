
let bondData;

let bonds = [];
// [bondId, bondMatDate, bondAccruedint, bondYield, bondPrice]

function getBondData(stock){
    
    bondData = stock;
    console.log(stock);
    bondData.securities.data.forEach(element => {
        if(element[20].indexOf("ОФЗ-ПД") !== -1) {
            bonds.push([element[0], element[13], element[7]]);
        }
        
    });

    let marketData = bondData.marketdata.data;
    for(let i = 0; i < bonds.length; i++) {
        
        for(let j = 0; j < marketData.length; j++) {
            if(marketData[j][0] === bonds[i][0]) {
                bonds[i][3] = marketData[j][16];
                bonds[i][4] = marketData[j][11];
                
                break;
            }
        }
        
    }
    
    
    console.log(bonds);
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


