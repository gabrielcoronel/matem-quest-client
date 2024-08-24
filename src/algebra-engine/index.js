import Randomizer from '../utils/randomizer'

Array.prototype.permute = function() {
  const permutation = [...this]

  for (let travelingIndex = 0; travelingIndex < this.length; travelingIndex += 1) {
    const swapingIndex = Randomizer.getInteger(0, this.length - 1)
    const swapingSpace = permutation[travelingIndex]
    permutation[travelingIndex] = permutation[swapingIndex]
    permutation[swapingIndex] = swapingSpace
  }

  return permutation
}

Array.prototype.generate = function(generator) {
  const generated = this
    .fill(null)
    .map((_, index) => generator(index))

  return generated
}

Array.prototype.squash = function(squasher) {
  console.assert(this.length !== 0)

  const squashed = this.reduce((accumulator, current) => squasher(accumulator, current))

  return squashed
}

export { default as Fraction } from './fraction.js'
export { default as Polynomial } from './polynomial.js'
export { default as Rational } from './rational.js'
