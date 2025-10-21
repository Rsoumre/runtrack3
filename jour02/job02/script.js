// Récupérer le texte de la citation
const citationTxt = document . getElementById ( "citation" ). innerText; 

// Cacher la citation au chargement de la page
document . getElementById ( "citation" ). innerText = "" ;

// Ajouter les écouteurs d'événements aux boutons
document . getElementById ("show"). addEventListener ( "click" , () => {
    document . getElementById ( "citation" ). innerText = citationTxt ;
} );

// Ajouter l'écouteur d'événement pour cacher la citation
document . getElementById ("hide"). addEventListener ( "click" , function() {
    document . getElementById ( "citation" ). innerText = "" ;
} );