import { Polynomial } from '../algebra-engine'

export const generateChallengeOptions = (texContents) => {
  const rawChallengeOptions = texContents
    .map((texContent, index) => {
      return {
        texContent,
        isCorrect: index === 0
      }
    })
  const permutedChallengeOptions = rawChallengeOptions.permute()

  return permutedChallengeOptions
}

export const formatSolutionSet = (solutionSet) => {
  const texifiedSolutionSet = solutionSet
    .map((solution) => Polynomial.Displayer.texify(solution))
  const concatenatedSolutionSet = texifiedSolutionSet.join(", ")
  const formattedSolutionSet = `S = \\{${concatenatedSolutionSet}\\}`

  return formattedSolutionSet
}
