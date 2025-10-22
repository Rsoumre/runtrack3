document . getElementById ( "button" ) . addEventListener ( "click" , addone);

let count = 0 ;

function addone ( ) {
    count ++ ;
    document . getElementById ( "compteur" ) . innerText = count ;
}