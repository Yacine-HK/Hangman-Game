// DOM Declarations
const lettersBox = document.querySelector(".letters-box")
const wordLetters = document.querySelector(".word-letters")
const drawBox = document.querySelector(".draw-box")
const gameEnd = document.querySelector(".game-end")
const loseUI = document.querySelector(".lose")
const wordUI = document.querySelector(".lose span")
const winUI = document.querySelector(".win")
const wrongTriesUI = document.querySelector(".win span")

// Generate Alphabet letters
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Add To UI
alphabet.forEach(letter => {
  lettersBox.innerHTML += `<div class="letter-box">${letter}</div>`
})

const words = {
  movie: ["movieone", "movietwo", "moviethree"],
  person: ["personone", "persontwo", "personthree"]
}

// Get Random Key from the object words
const wordKey = Object.keys(words)
const randomKeyNum = Math.floor(Math.random() * wordKey.length)
const randomKey = wordKey[randomKeyNum]

// Display The Random Key in UI
category.innerHTML = randomKey

// Get Random Value From the object words
const randomValueNum = Math.floor(Math.random() * words[randomKey].length)
const randomValue = words[randomKey][randomValueNum]

// Transform the randomValue to Array
const letters = randomValue.split("")

letters.forEach(l => {
  wordLetters.innerHTML += `<div class="alphabet-box"><span></span></div>`
})

// Wrongs Answers Counter
let wrongAnswers = 0
// Corrcets Answers Counter
let correctAnswers = 0

document.addEventListener("click", e => {
  // Status
  let status = false
  // Letters Box UI
  const allLetters = document.querySelectorAll(".alphabet-box span")

  if (e.target.className === "letter-box") {
    // Cant Click Again 
    e.target.classList.add("select")
    // The Clicked Letter
    const clickedLetter = e.target.innerHTML

    // Loop in The Random Letter Array
    letters.forEach((letter, indx) => {

      // If The clickedLetter And The Choosen letter Are mathed
      if (letter === clickedLetter) {
        correctAnswers++
        status = true
        // Loop In Letters box UI
        allLetters.forEach((span, spnIndx) => {
          // If The indexs Are Matched
          if (spnIndx === indx) {
            // Add The Correct Letter in The Box UI
            span.innerHTML = clickedLetter
          }
        })
      }
    })

    // If the ClickedLetter Is Wrong
    if (!status) {
      drawBox.classList.add(`wrong${wrongAnswers}`)
      wrongAnswers++
    }
    // Run EndGame Function
    endGame()
  }
})

function endGame() {

  if (wrongAnswers === 5 || correctAnswers === letters.length) {
    gameEnd.style.display = "flex"
  }

  if (wrongAnswers === 5) {
    loseUI.style.display = "flex"
    wordUI.innerHTML = randomValue
  }

  else if (correctAnswers === letters.length) {
    winUI.style.display = "flex"
    wrongTriesUI.innerHTML = wrongAnswers
  }
}