
var letters = /^[a-zA-Z]+$/;
var wordContainer = document.getElementById('wordToGuess');
var getStartedContainer = document.getElementById('getStarted');
var wrongGuessesContainer = document.getElementById('wrongGuesses');
var livesContainer = document.getElementById('lives');
var livesIcons = document.getElementById('livesIcons');
var scoreBoardContainer = document.getElementById('scoreBoard');
var winsContainer = document.getElementById('wins');
var lossesContainer = document.getElementById('losses');

var game = {
  wins: 0,
  losses: 0,
  gameStarted: false,
  currentWordArray: [],
  lives: 4,
  lettersContainer: null,
  incorrectLetters: [],
  words: [
    {
      name: "Spider-Man",
      played: false
    },
    {
      name: "Vision",
      played: false
    },
    {
      name: "Steve Rogers",
      played: false
    },
    {
      name: "Vibranium",
      played: false
    },
    {
      name: "Hawkeye",
      played: false
    },
    {
      name: "Wakanda",
      played: false
    },
    {
      name: "Iron Man",
      played: false
    },
    {
      name: "Star-Lord",
      played: false
    }
  ],

  startNewGame: function() {
    // hide get started div
    getStartedContainer.classList.add('hidden');
    wordContainer.classList.remove('hidden');
    wrongGuessesContainer.classList.remove('hidden');
    livesContainer.classList.remove('hidden');
    scoreBoardContainer.classList.remove('hidden');

    this.gameStarted = true;
    this.lives = 4;
    this.setUpWordInfo();
    this.updateLivesRemaining();
    this.updateScoreBoard();
  },
 
  getRandomIndex: function() {

    // if there are any available words to play, return a random index
    if (!this.words.every(x => x.played === true)) {
      var rInd = null;
      var ind
      
      do {
        ind = Math.floor(Math.random() * this.words.length)
        if (!this.words[ind].played) { rInd = ind; }
      } while (rInd === null)
      
      return ind;

    } else {
      // reset it if there are no more available words
      this.resetWords();
    }
  
  },

  resetWords: function() {
    this.words.forEach(function(val) {
      val.played = false;
    });
    this.setUpWordInfo();
  },

  setUpWordInfo: function() {
    // flush current word and guessed letters arrays
    this.currentWordArray = [];
    this.incorrectLetters = [];
    this.renderWrongLetters();

    var currentIndex = this.getRandomIndex();
    console.log(currentIndex);

    this.words[currentIndex].played = true;
    var wordArray = this.words[currentIndex].name.split('');

    wordArray.forEach(function(char, i) {
      var special = (!char.match(letters)) ? true : false;
      this.currentWordArray.push({ letter: char, answered: special, nonAlpha: special })
    }.bind(this))

    this.renderWord();   
  },

  renderWord: function() {
    // flush the current div
    while(wordContainer.firstChild) {
      wordContainer.removeChild(wordContainer.firstChild);
    }

    this.currentWordArray.forEach(function(char, i) {
      var letterSpan = document.createElement('span');
      letterSpan.classList.add('letterSpace');

      if (!char.nonAlpha) {
        if (!char.answered) {
          letterSpan.innerText = '_';
        } else {
          letterSpan.innerText = char.letter;
        }
      } else {
        letterSpan.classList.add('noBorder');
        letterSpan.innerText = char.letter;
      }

      wordContainer.append(letterSpan);
    
    }.bind(this))
  },

  checkLetter: function(l) {
    // look for the letter in the current word array
    // set that object's anwswered property to true if it's found
    var letterRight = false;
    var alreadyGuessedCorrect = false;
    this.currentWordArray.forEach(function(val) {
      if (val.letter.toLowerCase() === l) {
        letterRight = true;
        alreadyGuessedCorrect = (!val.answered) ? false : true;
        val.answered = true;
      }
    });
    // if there were right letters found, re-render the word
    if (letterRight === true) {
      // prevent already correct guessed letters from scoring
      if (alreadyGuessedCorrect === false) {
        this.renderWord();
        this.handleScoring(true);
      }
    } else {
      // if this letter hasn't already been guessed
      if (this.incorrectLetters.indexOf(l) === -1) {
        this.incorrectLetters.push(l);
        this.renderWrongLetters();
        this.handleScoring(false);
      }      
    }
    
  },

  handleScoring: function(correct) {
    if (correct) {
      if (this.currentWordArray.every(w => w.answered === true)) {
        this.wins = this.wins += 1;
        this.completedWordResponse();
      }
    } else {
      this.lives = this.lives -= 1;
      this.updateLivesRemaining();
      
      if (this.lives === 0) { 
        this.losses = this.losses += 1;
        this.failedWordResponse();
      }
    }
    
    this.updateScoreBoard();
  },

  renderWrongLetters: function() {
    // flush the current div
    while(wrongGuessesContainer.firstChild) {
      wrongGuessesContainer.removeChild(wrongGuessesContainer.firstChild);
    }

    this.incorrectLetters.forEach(function(l) {
      wrongGuessesContainer.append(l);
    });
  },

  updateLivesRemaining: function() {
    while(livesIcons.firstChild) {
      livesIcons.removeChild(livesIcons.firstChild);
    }
    
    for (i = 0; i < this.lives; i++) {
      livesIcons.append('*');
    }  
  },

  updateScoreBoard: function() {
    winsContainer.innerText = this.wins;
    lossesContainer.innerText = this.losses;
  },

  completedWordResponse: function() {
    // play correct word sound

    // show captain america

    setTimeout(function() {
      this.setUpWordInfo();
      this.lives = 4; // reset
      this.updateLivesRemaining();
    }.bind(this), 1500);
  },

  failedWordResponse: function() {
    
    // play failed game sound
    console.log('fail!');
    
    // show thanos
    
    setTimeout(function() {
      this.setUpWordInfo();
      this.lives = 4; // reset
      this.updateLivesRemaining();
    }.bind(this), 1500);

  }


}



// listen for user input
document.addEventListener('keyup', function(e) {

  if (!game.gameStarted) {

    game.startNewGame();

    // start the game
  } else {
    var theKey = e.key.toLowerCase()
  
    if (theKey.match(letters)) {
      game.checkLetter(theKey);
    }

  }

 
    
})
  

// get the party started



// NOTES: split array out for current word and save into object value first. will be WAY cleaner.