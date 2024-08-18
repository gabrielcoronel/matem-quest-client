export default class {
  static getInteger(lowerBound, upperBound) {
    console.assert(upperBound >= lowerBound)

    const integerLowerBound = Math.ceil(lowerBound)
    const integerUpperBound = Math.floor(upperBound)
    const differential = integerUpperBound - integerLowerBound
    const integer = Math.round(Math.random() * differential) + integerLowerBound

    return integer
  }
}
