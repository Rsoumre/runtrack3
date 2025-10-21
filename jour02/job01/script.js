function citation() {
    document . getElementById ( "citation" ). innerText = citationTxt;
    console.log (citationTxt);
}

const citationTxt = document . getElementById ( "citation" ). innerText; 

document . getElementById ( "citation" ). innerText = "" ;


document . getElementById ("button"). addEventListener ( "click" , citation );