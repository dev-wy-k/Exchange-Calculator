let from = document.getElementById("from");
let to = document.getElementById("to");
let input = document.getElementById("input");
let result = document.getElementById("result");
let historyList = document.getElementById("history-list");

function createOption(x,y,z){
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.appendChild(t);
    o.setAttribute("value",toNum(z));
    x.appendChild(o);
}

function toNum(x){
   return Number(x.replace(",",""));
}   

for (x in data.rates){
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x]);
    // console.log(data.rates[x]);
}

function createTr(x){
    let tr = document.createElement("tr");

    let spacer = document.getElementById("spacer");
    if(spacer){
        spacer.remove();
    }

    x.map(function (el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    })

    historyList.appendChild(tr);    
}

function store(){
    localStorage.setItem("record", historyList.innerHTML)
}

document.getElementById("calculate").addEventListener("submit", function(e){
    e.preventDefault();

    // get state 
    let x = input.value;
    let y = from.value;
    let z = to.value;
    // console.log(x,y,z);

    //process 

    let first = x * y ;
    let second = first/z ;
    let final = second.toFixed(2);
    // console.log(second.toFixed(2));
    // table process
    let fromTxt = x +" "+from.options[from.selectedIndex].innerHTML;
    let toTxt = to.options[to.selectedIndex].innerHTML;
    let date = new Date().toLocaleString();
    
    let arr =[date, fromTxt, toTxt, final,];
    createTr(arr);
    store();


    //set state 
    result.innerHTML = final; 
    input.value = "";
    from.value = "";
    to.value ="1";
    input.focus();
});

(function(){
    if(localStorage.getItem("record")){
        historyList.innerHTML = localStorage.getItem("record");
    }
    else{
        historyList.innerHTML = ` <tr id="spacer"><td colspan=4>Nothing Result !!</td></tr> ` ;
    }
})()

function del(el){
   historyList.innerHTML = "";
}

function changeMode(){
    document.body.classList.toggle("night-mode")
}



