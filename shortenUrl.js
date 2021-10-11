function shortenUrl() {
  const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerLetters = upperLetters.toLowerCase()
  const numbers = '0123456789'
  const letters = upperLetters + lowerLetters + numbers

  let shortUrl = ''

  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * letters.length)
    shortUrl += letters[index]
  }

  return shortUrl
}

module.exports = shortenUrl