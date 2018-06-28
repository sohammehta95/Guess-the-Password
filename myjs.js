$(function() {
  var wordCount = 10;
  var guessCount = 4;
  var password = '';

  var $start = $('#start');
  $start.on('click', function() {
    $('#start-screen').toggleClass('hide show');
    $('#game-screen').toggleClass('hide show');
    startGame();
  });

  // **** Start Game Function *****//

  function startGame() {
    // get random words and append them to the DOM
    var $wordList = $('#word-list');
    // 'words' variable is from words.js
    var randomWords = getRandomValues(words, wordCount);
    randomWords.forEach(function(word) {
      var $li = $('<li>', { text: word });
      $wordList.append($li);
    });

    // set a secret password and the guess count display
    password = getRandomValues(randomWords, 1)[0];
    setGuessCount(guessCount);

    // add update listener for clicking on a word
    $wordList.on('click', 'li', updateGame);
  }

  //Depnd startgame()
  //Random Values function (ES 2015 Arrow Function, Default Value, let)
  let getRandomValues = (array, numVals = wordCount) => shuffle(array).slice(0, numVals);

  function shuffle(array) {
    let arrayCopy = array.slice();
    for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
      // generate a random index between 0 and idx1 (inclusive)
      let idx2 = Math.floor(Math.random() * (idx1 + 1));

      // swap elements at idx1 and idx2
      [arrayCopy[idx1], arrayCopy[idx2]] = [arrayCopy[idx2], arrayCopy[idx1]];
    }
    return arrayCopy;
  }
  // Random Value ends

  //Depnd startgame()
  function setGuessCount(newCount) {
    guessCount = newCount;
    $('#guesses-remaining').innerText = `Guesses remaining: ${guessCount}.`; //ES2015 String Template
  }



  // *****Update Game Function  ******//

   function updateGame(e) {
    if (e.target.tagName === 'LI' && !e.target.classList.contains('disabled')) {
      // grab guessed word, check it against password, update view
      let guess = e.target.innerText;
      let similarityScore = compareWords(guess, password);
      e.target.classList.add('disabled');
      e.target.innerText = `${guess} --> Matching Letters: ${similarityScore}`;
      setGuessCount(guessCount - 1);


      // check whether the game is over
      var $wordList = $('#word-list');
      if (similarityScore === password.length) {
        $('#winner').toggleClass('hide show');
        $wordList.off();
      } else if (guessCount === 0) {
        $('#loser').toggleClass('hide show');
        $wordList.off();
      }
    }
  }


	function compareWords(word1, word2) {
	    if (word1.length !== word2.length) {
	      throw 'Words must have the same length';
	    }
	    let count = 0;
	    for (let i = 0; i < word1.length; i++) {
	      if (word1[i] === word2[i]) count++;
	    }
	    return count;
	  }

});