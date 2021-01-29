// DOM Declarations
const lettersBox = document.querySelector(".letters-box")

// Generate Alphabet letters
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Add To UI
alphabet.forEach(letter => {
  lettersBox.innerHTML += `<div class="letter-box"><span>${letter}</span></div>`
})

const words = {
  movie: ["movieone", "movietwo", "moviethree"],
  person: ["personone", "persontwo", "personthree"]
}

const wordKey = Object.keys(words)
const randomKeyNum = Math.floor(Math.random() * wordKey.length)
const randomKey = wordKey[randomKeyNum]
console.log(randomKey)
category.innerHTML = randomKey