import { CampaignGameplay } from '../components'
import { factoringChallengeGenerator } from '../challenge-generators'

export default () => {
  return (
    <CampaignGameplay
      levelName="factorización"
      challengeGenerator={factoringChallengeGenerator}
      successBadgeId={1}
    />
  )
}
