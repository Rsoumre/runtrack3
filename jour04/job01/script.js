const quote = document.querySelector(".quote");
document.querySelector(".show").addEventListener("click",async function () {
    const response = await fetch("expression.txt")
        .then(res => res.text())

        .then(text => {
            quote.innerHTML = '';
            const p = document.createElement("p");
            p.textContent = text;
            quote.appendChild(p);
        })
        .catch(error => console.error("Erreur :", error))

})