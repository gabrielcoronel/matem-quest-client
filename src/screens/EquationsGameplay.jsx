import useChallengesReference from '../hooks/use-challenges-reference'
import useAccuracyArray from '../hooks/use-accuracy-array'
import { equationsChallengeGenerator } from '../challenge-generators'
import { CampaignChallengeSequence } from '../components'

export default () => {
  const challengesReference = useChallengesReference(equationsChallengeGenerator)
  const [accuracyState, setAccuracy] = useAccuracyArray(challengesReference.current.length)

  const handleFinish = () => {
    return null
  }

  return (
    <CampaignChallengeSequence
      challenges={challengesReference.current}
      setAccuracy={setAccuracy}
      onFinish={handleFinish}
    />
  )
}