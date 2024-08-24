import { Polynomial } from '../algebra-engine'
import { generateChallengeOptions } from './common.js'

const getCommonFactor = () => {
  const [firstVariable, secondVariable] = Polynomial.Generator.getVariables()
  const [scalingFactor] = Polynomial.Generator.getCoefficients()
  const polynomial = Polynomial.Generator.getCuadratic(firstVariable)
  const expansion = Polynomial.Operator.getProduct([
    polynomial,
    scalingFactor,
    firstVariable,
    secondVariable
  ])
  const optionsTexContents = [
    `${scalingFactor === 1 ? "" : scalingFactor}${firstVariable}${secondVariable}(${Polynomial.Displayer.texify(polynomial)})`,
    `${scalingFactor * 2}${firstVariable}${secondVariable}(${Polynomial.Displayer.texify(polynomial)})`,
    `${scalingFactor + 1}${firstVariable}${secondVariable}(${Polynomial.Displayer.texify(polynomial)})`,
    `${scalingFactor === 1 ? "" : scalingFactor}${firstVariable}${secondVariable}(${Polynomial.Displayer.texify(Polynomial.Operator.getProduct([polynomial, 2]))})`
  ]
  const challenge = {
    statement: "Factoriza el siguiente polinomio utilizando la técnica de factor común",
    texContent: Polynomial.Displayer.texify(expansion),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getGrouping = () => {
  const firstLinearFamily = Polynomial.Generator.getLinearFamily("r")
  const secondLinearFamily = Polynomial.Generator.getLinearFamily("s")
  const firstLinearPolynomial = firstLinearFamily.getLinear()
  const firstLinearConjugate = firstLinearFamily.getConjugate()
  const secondLinearPolynomial = secondLinearFamily.getLinear()
  const [scalingFactor] = Polynomial.Generator.getCoefficients()
  const expansion = Polynomial.Operator.getProduct([
    firstLinearPolynomial,
    secondLinearPolynomial,
    scalingFactor
  ])
  const optionsTexContents = [
    `${scalingFactor === 1 ? "" : scalingFactor}(${Polynomial.Displayer.texify(firstLinearPolynomial)})(${Polynomial.Displayer.texify(secondLinearPolynomial)})`,
    `${scalingFactor === 1 ? "" : scalingFactor}(${Polynomial.Displayer.texify(firstLinearConjugate)})(${Polynomial.Displayer.texify(secondLinearPolynomial)})`,
    `${scalingFactor + 1}(${Polynomial.Displayer.texify(firstLinearPolynomial)})(${Polynomial.Displayer.texify(secondLinearPolynomial)})`,
    `${scalingFactor * 2}(${Polynomial.Displayer.texify(firstLinearPolynomial)})(${Polynomial.Displayer.texify(secondLinearPolynomial)})`
  ]
  const challenge = {
    statement: "Factoriza el siguiente polinomio utilizando la técnica de agrupación",
    texContent: Polynomial.Displayer.texify(expansion),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getInspection = () => {
  const firstLinearFamily = Polynomial.Generator.getLinearFamily("x")
  const secondLinearFamily = Polynomial.Generator.getLinearFamily("x")
  const firstLinearPolynomial = firstLinearFamily.getLinear()
  const firstLinearConjugate = firstLinearFamily.getConjugate()
  const secondLinearPolynomial = secondLinearFamily.getLinear()
  const secondLinearConjugate = secondLinearFamily.getConjugate()
  const expansion = Polynomial.Operator.getProduct([
    firstLinearPolynomial,
    secondLinearPolynomial
  ])
  const optionsTexContents = [
    `(${Polynomial.Displayer.texify(firstLinearPolynomial)})(${Polynomial.Displayer.texify(secondLinearPolynomial)})`,
    `(${Polynomial.Displayer.texify(firstLinearPolynomial)})(${Polynomial.Displayer.texify(secondLinearConjugate)})`,
    `(${Polynomial.Displayer.texify(firstLinearConjugate)})^{2}`,
    `(${Polynomial.Displayer.texify(firstLinearPolynomial)})(${Polynomial.Displayer.texify(firstLinearPolynomial)})`
  ]
  const challenge = {
    statement: "Factoriza el siguiente polinomio utilizando la técnica de inspección",
    texContent: Polynomial.Displayer.texify(expansion),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getDifferenceOfSquares = () => {
  const linearFamily = Polynomial.Generator.getLinearFamily("x")
  const linearPolynomial = linearFamily.getLinear()
  const linearConjugate = linearFamily.getConjugate()
  const expansion = Polynomial.Operator.getProduct([
    linearPolynomial,
    linearConjugate
  ])
  const optionsTexContents = [
    `(${Polynomial.Displayer.texify(linearPolynomial)})(${Polynomial.Displayer.texify(linearConjugate)})`,
    `(${Polynomial.Displayer.texify(linearPolynomial)})(${Polynomial.Displayer.texify(linearPolynomial)})`,
    `(${Polynomial.Displayer.texify(linearConjugate)})(${Polynomial.Displayer.texify(linearConjugate)})`,
    `2(${Polynomial.Displayer.texify(linearPolynomial)})(${Polynomial.Displayer.texify(linearConjugate)})`
  ]
  const challenge = {
    statement: "Factoriza la siguiente diferencia de cuadrados",
    texContent: Polynomial.Displayer.texify(expansion),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getPerfectSquare = () => {
  const linearFamily = Polynomial.Generator.getLinearFamily("y")
  const linearPolynomial = linearFamily.getLinear()
  const linearConjugate = linearFamily.getConjugate()
  const expansion = Polynomial.Operator.getProduct([
    linearPolynomial,
    linearPolynomial
  ])
  const optionsTexContents = [
    `(${Polynomial.Displayer.texify(linearPolynomial)})^{2}`,
    `(${Polynomial.Displayer.texify(linearConjugate)})^{2}`,
    `(${Polynomial.Displayer.texify(linearPolynomial)})(${Polynomial.Displayer.texify(linearConjugate)})`,
    `3(${Polynomial.Displayer.texify(linearPolynomial)})^{2}`
  ]
  const challenge = {
    statement: "Factoriza el siguiente cuadrado perfecto",
    texContent: Polynomial.Displayer.texify(expansion),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getCubes = () => {
  const linearFamily = Polynomial.Generator.getLinearFamily("w")
  const linearPolynomial = linearFamily.getLinear()
  const linearConjugate = linearFamily.getConjugate()
  const linearCubicPair = linearFamily.getLinearCubicPair()
  const conjugateCubicPair = linearFamily.getConjugateCubicPair()
  const expansion = Polynomial.Operator.getProduct([
    linearPolynomial,
    linearCubicPair
  ])
  const optionsTexContents = [
    `(${Polynomial.Displayer.texify(linearPolynomial)})(${Polynomial.Displayer.texify(linearCubicPair)})`,
    `(${Polynomial.Displayer.texify(linearPolynomial)})(${Polynomial.Displayer.texify(conjugateCubicPair)})`,
    `(${Polynomial.Displayer.texify(linearConjugate)})(${Polynomial.Displayer.texify(linearCubicPair)})`,
    `(${Polynomial.Displayer.texify(linearConjugate)})(${Polynomial.Displayer.texify(conjugateCubicPair)})`
  ]
  const challenge = {
    statement: "Factoriza la siguiente combinación lineal de cubos",
    texContent: Polynomial.Displayer.texify(expansion),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

export default {
  getCommonFactor,
  getGrouping,
  getInspection,
  getDifferenceOfSquares,
  getPerfectSquare,
  getCubes
}
