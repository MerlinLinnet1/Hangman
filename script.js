const words = [
    "javascript", "hangman", "programming", "developer", "challenge", "openai", "algorithm",
    "computer", "internet", "website", "browser", "keyboard", "mouse", "monitor", "software",
    "hardware", "network", "database", "framework", "library", "function", "variable", "loop",
    "conditional", "syntax", "debugging", "responsive", "animation", "interface", "application"
  ];
  let selectedWord = "";
  let guessedLetters = [];
  let attemptsLeft = 6;
  
  // DOM Elements
  const wordDisplay = document.getElementById("word-display");
  const guessedLettersDisplay = document.getElementById("guessed-letters");
  const attemptsDisplay = document.getElementById("attempts");
  const letterInput = document.getElementById("letter-input");
  const guessButton = document.getElementById("guess-button");
  const resetButton = document.getElementById("reset-button");
  const message = document.getElementById("message");
  
  // Hangman parts
  const hangmanParts = [
    document.getElementById("head"),
    document.getElementById("body"),
    document.getElementById("left-arm"),
    document.getElementById("right-arm"),
    document.getElementById("left-leg"),
    document.getElementById("right-leg"),
  ];
  
  // Initialize the game
  function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attemptsLeft = 6;
    updateDisplay();
    message.textContent = "";
    letterInput.value = "";
    // Reset Hangman figure
    hangmanParts.forEach((part) => (part.style.visibility = "hidden"));
  }
  
  // Update the display
  function updateDisplay() {
    // Display the word with guessed letters
    const displayWord = selectedWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
    wordDisplay.textContent = displayWord;
  
    // Display guessed letters
    guessedLettersDisplay.textContent = guessedLetters.join(", ");
  
    // Display remaining attempts
    attemptsDisplay.textContent = attemptsLeft;
  
    // Check for win or lose
    if (!displayWord.includes("_")) {
      message.textContent = "🎉 Congratulations! You won!";
      endGame();
    } else if (attemptsLeft === 0) {
      message.textContent = `😢 Game over! The word was "${selectedWord}".`;
      endGame();
    }
  }
  
  // Handle guess
  function handleGuess() {
    const letter = letterInput.value.toLowerCase();
    if (!letter || guessedLetters.includes(letter)) {
      message.textContent = "⚠️ Please enter a valid letter.";
      return;
    }
  
    guessedLetters.push(letter);
    if (!selectedWord.includes(letter)) {
      attemptsLeft--;
      // Show the next Hangman part
      hangmanParts[6 - attemptsLeft - 1].style.visibility = "visible";
    }
  
    updateDisplay();
    letterInput.value = "";
  }
  
  // End the game
  function endGame() {
    guessButton.disabled = true;
    letterInput.disabled = true;
  }
  
  // Reset the game
  resetButton.addEventListener("click", () => {
    initGame();
    guessButton.disabled = false;
    letterInput.disabled = false;
  });
  
  // Guess button event listener
  guessButton.addEventListener("click", handleGuess);
  
  // Enter key event listener
  letterInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleGuess();
    }
  });
  
  // Initialize the game on page load
  initGame();