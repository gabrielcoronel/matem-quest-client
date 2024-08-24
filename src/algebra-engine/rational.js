import Randomizer from '../utils/randomizer'
import Polynomial from './polynomial.js'

const enumerateFactorList = (factorList) => {
  const enumeration = {}

  for (const factor of factorList) {
    if (factor in enumeration) {
      enumeration[factor] += 1
    } else {
      const newKey = Displayer.stringify(factor)

      enumeration[newKey] = 1
    }
  }

  return enumeration
}

const mergeEnumerations = (a, b) => {
  const enumeration = Object.assign({}, a)

  for (const key in b) {
    if (!(key in enumeration) || enumeration[key] < b[key]) {
      enumeration[key] = b[key]
    }
  }

  return enumeration
}

const denumerateEnumeration = (enumeration) => {
  const factors = []

  for (const [factorKey, count] of Object.entries(enumeration)) {
    for (let _ = 0; _ < count; _++) {
      factors.push(Polynomial.Displayer.parse(factorKey))
    }
  }

  return factors
}

const getMinimumCommonMultiple = (factorLists) => {
  const enumerations = factorLists.map(
    (factorList) => enumerateFactorList(factorList)
  )
  const mergedEnumerations = enumerations.squash(
    (accumulator, current) => mergeEnumerations(accumulator, current)
  )
  const minimumCommonFactorList = denumerateEnumeration(mergedEnumerations)

  return minimumCommonFactorList
}

const diffEnumerations = (source, differential) => {
  const enumeration = {}

  for (const key in source) {
    if (!(key in differential)) {
      enumeration[key] = source[key]
    } else if (source[key] > differential[key]) {
      enumeration[key] = source[key] - differential[key]
    }
  }

  return enumeration
}

const diffFactorLists = (factorLists) => {
  const enumerations = factorLists.map(
    (factorList) => enumerateFactorList(factorList)
  )
  const diffedEnumerations = enumerations.squash(
    (accumulator, current) => diffEnumerations(accumulator, current)
  )
  const diffedFactorList = denumerateEnumeration(diffedEnumerations)

  return diffedFactorList
}

class Rational {
  #numeratorFactorList
  #denominatorFactorList

  constructor(numeratorFactorList, denominatorFactorList) {
    this.#numeratorFactorList = numeratorFactorList
    this.#denominatorFactorList = denominatorFactorList
  }

