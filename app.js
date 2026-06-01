const pokedex = document.getElementById("pokedex");
const stats = document.getElementById("stats");

document.getElementById("pokedexTab")
.addEventListener("click", () => {

    pokedex.style.display = "block";
    stats.style.display = "none";

});

document.getElementById("statsTab")
.addEventListener("click", () => {

    pokedex.style.display = "none";
    stats.style.display = "block";

});
if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("service-worker.js");

};