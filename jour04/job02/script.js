function jsonvaluekey(jsonString, key) {
   try {
    const jsonObject = JSON.parse(jsonString);
    return jsonObject[key];

   } catch (error) {
    console.error("Invalid JSON string:", error);
    return null;
   }

    }
    // Exemple d'utilisation
    const jsonTexte = {
        name: "La Plateforme_",
        address: "8 rue d'hozier",
        city: "Marseille",
        nb_staff: "11",
        creation:"2019"
    } ;

    const cle = "city"
    const valeur = jsonvaluekey(JSON.stringify(jsonTexte), cle)

    console.log(`La valeur associée à la clé "${cle}" est : ${valeur}`)