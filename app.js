// DOM Declarations
const lettersBox = document.querySelector(".letters-box")
const wordLetters = document.querySelector(".word-letters")
const drawBox = document.querySelector(".draw-box")
const gameEnd = document.querySelector(".game-end")
const loseUI = document.querySelector(".lose")
const wordUI = document.querySelector(".lose span")
const winUI = document.querySelector(".win")
const wrongTriesUI = document.querySelector(".win span")
const categoryBtn = document.querySelectorAll(".btn")
const overlay = document.querySelector(".categories-container")
const content = document.querySelector(".game-end")

// Generate Alphabet letters
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Wrongs Answers Counter
let wrongAnswers = 0
// Corrcets Answers Counter
let correctAnswers = 0

const duration = 120;
let timerInterval = null;

categoryBtn.forEach(btn => {

  btn.addEventListener("click", () => {
    countDown()
    // Hide The Overlay When Choosing The Category
    overlay.style.display = "none"
    // Set Url category from html
    const categoryURL = btn.dataset.category;

    let myRequest = new XMLHttpRequest
    myRequest.onreadystatechange = function () {

      if (this.readyState === 4 && this.status === 200) {

        // Add To UI
        alphabet.forEach(letter => {
          lettersBox.innerHTML += `<div class="letter-box">${letter}</div>`
        })

        let categories = JSON.parse(this.responseText);

        // Get Random Value From the object words
        const randomKeyNum = Math.floor(Math.random() * categories.length)
        const randomValue = categories[randomKeyNum].title
        category.innerHTML = categories[randomKeyNum].category

        // Transform the randomValue to Array
        const letters = randomValue.split("")
        console.log(categories[randomKeyNum].title)

        letters.forEach(l => {
          const div = document.createElement("div")
          const span = document.createElement("span")

          if (l === " ") {
            div.classList.add("spacing")
            correctAnswers++
          }

          div.classList.add("alphabet-box")
          div.appendChild(span)
          wordLetters.appendChild(div)

          // wordLetters.innerHTML += `<div class="alphabet-box"><span></span></div>`
        })


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

            // Show Message ALert
            if (wrongAnswers === 5) {
              gameEnded("You Lose This Time", false)
            }

            else if (correctAnswers === letters.length) {
              gameEnded("Congratulation You Win", true)
            }

          }
        })
      }
    }

    myRequest.open("GET", categoryURL, true);
    myRequest.send();
  }
  )
})


// Show The Alert Message
function gameEnded(message, type) {
  // Dispaly The Alert
  content.style.display = "flex"

  // Stop the timer
  clearInterval(timerInterval)

  if (type)
    content.innerHTML = `<div class="win">
    <p>${message}:)</p>
    <p>Your Wrong Answers Are : <span></span></p>
    <p class="try">Try Again</p>
  </div>`

  else {
    content.innerHTML = `<div class="lose">
    <p>${message}:(</p>
    <p>The Word is <span></span></p>
    <p class="try">Try Again</p>
  </div>`
  }
}

// Restart The Game
document.addEventListener("click", e => {
  if (e.target.className === "try") {
    location.reload()
  }
})


function countDown() {

  // Credit: Mateusz Rybczonec
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;

  const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };

  let timePassed = 0;
  let timeLeft = duration;
  let remainingPathColor = COLOR_CODES.info.color;

  document.getElementById("app").innerHTML = `
  <div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g class="base-timer__circle">
  <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
  <path
  id="base-timer-path-remaining"
  stroke-dasharray="283"
  class="base-timer__path-remaining ${remainingPathColor}"
  d="
  M 50, 50
  m -45, 0
  a 45,45 0 1,0 90,0
  a 45,45 0 1,0 -90,0
  "
  ></path>
  </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
  </div>
  `;

  startTimer();

  function onTimesUp() {
    clearInterval(timerInterval);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = duration - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        onTimesUp();
        gameEnded("Time's Up", false)
      }
    }, 1000);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / duration;
    return rawTimeFraction - (1 / duration) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
}
