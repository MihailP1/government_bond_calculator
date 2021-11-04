
let bondData;

let bonds = [];
// [bondId, bondMatDate, bondAccruedint, bondYield, bondPrice, systemTime, yearsToMat]



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
        let systemDate = new Date(bonds[i][5].slice(0, 10));
        let matDate = new Date(bonds[i][1]);
        let daysToMat = Math.floor((matDate.getTime() - systemDate.getTime())/(1000*60*60*24));
        bonds[i][6] = daysToMat/365;
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





function createSelect() {
    let select = document.getElementById('mat_date');
    for(let i = 0; i < bonds.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', i);
        option.innerHTML = bonds[i][1];
        select.appendChild(option);

    }
    
    changeBond();
    
}



function changeBond() {

    let selectedIndex = document.getElementById("mat_date").options.selectedIndex;
  

    let id = document.getElementById("id");
    if(id != null) id.remove();

    let yield = document.getElementById("yield");
    if(yield != null) yield.remove();

    let matDate = document.getElementById("matDate");
    if(matDate != null) matDate.remove();

    let price = document.getElementById("price");
    if(price != null) price.remove();
    
    let accrued = document.getElementById("accrued");
    if(accrued != null) accrued.remove();

    let years = document.getElementById("years");
    if(years != null) years.remove();

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

    let bondMatDate = document.getElementsByClassName("bondMatDate");
    matDate = document.createElement("p");
    matDate.innerHTML = bonds[selectedIndex][1];
    matDate.setAttribute('id', 'matDate');
    bondMatDate[0].appendChild(matDate);

    let bondPrice = document.getElementsByClassName("bondPrice");
    price = document.createElement("p");
    price.innerHTML = bonds[selectedIndex][4];
    price.setAttribute('id', 'price');
    bondPrice[0].appendChild(price);

    let bondAccruedint = document.getElementsByClassName("bondAccruedint");
    accrued = document.createElement("p");
    accrued.innerHTML = bonds[selectedIndex][2];
    accrued.setAttribute('id', 'accrued');
    bondAccruedint[0].appendChild(accrued);

    let yearsToMat = document.getElementsByClassName("yearsToMat");
    years = document.createElement("p");
    years.innerHTML = bonds[selectedIndex][6].toFixed(2);
    years.setAttribute('id', 'years');
    yearsToMat[0].appendChild(years);

    changeNumberOfBonds();

}

function changeNumberOfBonds() {


    let currentBondPrice = document.getElementById("price");
    let accrued = document.getElementById("accrued");
    let years = document.getElementById("years");
    let yield = document.getElementById("yield");
    let fullYield = yield.innerHTML * years.innerHTML;
    let bondPrice = 1000 * (currentBondPrice.innerHTML/100);
    let price = bondPrice + +accrued.innerHTML;
    let fullPrice = (price * numberOfBonds.value);
    let fullIncome = (bondPrice * numberOfBonds.value) * (100 + fullYield)/100 + +accrued.innerHTML * numberOfBonds.value;
    let finalProfit = fullIncome - fullPrice;

    let capital = document.getElementById("capital");
    if(capital != null) capital.remove();

    let income = document.getElementById("income");
    if(income != null) income.remove();

    let profit = document.getElementById("profit");
    if(profit != null) profit.remove();

    let initialCapital = document.getElementsByClassName("initialCapital");
    capital = document.createElement("p");
    capital.innerHTML = fullPrice.toFixed(3);
    capital.setAttribute('id', 'capital');
    initialCapital[0].appendChild(capital);

    let totalIncome = document.getElementsByClassName("totalIncome");
    income = document.createElement("p");
    income.innerHTML = fullIncome.toFixed(3);
    income.setAttribute('id', 'income');
    totalIncome[0].appendChild(income);

    let profitContainer = document.getElementsByClassName("profitContainer");
    profit = document.createElement("p");
    profit.innerHTML = finalProfit.toFixed(3);
    profit.setAttribute('id', 'profit');
    profitContainer[0].appendChild(profit);


}

let ofzInfo = document.getElementById("ofz_info_button");
ofzInfo.addEventListener("click", openModalWindow);
let modalWindow = document.getElementById("modal-window");
let modalOverlay = document.getElementById("modal-overlay");
function openModalWindow() {
    
    modalOverlay.style["z-index"] = "2";
    modalOverlay.style.opacity = "1";
    
    modalWindow.style.transform = "translateY(100px)";
    
}

function closeModalWindow() {
    modalWindow.style.transform = "translateY(-200px)";
    setTimeout(() => {
        modalOverlay.style.opacity = "0";
        modalOverlay.style["z-index"] = "-1";
    }, 700);
    
}
  

