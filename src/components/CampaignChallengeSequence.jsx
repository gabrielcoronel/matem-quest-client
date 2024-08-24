import { useState } from 'react'
import { Challenge } from './'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

export default ({ challenges, setAccuracy, onFinish }) => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const isCurrentChallengeIndexLast = currentChallengeIndex >= (challenges.length - 1)
  const isCurrentChallengeIndexFirst = currentChallengeIndex <= 0
  const { statement, texContent, options } = challenges[currentChallengeIndex]

  const handleSelect = (isChallengeAccurate) => {
    setAccuracy(currentChallengeIndex, isChallengeAccurate)
  }

  const handleLeftAction = () => {
    const nextCurrentChallengeIndex = currentChallengeIndex - 1 >= 0
      ? currentChallengeIndex - 1
      : 0

    setCurrentChallengeIndex(nextCurrentChallengeIndex)
  }

  const handleRightAction = () => {
    if (isCurrentChallengeIndexLast) {
      onFinish()
    } else {
      const nextCurrentChallengeIndex = currentChallengeIndex + 1

      setCurrentChallengeIndex(nextCurrentChallengeIndex)
    }
  }

  return (
    <Challenge
      key={currentChallengeIndex}
      statement={statement}
      texContent={texContent}
      options={options}
      onSelect={handleSelect}
      leftAction={{
        hidden: isCurrentChallengeIndexFirst,
        icon: <ChevronLeft size={40} />,
        onAction: handleLeftAction
      }}
      rightAction={{
        icon: isCurrentChallengeIndexLast ? <Check size={40} /> : <ChevronRight size={40} />,
        onAction: handleRightAction
      }}
    />
  )
}
