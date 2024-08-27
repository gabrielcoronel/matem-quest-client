import { useState } from 'react'

export default (length) => {
  const [accuracies, setAccuracies] = useState(
    new Array(length).fill(null)
  )

  const setAccuracy = (index, accuracy) => {
    const newAccuracies = [...accuracies]

    newAccuracies[index] = accuracy

    setAccuracies(newAccuracies)
  }

  const getAccuracyState = () => {
    for (const accuracy of accuracies) {
      if (accuracy === null) {
        return "incomplete"
      } else if (accuracy === false) {
        return "incorrect"
      }
    }

    return "correct"
  }

  const accuracyState = getAccuracyState()

  return { accuracyState, accuracies, setAccuracy }
}
