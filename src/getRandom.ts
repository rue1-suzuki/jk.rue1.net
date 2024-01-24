const getRandom = async () => {
  try {
    const response = await fetch('https://api.rue1.net/randoms/')
    if (response.ok) {
      const data: { random: number } = await response.json()
      return data.random
    }
  }
  catch (error) {
    console.error(error)
  }

  return Math.floor(Math.random() * 100)
}

export default getRandom
