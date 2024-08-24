import Algebra from '../algebra.js-patch/algebra.js'

class Generator {
  static getFraction(numerator, denominator) {
    const fraction = new Algebra.Fraction(numerator, denominator)

    return fraction
  }
}

class Operator {
  static getSum(fractions) {
    const sum = fractions.squash((sum, current) => sum.add(current))

    return sum
  }

  static getDifference(fractions) {
    const difference = fractions.squash((difference, current) => difference.subtract(current))

    return difference
  }

  static getProduct(fractions) {
    const product = fractions.squash((product, current) => product.multiply(current))

    return product
  }

  static getQuotient(fractions) {
    const quotient = fractions.squash((quotient, current) => quotient.divide(current))

    return quotient
  }
}

export default {
  Operator,
  Generator
}
