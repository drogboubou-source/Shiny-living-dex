const pokedex = document.getElementById("pokedex");
const stats = document.getElementById("stats");
const pokedexTab = document.getElementById("pokedexTab");
const statsTab = document.getElementById("statsTab");

pokedexTab.addEventListener("click", () => {
    pokedex.style.display = "block";
    stats.style.display = "none";
    pokedexTab.classList.add("active");
    statsTab.classList.remove("active");
});

statsTab.addEventListener("click", () => {
    pokedex.style.display = "none";
    stats.style.display = "block";
    statsTab.classList.add("active");
    pokedexTab.classList.remove("active");
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("service-worker.js")
        .then(() => console.log("Service Worker enregistré avec succès !"))
        .catch(err => console.error("Échec de l'enregistrement du Service Worker :", err));
}