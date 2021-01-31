const categoryBtn = document.querySelectorAll(".btn")

categoryBtn.forEach(btn => {
  btn.addEventListener("click", e => {

    let myRequest = new XMLHttpRequest
    myRequest.onreadystatechange = function () {

      if (this.readyState === 4 && this.status === 200) {

        // DOM Declarations
        const lettersBox = document.querySelector(".letters-box")
        const wordLetters = document.querySelector(".word-letters")
        const drawBox = document.querySelector(".draw-box")
        const gameEnd = document.querySelector(".game-end")
        const loseUI = document.querySelector(".lose")
        const wordUI = document.querySelector(".lose span")
        const winUI = document.querySelector(".win")
        const wrongTriesUI = document.querySelector(".win span")

        // Wrongs Answers Counter
        let wrongAnswers = 0
        // Corrcets Answers Counter
        let correctAnswers = 0

        // Generate Alphabet letters
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

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
            // Run EndGame Function
            endGame()
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
          }
        })
      }
    }

    myRequest.open("GET", "json/movies.json", true);
    myRequest.send();
  }
  )
})





