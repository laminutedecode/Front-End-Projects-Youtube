// Sélection des éléments DOM ayant la classe "secondes", "minutes", "heures" et "jours" avec la classe "number".
const secondes = document.querySelector('.secondes .number');
const minutes = document.querySelector('.minutes .number');
const heures = document.querySelector('.heures .number');
const jours = document.querySelector('.jours .number');

// Affichage dans la console des éléments DOM sélectionnés.
console.log(secondes, minutes, heures, jours);

// Initialisation des variables avec les valeurs initiales pour les secondes, les minutes, les heures et les jours.
let secValue = 60;
let minValue = 30;
let hourValue = 2;
let dayValue = 1;

// Création d'une fonction qui s'exécute toutes les secondes (1000ms).
const timeFunction = setInterval(() => {
    // Décrémentation de la valeur des secondes de 1.
    secValue--;

    // Si les secondes atteignent 0, on décrémente les minutes et on réinitialise les secondes à 60.
    if (secValue === 0) {
        minValue--;
        secValue = 60;
    }

    // Si les minutes atteignent 0, on décrémente les heures et on réinitialise les minutes à 60.
    if (minValue === 0) {
        hourValue--;
        minValue = 60;
    }

    // Si les heures atteignent 0, on décrémente les jours et on réinitialise les heures à 0.
    if (hourValue === 0) {
        dayValue--;
        hourValue = 0;
    }

    // Si les jours atteignent 0, on les met à 0 pour éviter les valeurs négatives.
    if (dayValue === 0) {
        dayValue = 0;
    }

    // Si toutes les valeurs sont à 0 (jours, heures, minutes et secondes), on arrête l'exécution de la fonction.
    if (dayValue === 0 && hourValue === 0 && minValue === 0 && secValue === 0) {
        clearInterval(timeFunction);
    }

    // Mise à jour du contenu textuel des éléments DOM sélectionnés pour afficher les valeurs de temps actuelles.
    secondes.textContent = secValue < 10 ? `0${secValue}` : secValue;
    minutes.textContent = minValue < 10 ? `0${minValue}` : minValue;
    heures.textContent = hourValue < 10 ? `0${hourValue}` : hourValue;
    jours.textContent = dayValue < 10 ? `0${dayValue}` : dayValue;

}, 1000); // Intervalle d'exécution de la fonction défini à 1000 ms (1 seconde).