  add(rational) {
    const denominatorMinimumCommonFactorList = getMinimumCommonMultiple([
      this.#denominatorFactorList,
      rational.getDenominatorFactorList()
    ])
    const thisNumeratorMissingFactorList = diffFactorLists([
      denominatorMinimumCommonFactorList,
      this.#denominatorFactorList
    ])
    const rationalNumeratorMissingFactorList = diffFactorLists([
      denominatorMinimumCommonFactorList,
      rational.getDenominatorFactorList()
    ])
    const numerator = Polynomial.Operator.getSum([
      Polynomial.Operator.getProduct([...this.#numeratorFactorList, ...thisNumeratorMissingFactorList]),
      Polynomial.Operator.getProduct([...rational.getNumeratorFactorList(), ...rationalNumeratorMissingFactorList])
    ])

    const sum = new Rational([numerator], denominatorMinimumCommonFactorList)

    return sum
  }

  subtract(rational) {
    const denominatorMinimumCommonFactorList = getMinimumCommonMultiple([
      this.#denominatorFactorList,
      rational.getDenominatorFactorList()
    ])
    const thisNumeratorMissingFactorList = diffFactorLists([
      denominatorMinimumCommonFactorList,
      this.#denominatorFactorList
    ])
    const rationalNumeratorMissingFactorList = diffFactorLists([
      denominatorMinimumCommonFactorList,
      rational.getDenominatorFactorList()
    ])
    const numerator = Polynomial.Operator.getDifference([
      Polynomial.Operator.getProduct([...this.#numeratorFactorList, ...thisNumeratorMissingFactorList]),
      Polynomial.Operator.getProduct([...rational.getNumeratorFactorList(), ...rationalNumeratorMissingFactorList])
    ])
    const difference = new Rational([numerator], denominatorMinimumCommonFactorList)

    return difference
  }

  multiply(rational) {
    const numerator = [...this.#numeratorFactorList, ...rational.getNumeratorFactorList()]
    const denominator = [...this.#denominatorFactorList, ...rational.getDenominatorFactorList()]
    const product = new Rational(numerator, denominator)

    return product
  }

  divide(rational) {
    const numerator = [...this.#numeratorFactorList, ...rational.getDenominatorFactorList()]
    const denominator = [...this.#denominatorFactorList, ...rational.getNumeratorFactorList()]
    const product = new Rational(numerator, denominator)

    return product
  }

  toString() {
    const expandedNumerator = Polynomial.Operator.getProduct(this.#numeratorFactorList)
    const expandedDenominator = Polynomial.Operator.getProduct(this.#denominatorFactorList)
    const numeratorString = Polynomial.Displayer.stringify(expandedNumerator)
    const denominatorString = Polynomial.Displayer.stringify(expandedDenominator)
    const string = `(${numeratorString})/(${denominatorString})`

    return string
  }

  toTex() {
    const expandedNumerator = Polynomial.Operator.getProduct(this.#numeratorFactorList)
    const expandedDenominator = Polynomial.Operator.getProduct(this.#denominatorFactorList)
    const numeratorString = Polynomial.Displayer.stringify(expandedNumerator)
    const denominatorString = Polynomial.Displayer.stringify(expandedDenominator)
    const texString = `\\frac{${numeratorString}}{${denominatorString}}`

    return texString
  }

  getNumeratorFactorList() {
    return this.#numeratorFactorList
  }

  getDenominatorFactorList() {
    return this.#denominatorFactorList
  }
}

class Equation {
  #rational
  #solutionSet
  #restrictionSet

  constructor(rational, solutionSet, restrictionSet) {
    this.#rational = rational
    this.#solutionSet = solutionSet
    this.#restrictionSet = restrictionSet
  }

  toString() {
    const rationalString = this.#rational.toString()
    const string = `${rationalString} = 0`

    return string
  }

  toTex() {
    const rationalTexString = this.#rational.toTex()
    const texString = `${rationalTexString} = 0`

    return texString
  }

  getSolutionSet() {
    return this.#solutionSet
  }

  getRestrictionSet() {
    return this.#restrictionSet
  }
}

class Generator {
  static getEquation(numeratorDegree, denominatorDegree) {
    console.assert(numeratorDegree > 0 && denominatorDegree > 0)

    const [variable] = Polynomial.Generator.getVariables()
    const amountGuaranteedRestrictions = Randomizer.getInteger(0, (numeratorDegree + denominatorDegree) / 2)
    const guaranteedRestrictionsLinearFamilies = new Array(amountGuaranteedRestrictions)
      .generate(_ => Polynomial.Generator.getLinearFamily(variable))
    const numeratorLinearFamilies = [
      ...new Array(numeratorDegree - amountGuaranteedRestrictions)
        .generate(_ => Polynomial.Generator.getLinearFamily(variable)),
      ...guaranteedRestrictionsLinearFamilies
    ]
    const denominatorLinearFamilies = [
      ...new Array(denominatorDegree - amountGuaranteedRestrictions)
        .generate(_ => Polynomial.Generator.getLinearFamily(variable)),
      ...guaranteedRestrictionsLinearFamilies
    ]
    const numeratorFactorList = numeratorLinearFamilies
      .map((family) => family.getLinear())
    const denominatorFactorList = denominatorLinearFamilies
      .map((family) => family.getLinear())
    const rational = new Rational(numeratorFactorList, denominatorFactorList)
    const restrictionSet = denominatorLinearFamilies
      .map((family) => family.getRoot())
    const solutionSet = numeratorLinearFamilies
      .map((family) => family.getRoot())
      .filter((root) => !restrictionSet.some((restriction) => restriction.equalTo(root)))
    const equation = new Equation(rational, solutionSet, restrictionSet)

    return equation
  }
}

class Operator {
  static getSum(rationals) {
    const sum = rationals.squash((sum, current) => sum.add(current))

    return sum
  }

  static getDifference(rationals) {
    const difference = rationals.squash((difference, current) => difference.subtract(current))

    return difference
  }

  static getProduct(rationals) {
    const product = rationals.squash((product, current) => product.multiply(current))

    return product
  }

  static getQuotient(rationals) {
    const quotient = rationals.squash((quotient, current) => quotient.divide(current))

    return quotient
  }
}

class Displayer {
  static stringify(equation) {
    const string = equation.toString()

    return string
  }

  static texify(equation) {
    const texString = equation.toTex()

    return texString
  }
}

export default {
  Rational,
  Equation,
  Generator,
  Operator,
  Displayer
}
