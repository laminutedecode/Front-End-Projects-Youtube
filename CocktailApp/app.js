const cocktailCardsElement = document.getElementById('cocktailCards');
const searchInputElement = document.getElementById('searchInput');

// Fonction pour obtenir les cocktails depuis l'API
async function getCocktails() {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log('Erreur lors de la récupération des cocktails:', error);
  }
}

// Fonction pour afficher les cocktails sous forme de cartes
function displayCocktails(cocktails) {
  cocktailCardsElement.innerHTML = '';

  if (cocktails) {
    cocktails.forEach(cocktail => {
      const card = document.createElement('div');
      card.classList.add('card');

      const image = document.createElement('img');
      image.src = cocktail.strDrinkThumb;
      image.alt = cocktail.strDrink;

      const name = document.createElement('h3');
      name.textContent = cocktail.strDrink;

      card.appendChild(image);
      card.appendChild(name);

      cocktailCardsElement.appendChild(card);
    });
  } else {
    const message = document.createElement('p');
    message.textContent = 'Aucun cocktail trouvé.';
    cocktailCardsElement.appendChild(message);
  }
}

// Fonction de recherche de cocktail
function searchCocktails() {
  const searchTerm = searchInputElement.value.trim();

  getCocktails().then(cocktails => {
    if (searchTerm !== '') {
      const filteredCocktails = cocktails.filter(cocktail => {
        return cocktail.strDrink.toLowerCase().includes(searchTerm.toLowerCase());
      });
      displayCocktails(filteredCocktails);
    } else {
      displayCocktails(cocktails);
    }
  });
}

// Écouteur d'événement pour la recherche
searchInputElement.addEventListener('input', searchCocktails);

// Chargement initial des cocktails
getCocktails().then(displayCocktails);
