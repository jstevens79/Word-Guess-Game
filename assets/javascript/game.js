
var game = {
  wins: 0,
  losses: 0,
  currentIndex: 0,
  currentWordArray: [],
  currentTries: 0,
  lettersContainer: null,
  wordContainer: document.getElementById('wordToGuess'),
  guessedLetters: [],
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
      name: "Black Panther",
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
    }
  ],
 
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
    }
  
  },

  setUpWordInfo: function() {
    this.currentIndex = this.getRandomIndex();

    var wordArray = this.characters[this.currentIndex].name.split('');

    wordArray.forEach(function(char, i) {
      var special = (!char.match(letters)) ? true : false;
      this.currentWordArray.push({ letter: char, answered: false, nonAlpha: special })
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
    })

    if (somethingRight === true) {
      this.renderWord();
      if (this.currentWordArray.every(w => w.answered === true)) {
        console.log('ready for next');
      }
    } else {
      // return an incorrect message
      // save incorrect letters?
    }    

  },

  startNewGame: function() {
    this.setUpWordInfo()
  }

}

var letters = /^[a-zA-Z]+$/;

// listen for user input
document.addEventListener('keyup', function(e) {
  var theKey = e.key.toLowerCase()
  
  if (theKey.match(letters)) {
    game.checkLetter(theKey);
  }
    
})
  

// get the party started
game.startNewGame()


// NOTES: split array out for current word and save into object value first. will be WAY cleaner.