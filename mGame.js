const gameContainer = document.getElementById("game");
// const divList = gameContainer.getElementsByTagName("DIV");
let noClicking = true;
totalLives = 7;

let savedLives = JSON.parse(localStorage.getItem('score')) || [];
// displays lives and best score
const paraG = document.querySelector('.lives');
paraG.innerHTML = `You have ${totalLives} lives remaining <br>
The <b>BEST</b> score was ${savedLives}`



const startButton = document.querySelector('#start');
startButton.addEventListener('click', function() {
noClicking = false;
gameContainer.classList.add('bolded')
})

// Random hex colors
randomColor1 = '#' + Math.floor(Math.random()*16777215).toString(16);
randomColor2 = '#' + Math.floor(Math.random()*16777215).toString(16);
randomColor3 = '#' + Math.floor(Math.random()*16777215).toString(16);
randomColor4 = '#' + Math.floor(Math.random()*16777215).toString(16);
randomColor5 = '#' + Math.floor(Math.random()*16777215).toString(16);
  

const COLORS = [
  randomColor1,
  randomColor2,
  randomColor3,
  randomColor4,
  randomColor5,
  randomColor1,
  randomColor2,
  randomColor3,
  randomColor4,
  randomColor5
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;
    // changes background color
  event.target.style.backgroundColor = event.target.className
  event.target.classList.toggle("spin")
  event.target.classList.add('flipped')

  const flippedCards = document.querySelectorAll('.flipped')
  // logic
  if (flippedCards.length >= 2) {
    noClicking = true;
    if (flippedCards[0].className === flippedCards[1].className){
      console.log('match')
      flippedCards.forEach(card => {
        card.classList.remove('flipped')
        card.style.pointerEvents = 'none';
        noClicking = false;
      })
    } 
    else{
      console.log('wrong')
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(function() {
         card.classList.remove('spin');
         card.removeAttribute('style');
         noClicking = false;
      }, 1000)
    }) 
    totalLives--;
    console.log(totalLives)
    }
  }

  const paraG = document.querySelector('.lives');
  paraG.innerText = `You have ${totalLives} lives remaining`

  if (totalLives === 0) {
    noClicking = true;
    setTimeout(function() {
      alert("You lose!");
      noClicking = true;
    }, 1000);
  }

  const spunCards = document.querySelectorAll('.spin')
  if (spunCards.length === 10) {
    setTimeout(function() {
      alert('YOU WIN!')}, 1000);
    noClicking = true;
    let yourScore = totalLives
  let bestScore = JSON.parse(localStorage.getItem('score')) || 0;
  if (bestScore > yourScore) {
    console.log('nothing happens');
  }
  else {
    bestScore = yourScore;
    let highestScore = bestScore;
    storage = localStorage.setItem('score', JSON.stringify(highestScore))
  }
  }

}
 
// restarts game when finished
const restartButton = document.querySelector('#restart')
restartButton.addEventListener('click', function() {
location.reload();
})
  
// when the DOM loads
createDivsForColors(shuffledColors);
