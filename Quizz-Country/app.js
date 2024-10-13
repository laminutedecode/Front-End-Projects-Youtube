const questions = [
  {
    question: "Quel est le nom du pays ?",
    img: "france.jpg",
    name: "France"
  },
  {
    question: "Quel est le nom du pays ?",
    img: "allemagne.jpg",
    name: "Allemagne"
  },
  {
    question: "Quel est le nom du pays ?",
    img: "angleterre.jpg",
    name: "Angleterre"
  },
  {
    question: "Quel est le nom du pays ?",
    img: "argentine.jpg",
    name: "Argentine"
  },
  {
    question: "Quel est le nom du pays ?",
    img: "cameroun.jpg",
    name: "Cameroun"
  },
];

let currentQuestion = 0;
let score = 0;

const quizzImg = document.querySelector("#quizz-img");
const quizzQuestion = document.querySelector("#quizz-question");
const inputResult = document.querySelector("#resultat");
const btnNext = document.querySelector("#next");
const resultatFinal = document.querySelector("#resultatFinal");

function shuffle(array) {
  // Fonction pour mélanger les questions
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// On mélange les questions
const shuffledQuestions = shuffle(questions);

// On affiche la première question
quizzImg.src = `./src/${shuffledQuestions[currentQuestion].img}`;
quizzQuestion.textContent = shuffledQuestions[currentQuestion].question;

// Fonction pour valider la réponse de l'utilisateur
function validation(){
  // On vérifie si la réponse est correcte
  if (inputResult.value.toLowerCase() === shuffledQuestions[currentQuestion].name.toLowerCase()) {
    score++;
  }

  // On passe à la question suivante
  currentQuestion++;

  // Si on a atteint la fin du quizz, on affiche le score final
  if (currentQuestion === shuffledQuestions.length) {
    quizzQuestion.textContent = "Fin du quizz";
    quizzImg.style.display = "none";
    inputResult.style.display = "none";
    btnNext.style.display = "none";
    resultatFinal.textContent = "Votre score est de " + score + " sur " + shuffledQuestions.length;
  } else {
    // Sinon, on affiche la prochaine question
    quizzImg.src = `./src/${shuffledQuestions[currentQuestion].img}`;
    quizzQuestion.textContent = shuffledQuestions[currentQuestion].question;
    inputResult.value = "";
  }
};

// Événement du bouton "Next" et de la touche "Entrer"
btnNext.addEventListener("click", validation);
inputResult.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    validation();
  }
});
