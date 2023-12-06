//const
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//word array
var question = [
  "Langues",
  "Pays",
  "Villes"
];

var categories = [
  [
    "arabe",
    "anglais",
    "francais",
    "espagnol",
    "chinois",
    "catalan"
  ],
  ["france", "bulgarie", "tadjikistan", "kazakhstan", "azerbaidjan", "republique democratique du congo", "sao tome-et-principe", "brunei"],
  ["paris", "saguenay", "madrid", "santiago", "prague", "saint-louis-du-ha! ha!", "bagdad", "rimouski", "trois-rivieres"]
];

var hints = [
  [
    "Langue officielle de 25 pays",
    "Langue la plus parlé au monde",
    "Langue européenne majoritairement parlé en Afrique",
    "Langue la plus parlé des Amériques",
    "Langue de l'Asie de l'est la plus parlé",
    "Langue latine"
  ],
  [
    "Pays d'europe de l'ouest",
    "Pays Balkan",
    "Petit pays d'Asie centrale",
    "Pays asiatique très peu densément peuplé",
    "Entre 3 continents",
    "Gros pays d'Afrique",
    "Îles d'Afrique",
    "Petit pays d'Asie du sud est"
  ],
  [
    "Enfer sur terre",
    "Huitième ville la plus peuplé du Québec",
    "Capital espagnol",
    "Capital du Chilie",
    "Capital de la Tchéquie",
    "Ville légendaire du Québec",
    "Capital du moyen-orient",
    "Sur la côte du fleuve saint-Laurent",
    "Entre métropole et capitale"
  ]
];

//set question,answer and hint

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = "La catégorie est " + question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    
    /*MODIFS*/

    //ancien code:
    /*
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
    */

    if (wordArray[i] === "-") {
      wordDisplay.push("-");
    }
    else if (wordArray[i] === " ") {
      wordDisplay.push(" ");
    }
    else if (wordArray[i] === "!") {
      wordDisplay.push("!");
    }
    else {
      wordDisplay.push("_");
    }

    /*La modification permet d'afficher les caractères: " ", "-" et "!"*/

  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `Indice - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Vous avez ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `GAGNÉ!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `You have ${life} lives!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `You have ${life} life!`;
      } else {
        livesDisplay.innerHTML = `PERDU!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `GAGNÉ!`;
      return;
    }
  }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];



/*=======================*/
/*        ajouts
/*=======================*/
/*
/*  La fonctionnalité ajouté est un menu de triche mais
/*  j'ai fait des améliorations et modifications mineures
/*  au code qui était déjà présent
/*
/*=======================*/




//Variables HTML pour l'ajout de mots
const ajoutCategorie = document.getElementById("ajout-categorie");
const ajoutMot = document.getElementById("ajout-mot");
const ajoutIndice = document.getElementById("ajout-indice");
const isMotValide = /^[a-z][a-z !-]*$/i;
  /*NOTE IMPORTANTE: généré par ChatGPT car nous avons pas encore vu les regex dans le cours*/ 

//Variables HTML pour la suppression de mots
const supprCategorie = document.getElementById("supprimer-categorie");
const supprMot = document.getElementById("supprimer-mot");
const supprIndice = document.getElementById("supprimer-indice");


//Rafraîchit toutes les patentes input, select, etc. initial
rafraichirCategorie();
rafraichirSupprMot();

supprCategorie.addEventListener("change", rafraichirSupprMot);
supprMot.addEventListener("change", rafraichirSupprIndice);


//fonction pour afficher/cacher le menu de triche
function menuTriche() {
  const divTriche = document.getElementById("menu-triche");
  divTriche.classList.toggle("invisible");
}


//fonction pour rafraîchir le select "Catégorie" de "Supprimer un mot"
function rafraichirCategorie() {
  let i = 0;
  supprCategorie.innerHTML = "";
  question.forEach(element => {
    let item = document.createElement("option");
    item.innerHTML = element;
    item.value = i;
    supprCategorie.append(item);
    i++;
  });
  ajoutCategorie.innerHTML = supprCategorie.innerHTML;
}

//fonction pour rafraîchir le select "Mot" de "Supprimer un mot"
function rafraichirSupprMot() {
  supprMot.innerHTML = "";
  let i = 0;
  categories[supprCategorie.value].forEach(element => {
    let item = document.createElement("option");
    item.innerHTML = element;
    item.value = i;
    i++;
    supprMot.append(item);
  });
  rafraichirSupprIndice();
}

//fonction pour rafraîchir le input "Indice" de "Supprimer un mot"
function rafraichirSupprIndice(){
  supprIndice.value = hints[supprCategorie.value][supprMot.value];
}

//fonction pour ajouter un mot
function ajouterMot() {
  if (isMotValide.test((ajoutMot.value).toLowerCase()) && (ajoutMot.value).length >= 2) {
    categories[ajoutCategorie.value].push((ajoutMot.value).toLowerCase());
    hints[ajoutCategorie.value].push((ajoutIndice.value).toLowerCase());
    rafraichirCategorie();
    rafraichirSupprMot();
    rafraichirSupprIndice();
  }
  else {
    alert('Mot invalide. Entrez un mot avec un minimum de 2 caractères et qui commence par une lettres. Les caractères autorisés sont des lettres minuscules, "!" et "-"');
  }
  rafraichirCategorie();
  rafraichirSupprMot();
}

//fonction pour supprimer un mot
function supprimerMot() {
  for(let i = supprMot.value; i < categories[supprCategorie.value].length; i++) {
    console.log(i + categories[supprCategorie.value][i] + " <== " + (Number(i) + 1) + categories[supprCategorie.value][Number(i) + 1]); //Cette instruction sert qu'à déboguer
    categories[supprCategorie.value][i] = categories[supprCategorie.value][Number(i) + 1];
    hints[supprCategorie.value][i] = hints[supprCategorie.value][Number(i) + 1];
  }
  categories[supprCategorie.value].length--;
  hints[supprCategorie.value].length--;
  rafraichirCategorie();
  rafraichirSupprMot();
  init();
}