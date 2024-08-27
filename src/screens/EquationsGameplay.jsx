import { CampaignGameplay } from '../components'
import { equationsChallengeGenerator } from '../challenge-generators'

export default () => {
  return (
    <CampaignGameplay
      levelName="ecuaciones"
      challengeGenerator={equationsChallengeGenerator}
      successBadgeId={3}
    />
  )
}
