import Algebra from '../algebra.js-patch/algebra.js'
import Randomizer from '../utils/randomizer'

class LinearFamily {
  #linear
  #conjugate
  #linearCubicPair
  #conjugateCubicPair
  #slope
  #intersect

  constructor(variable, slope, intersect) {
    this.#linear = Algebra.parse(`${slope} * ${variable} + ${intersect}`)
    this.#conjugate = Algebra.parse(`${slope} * ${variable} - ${intersect}`)
    this.#linearCubicPair = Algebra.parse(`${slope * slope} * ${variable}^2 - ${slope * intersect} * ${variable} + ${intersect * intersect}`)
    this.#conjugateCubicPair = Algebra.parse(`${slope * slope} * ${variable}^2 + ${slope * intersect} * ${variable} + ${intersect * intersect}`)
    this.#slope = slope
    this.#intersect = intersect
  }

  getLinear() {
    return this.#linear
  }

  getConjugate() {
    return this.#conjugate
  }

  getLinearCubicPair() {
    return this.#linearCubicPair
  }

  getConjugateCubicPair() {
    return this.#conjugateCubicPair
  }

  getSlope() {
    return this.#slope
  }

  getIntersect() {
    return this.#intersect
  }

  getRoot() {
    const root = new Algebra.Fraction(this.#intersect * -1, this.#slope)

    return root
  }
}

class Equation {
  #polynomial
  #constant
  #solutionSet

  constructor(polynomial, constant, solutionSet) {
    this.#polynomial = polynomial
    this.#constant = constant
    this.#solutionSet = solutionSet
  }

  toString() {
    const polynomialString = this.#polynomial.toString()
    const equationString = `${polynomialString} = ${this.#constant}`

    return equationString
  }

  toTex() {
    const polynomialTexString = this.#polynomial.toTex()
    const equationTexString = `${polynomialTexString} = ${this.#constant}`

    return equationTexString
  }

  getSolutionSet() {
    return this.#solutionSet
  }
}

class Generator {
  static getCoefficients() {
    const primes = [1, 2, 3, 5, 7]
    const coefficients = primes.permute()

    return coefficients
  }

  static getVariables() {
    const possibleVariables = ["w", "x", "y", "z"]
    const variables = possibleVariables.permute()

    return variables
  }

  static getLinearFamily(variable) {
    const [slope, intersect] = Generator.getCoefficients()
    const linearFamily = new LinearFamily(variable, slope, intersect)

    return linearFamily
  }

  static getCuadratic(variable) {
    const [a, b, c] = Generator.getCoefficients()
    const cuadratic = Algebra.parse(`${a} * ${variable}^2 + ${b} * ${variable} + ${c}`)

    return cuadratic
  }

  static getEquation(degree) {
    console.assert(degree > 0)

    const [variable] = Generator.getVariables()
    const scalingFactor = Randomizer.getInteger(1, 2)
    const linearFamilies = new Array(degree)
      .generate(_ => Generator.getLinearFamily(variable))
    const constantPolynomialTerm = scalingFactor * linearFamilies
      .map((family) => family.getIntersect())
      .reduce((product, current) => product * current)
    const constant = Randomizer.getInteger(
      (-1 * constantPolynomialTerm) / 2,
      constantPolynomialTerm / 2
    )
    const polynomial = Operator.getProduct([
      ...linearFamilies.map((family) => family.getLinear()),
      scalingFactor
    ])
    const rearrangedPolynomial = polynomial.add(constant)
    const solutionSet = linearFamilies
      .map((family) => family.getRoot())
    const equation = new Equation(rearrangedPolynomial, constant, solutionSet)

    return equation
  }
}

class Operator {
  static getSum(polynomials) {
    const sum = polynomials.squash((sum, current) => sum.add(current))

    return sum
  }

  static getDifference(polynomials) {
    const difference = polynomials.squash((difference, current) => difference.subtract(current))

    return difference
  }

  static getProduct(polynomials) {
    const product = polynomials.squash((product, current) => product.multiply(current))

    return product
  }
}

class Displayer {
  static stringify(polynomial) {
    const string = polynomial.toString()

    return string
  }

  static texify(polynomial) {
    const texString = polynomial.toTex()

    return texString
  }
}

export default {
  LinearFamily,
  Equation,
  Generator,
  Operator,
  Displayer
}
