import { CampaignGameplay } from '../components'
import { rationalExpressionsChallengeGenerator } from '../challenge-generators'

export default () => {
  return (
    <CampaignGameplay
      levelName="expresiones racionales"
      challengeGenerator={rationalExpressionsChallengeGenerator}
      successBadgeId={2}
    />
  )
}
