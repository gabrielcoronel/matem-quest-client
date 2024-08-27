import { usePlayer } from '../contexts/player-context'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useModalHandler from '../hooks/use-modal-handler'
import useChallengesReference from '../hooks/use-challenges-reference'
import useAccuracyArray from '../hooks/use-accuracy-array'
import toast from '../utils/toast'
import { PlayersClient } from '../clients'
import { WifiOff, Award } from 'lucide-react'
import {
  CampaignChallengeSequence,
  CampaignResultsModal,
  Spinner
} from '../components'

export default ({ levelName, challengeGenerator, successBadgeId }) => {
  const navigate = useNavigate()
  const { player } = usePlayer()
  const challengesReference = useChallengesReference(challengeGenerator)
  const { accuracies, accuracyState, setAccuracy } = useAccuracyArray(challengesReference.current.length)
  const { isOpen, onOpen, onClose } = useModalHandler()

  const handleOnMutate = () => {
    toast(
      <Spinner size={40} />,
      "Sorpresa...",
      "Espera un momento"
    )
  }

  const handleOnError = () => {
    toast(
      <WifiOff size={40} />,
      "Error de conexión",
      "Revisa tu conexión a Internet"
    )
  }

  const handleOnSuccess = () => {
    toast(
      <Award size={40} />,
      "¡Nueva medalla!",
      `Completaste el nivel de ${levelName}`
    )
  }
  
  const successMutation = useMutation({
    mutationFn: () => PlayersClient.addBadge(player?.playerId, successBadgeId),
    onMutate: handleOnMutate,
    onError: handleOnError,
    onSuccess: handleOnSuccess
  })

  const handleFinish = () => {
    if (accuracyState === "correct") {
      successMutation.mutate()
    }

    onOpen()
  }

  return (
    <>
      <CampaignChallengeSequence
        challenges={challengesReference.current}
        setAccuracy={setAccuracy}
        onFinish={handleFinish}
      />

      <CampaignResultsModal
        isOpen={isOpen}
        onClose={onClose}
        onGoBack={() => navigate("/home/campaign")}
        accuracies={accuracies}
        accuracyState={accuracyState}
      />
    </>
  )
}
