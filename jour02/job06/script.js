const konamiCode = [
    "ArrowUp","ArrowUp",
    "ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight",
    "ArrowLeft","ArrowRight",
    "b","a"
];
const main = document. querySelector ('main');
const div = document. querySelector ('div') ;

main.style.display = "none" ;


let konamiIndex = 0;

document.addEventListener("keydown", function(event) {
    if (event.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKonami();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonami() {
   main.style.display = "block" ;
   div.style.display = "none" ;
   
}
