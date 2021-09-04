//initilization

let sequence = [];
let humanSequence = [];
let level = 0 ;
//QuerySelectors
const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function humanTurn(level) {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}


// reset game
function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'Simon Game';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
}


// Helper function to find the next random tile in the sequence
function nextStep() {
    const tiles = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];
    console.log(random)
    return random;
  }
  // Tile is pressed show the animation plus sound
  function activateTile(numb) {
  const tile = document.querySelector(`[data-tile='${numb}']`);
  //const sound = document.querySelector(`[data-sound='${numb}']`);

  tile.classList.add('activated');
 // sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}
// Takes all nums out of the sequence and sends them to activate tile so player can see animation and memorize path
function playRound(nextSequence) {
  nextSequence.forEach((numb, index) => {
    setTimeout(() => {
      activateTile(numb);
    }, (index + 1) * 600);
  });
}
// progresses game after successful round or start of round
function nextRound() {
    level += 1;
    tileContainer.classList.add('unclickable');
    info.textContent = 'Wait for the computer';
    heading.textContent = `Level ${level} of 20`;


    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
     humanTurn(level);
   }, level * 600 + 1000);
  }
  // only is called at beggining when start button is clicked
  // removes start button and calls nextRound to begin the game
function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = 'Wait for the computer';
    nextRound();
  }
  // Called by event listner click for tile containers
  // Allows tiles to be clicked to then be put into the human sequence
  function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    //const sound = document.querySelector(`[data-sound='${tile}']`);
    //sound.play();
  
    const remainingTaps = sequence.length - humanSequence.length;
    
    if (humanSequence[index] !== sequence[index]) {
      resetGame('Oops! Game over, you pressed the wrong tile');
      return;
    }

    if (humanSequence.length === sequence.length) {
      if (humanSequence.length === 20) {
        resetGame('Congrats! You completed all the levels');
        return
      }
      humanSequence = [];
      info.textContent = 'Success! Keep going!';
      setTimeout(() => {
        nextRound();
      }, 1000);
      return;
    }
  
    info.textContent = `Your turn: ${remainingTaps} Tap${
      remainingTaps > 1 ? 's' : ''
    }`;
  }

// Event listeners
  startButton.addEventListener('click', startGame);

  tileContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset;
  
    if (tile) handleClick(tile);
  });