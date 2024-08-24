import { Fraction, Polynomial, Rational } from '../algebra-engine'
import { generateChallengeOptions, formatSolutionSet } from './common.js'
import Randomizer from '../utils/randomizer'

const getLinear = () => {
  const equation = Polynomial.Generator.getEquation(1)
  const equationSolutionSet = equation.getSolutionSet()
  const optionsSolutionSets = [
    equationSolutionSet,
    [Fraction.Operator.getSum([equationSolutionSet[0], 1])],
    [Fraction.Operator.getProduct([equationSolutionSet[0], 2])],
    [Fraction.Operator.getDifference([equationSolutionSet[0], 3])],
  ]
  const optionsTexContents = optionsSolutionSets
    .map((solutionSet) => formatSolutionSet(solutionSet))
  const challenge = {
    statement: "Determina el conjunto de solución de la siguiente ecuación lineal",
    texContent: Polynomial.Displayer.texify(equation),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getCuadratic = () => {
  const equation = Polynomial.Generator.getEquation(2)
  const equationSolutionSet = equation.getSolutionSet()
  const optionsSolutionSets = [
    equationSolutionSet,
    [...equationSolutionSet, Fraction.Operator.getProduct([equationSolutionSet.at(-1), 2])],
    equationSolutionSet.slice(0, -1),
    []
  ]
  const optionsTexContents = optionsSolutionSets
    .map((solutionSet) => formatSolutionSet(solutionSet))
  const challenge = {
    statement: "Determina el conjunto de solución de la siguiente ecuación cuadrática",
    texContent: Polynomial.Displayer.texify(equation),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getPolynomialBiggerThanTwo = () => {
  const degree = Randomizer.getInteger(3, 4)
  const equation = Polynomial.Generator.getEquation(degree)
  const equationSolutionSet = equation.getSolutionSet()
  const optionsSolutionSets = [
    equationSolutionSet,
    [...equationSolutionSet, Fraction.Operator.getProduct([equationSolutionSet.at(-1), 2])],
    equationSolutionSet.slice(0, -1),
    []
  ]
  const optionsTexContents = optionsSolutionSets
    .map((solutionSet) => formatSolutionSet(solutionSet))
  const challenge = {
    statement: "Determina el conjunto de solución de la siguiente ecuación polinomial",
    texContent: Polynomial.Displayer.texify(equation),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getRational = () => {
  const numeratorDegree = Randomizer.getInteger(2, 3)
  const denominatorDegree = Randomizer.getInteger(2, 3)
  const equation = Rational.Generator.getEquation(numeratorDegree, denominatorDegree)
  const equationSolutionSet = equation.getSolutionSet()
  const equationRestrictionSet = equation.getRestrictionSet()
  const optionsSolutionSets = equationSolutionSet.length === 0 ?
    [
      equationSolutionSet,
      equationRestrictionSet,
      [Fraction.Generator.getFraction(0, 1)],
      "real"
    ] :
    [
      equationSolutionSet,
      equationRestrictionSet,
      [...equationSolutionSet, ...equationRestrictionSet],
      Randomizer.getBoolean() ? "real" : []
    ]
  const optionsTexContents = optionsSolutionSets
    .map((solutionSet) => {
      if (solutionSet === "real") {
        return "S = \\mathbb{R}"
      } else {
        return formatSolutionSet(solutionSet)
      }
    })
  const challenge = {
    statement: "Determina el conjunto de solución de la siguiente ecuación racional",
    texContent: Rational.Displayer.texify(equation),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

export default {
  getLinear,
  getCuadratic,
  getPolynomialBiggerThanTwo,
  getRational
}
