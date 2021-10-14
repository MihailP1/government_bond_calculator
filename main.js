
let bondData;

let bonds = [];
// [bondId, bondMatDate, bondAccruedint, bondYield, bondPrice, systemTime]



function getBondData() {
    fetch('https://iss.moex.com/iss/engines/stock/markets/bonds/boards/tqob/securities.json')
        .then(res=>res.json())
        .then(res=>setBondData(res));
}

getBondData();


function setBondData(stock){

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
                bonds[i][5] = marketData[j][52];
                
                break;
            }
        }
        
    }
    
    bonds.sort(function (a, b) {
        if (a[1] > b[1]) {
            return 1;
        }
        if (a[1] < b[1]) {
            return -1;
        }
        
        return 0;
        });
    
    console.log(bonds);

    createSelect();
}



let duration;

function createSelect() {
    let select = document.getElementById('mat_date');
    for(let i = 0; i < bonds.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', i);
        option.innerHTML = bonds[i][1];
        select.appendChild(option);

    }
    console.log("select");
    changeBond();
}



function changeBond() {

    let selectedIndex = document.getElementById("mat_date").options.selectedIndex;
    console.log(selectedIndex);

    let id = document.getElementById("id");
    if(id != null) id.remove();

    let yield = document.getElementById("yield");
    if(yield != null) yield.remove();
    

    let bondId = document.getElementsByClassName("bondId");
    id = document.createElement("p");
    id.innerHTML = bonds[selectedIndex][0];
    id.setAttribute('id', 'id');
    bondId[0].appendChild(id);

    let bondYield = document.getElementsByClassName("bondYield");
    yield = document.createElement("p");
    yield.innerHTML = bonds[selectedIndex][3];
    yield.setAttribute('id', 'yield');
    bondYield[0].appendChild(yield);
}



  

