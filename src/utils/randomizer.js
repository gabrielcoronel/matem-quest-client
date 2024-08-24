class Randomizer {
  static getInteger(lowerBound, upperBound) {
    console.assert(upperBound >= lowerBound)

    const integerLowerBound = Math.ceil(lowerBound)
    const integerUpperBound = Math.floor(upperBound)
    const differential = integerUpperBound - integerLowerBound
    const integer = Math.round(Math.random() * differential) + integerLowerBound

    return integer
  }

  static getBoolean() {
    const integer = Randomizer.getInteger(0, 1)
    const boolean = integer === 0

    return boolean
  }
}

export default Randomizer
