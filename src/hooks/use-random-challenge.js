import { useState } from 'react'
import {
  factoringChallengeGenerator,
  rationalExpressionsChallengeGenerator,
  equationsChallengeGenerator
} from '../challenge-generators'
import Randomizer from '../utils/randomizer'

const generateRandomChallenge = () => {
  const factoringChallenges = Object.keys(factoringChallengeGenerator)
    .map((getterName) => factoringChallengeGenerator[getterName]())
  const rationalExpressionsChallenges = Object.keys(rationalExpressionsChallengeGenerator)
    .map((getterName) => rationalExpressionsChallengeGenerator[getterName]())
  const equationsChallenges = Object.keys(equationsChallengeGenerator)
    .map((getterName) => equationsChallengeGenerator[getterName]())
  const allChallenges = [
    ...factoringChallenges,
    ...rationalExpressionsChallenges,
    ...equationsChallenges
  ]
  const randomIndex = Randomizer.getInteger(0, allChallenges.length - 1)
  const generatedChallenge = allChallenges[randomIndex]

  return generatedChallenge
}

export default () => {
  const [randomChallenge, setRandomChallenge] = useState(generateRandomChallenge())

  const regenerate = () => {
    const newRandomChallenge = generateRandomChallenge()

    setRandomChallenge(newRandomChallenge)
  }

  return [randomChallenge, regenerate]
}
