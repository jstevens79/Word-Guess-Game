
var letters = /^[a-zA-Z]+$/;

var game = {
  wins: 0,
  losses: 0,
  gameStarted: false,
  currentIndex: 0,
  currentWordArray: [],
  lives: 10,
  lettersContainer: null,
  wordContainer: document.getElementById('wordToGuess'),
  getStartedContainer: document.getElementById('getStarted'),
  wrongGuessesContainer: document.getElementById('wrongGuesses'),
  incorrectLetters: [],
  characters: [
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
    this.getStartedContainer.classList.add('hidden');
    this.wordContainer.classList.remove('hidden');
    this.gameStarted = true;

    this.setUpWordInfo();
  },
 
  getRandomIndex: function() {
    // if all character's haven't been played. maybe move this out a level???
    if (this.characters.every(x => x.played !== true)) {

      // keep on looking for a random character that hasn't been played yet
      var rInd = null;
      
      do {
        var ind = Math.floor(Math.random() * this.characters.length)
        if (!this.characters[ind].played) { rInd = ind; }
      } while (rInd === null)

      return ind;

    } else {
      // prompt start over somewhere...
      console.log('all played!')
    }
  
  },

  setUpWordInfo: function() {
    // flush current word array
    this.currentWordArray = [];
    this.currentIndex = this.getRandomIndex();
    var wordArray = this.characters[this.currentIndex].name.split('');

    wordArray.forEach(function(char, i) {
      var special = (!char.match(letters)) ? true : false;
      this.currentWordArray.push({ letter: char, answered: special, nonAlpha: special })
    }.bind(this))

    this.renderWord();   
  },

  renderWord: function() {
    // flush the current div
    while(this.wordContainer.firstChild) {
      this.wordContainer.removeChild(this.wordContainer.firstChild);
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

      this.wordContainer.append(letterSpan);
    
    }.bind(this))
  },

  checkLetter: function(l) {
    var somethingRight = false;
    this.currentWordArray.forEach(function(val) {
      if (val.letter.toLowerCase() === l) {
        somethingRight = true;
        val.answered = true;
      }
    });

    if (somethingRight === true) {
      this.renderWord();
      if (this.currentWordArray.every(w => w.answered === true)) {
        this.completedWordResponse();
      }
    } else {
      this.incorrectLetters.push(l);
      this.renderWrongLetters();
    }    
  },

  renderWrongLetters: function() {
    // flush the current div
    while(this.wrongGuessesContainer.firstChild) {
      this.wrongGuessesContainer.removeChild(this.wrongGuessesContainer.firstChild);
    }

    this.incorrectLetters.forEach(function(l) {
      this.wrongGuessesContainer.append(l);
    }.bind(this));
  },

  completedWordResponse: function() {
    setTimeout(function() {
      this.setUpWordInfo()
    }.bind(this), 1500);
  },

  completedGameResponse: function() {

  },

  failedGame: function() {

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