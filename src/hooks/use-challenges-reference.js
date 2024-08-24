import { useRef } from 'react'

export default (challengeGenerator) => {
  const generatedChallenges = Object.keys(challengeGenerator)
    .map((getterName) => challengeGenerator[getterName]())
  const permutedChallenges = generatedChallenges.permute()
  const challengesReference = useRef(permutedChallenges)

  return challengesReference
}
