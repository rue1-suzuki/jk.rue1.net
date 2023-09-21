const fisherYatesShuffle = <T>(array: T[]): T[] => {
  const shuffledArray = [...array]

  let currentIndex = shuffledArray.length
  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    const temporaryValue = shuffledArray[currentIndex]
    shuffledArray[currentIndex] = shuffledArray[randomIndex]
    shuffledArray[randomIndex] = temporaryValue
  }

  return shuffledArray
}

export default fisherYatesShuffle
