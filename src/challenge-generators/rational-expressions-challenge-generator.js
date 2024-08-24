import { Polynomial, Rational } from '../algebra-engine'
import { generateChallengeOptions } from './common.js'

const getSimplification = () => {
  const commonLinearFamily = Polynomial.Generator.getLinearFamily("x")
  const numeratorProperLinearFamily = Polynomial.Generator.getLinearFamily("x")
  const denominatorProperLinearFamily = Polynomial.Generator.getLinearFamily("x")
  const expansion = new Rational.Rational(
    [commonLinearFamily.getLinear(), numeratorProperLinearFamily.getLinear()],
    [commonLinearFamily.getLinear(), denominatorProperLinearFamily.getLinear()]
  )
  const optionsTexContents = [
    `${Rational.Displayer.texify(new Rational.Rational([numeratorProperLinearFamily.getLinear()], [denominatorProperLinearFamily.getLinear()]))}`,
    `${Rational.Displayer.texify(new Rational.Rational([numeratorProperLinearFamily.getConjugate()], [denominatorProperLinearFamily.getLinear()]))}`,
    `${Rational.Displayer.texify(new Rational.Rational([numeratorProperLinearFamily.getLinear(), commonLinearFamily.getLinear()], [denominatorProperLinearFamily.getLinear()]))}`,
    `${Rational.Displayer.texify(new Rational.Rational([numeratorProperLinearFamily.getLinear()], [denominatorProperLinearFamily.getConjugate()]))}`
  ]
  const challenge = {
    statement: "Simplifica la siguiente expresión racional",
    texContent: Rational.Displayer.texify(expansion),
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getAddition = () => {
  const firstNumeratorProperLinearFamily = Polynomial.Generator.getLinearFamily("r")
  const firstDenominatorProperLinearFamily = Polynomial.Generator.getLinearFamily("s")
  const secondNumeratorProperLinearFamily = Polynomial.Generator.getLinearFamily("s")
  const secondDenominatorProperLinearFamily = Polynomial.Generator.getLinearFamily("r")
  const firstTerm = new Rational.Rational(
    [firstNumeratorProperLinearFamily.getLinear()],
    [firstDenominatorProperLinearFamily.getLinear()]
  )
  const secondTerm = new Rational.Rational(
    [secondNumeratorProperLinearFamily.getLinear()],
    [secondDenominatorProperLinearFamily.getLinear()]
  )
  const optionsTexContents = [
    `${Rational.Displayer.texify(Rational.Operator.getSum([firstTerm, secondTerm]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getSum([firstTerm, new Rational.Rational([secondNumeratorProperLinearFamily.getConjugate()], [secondDenominatorProperLinearFamily.getLinear()])]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getSum([new Rational.Rational([firstNumeratorProperLinearFamily.getConjugate()], [firstDenominatorProperLinearFamily.getLinear()]), secondTerm]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getDifference([firstTerm, secondTerm]))}`,
  ]
  const challenge = {
    statement: "Realiza la siguiente suma",
    texContent: `${Rational.Displayer.texify(firstTerm)} + ${Rational.Displayer.texify(secondTerm)}`,
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getSubtraction = () => {
  const firstNumeratorProperLinearFamily = Polynomial.Generator.getLinearFamily("y")
  const firstDenominatorProperLinearFamily = Polynomial.Generator.getLinearFamily("w")
  const secondNumeratorProperLinearFamily = Polynomial.Generator.getLinearFamily("w")
  const secondDenominatorProperLinearFamily = Polynomial.Generator.getLinearFamily("y")
  const firstTerm = new Rational.Rational(
    [firstNumeratorProperLinearFamily.getLinear()],
    [firstDenominatorProperLinearFamily.getLinear()]
  )
  const secondTerm = new Rational.Rational(
    [secondNumeratorProperLinearFamily.getLinear()],
    [secondDenominatorProperLinearFamily.getLinear()]
  )
  const optionsTexContents = [
    `${Rational.Displayer.texify(Rational.Operator.getDifference([firstTerm, secondTerm]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getDifference([firstTerm, new Rational.Rational([secondNumeratorProperLinearFamily.getConjugate()], [secondDenominatorProperLinearFamily.getLinear()])]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getDifference([new Rational.Rational([firstNumeratorProperLinearFamily.getConjugate()], [firstDenominatorProperLinearFamily.getLinear()]), secondTerm]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getSum([firstTerm, secondTerm]))}`,
  ]
  const challenge = {
    statement: "Realiza la siguiente resta",
    texContent: `${Rational.Displayer.texify(firstTerm)} - ${Rational.Displayer.texify(secondTerm)}`,
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getMultiplication = () => {
  const firstNumeratorProperLinearFamily = Polynomial.Generator.getLinearFamily("t")
  const firstDenominatorProperLinearFamily = Polynomial.Generator.getLinearFamily("t")
  const secondNumeratorProperLinearFamily = Polynomial.Generator.getLinearFamily("t")
  const secondDenominatorProperLinearFamily = Polynomial.Generator.getLinearFamily("t")
  const firstTerm = new Rational.Rational(
    [firstNumeratorProperLinearFamily.getLinear()],
    [firstDenominatorProperLinearFamily.getLinear()]
  )
  const secondTerm = new Rational.Rational(
    [secondNumeratorProperLinearFamily.getLinear()],
    [secondDenominatorProperLinearFamily.getLinear()]
  )
  const optionsTexContents = [
    `${Rational.Displayer.texify(Rational.Operator.getProduct([firstTerm, secondTerm]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getProduct([firstTerm, new Rational.Rational([secondNumeratorProperLinearFamily.getConjugate()], [secondDenominatorProperLinearFamily.getLinear()])]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getProduct([new Rational.Rational([firstNumeratorProperLinearFamily.getConjugate()], [firstDenominatorProperLinearFamily.getLinear()]), secondTerm]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getQuotient([firstTerm, secondTerm]))}`,
  ]
  const challenge = {
    statement: "Realiza la siguiente multiplicación",
    texContent: `${Rational.Displayer.texify(firstTerm)} \\cdot ${Rational.Displayer.texify(secondTerm)}`,
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

const getDivision = () => {
  const firstNumeratorProperLinearFamily = Polynomial.Generator.getLinearFamily("u")
  const firstDenominatorProperLinearFamily = Polynomial.Generator.getLinearFamily("u")
  const secondNumeratorProperLinearFamily = Polynomial.Generator.getLinearFamily("u")
  const secondDenominatorProperLinearFamily = Polynomial.Generator.getLinearFamily("u")
  const firstTerm = new Rational.Rational(
    [firstNumeratorProperLinearFamily.getLinear()],
    [firstDenominatorProperLinearFamily.getLinear()]
  )
  const secondTerm = new Rational.Rational(
    [secondNumeratorProperLinearFamily.getLinear()],
    [secondDenominatorProperLinearFamily.getLinear()]
  )
  const optionsTexContents = [
    `${Rational.Displayer.texify(Rational.Operator.getQuotient([firstTerm, secondTerm]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getQuotient([firstTerm, new Rational.Rational([secondNumeratorProperLinearFamily.getConjugate()], [secondDenominatorProperLinearFamily.getLinear()])]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getQuotient([new Rational.Rational([firstNumeratorProperLinearFamily.getConjugate()], [firstDenominatorProperLinearFamily.getLinear()]), secondTerm]))}`,
    `${Rational.Displayer.texify(Rational.Operator.getProduct([firstTerm, secondTerm]))}`,
  ]
  const challenge = {
    statement: "Realiza la siguiente división",
    texContent: `${Rational.Displayer.texify(firstTerm)} \\div ${Rational.Displayer.texify(secondTerm)}`,
    options: generateChallengeOptions(optionsTexContents)
  }

  return challenge
}

export default {
  getSimplification,
  getAddition,
  getSubtraction,
  getMultiplication,
  getDivision
}
