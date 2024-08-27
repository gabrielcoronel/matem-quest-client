import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../contexts/player-context'
import useRandomChallenge from '../hooks/use-random-challenge'
import { v4 as generateUuid } from 'uuid'
import toast from '../utils/toast'
import { PlayersClient } from '../clients'
import { ChevronRight, X, WifiOff, Award } from 'lucide-react'
import { Challenge, Spinner } from '../components'

export default () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const scoreDifferentialReference = useRef(0)
  const { player } = usePlayer()
  const [randomChallenge, regenerate] = useRandomChallenge()
  const [isAccurate, setIsAccurate] = useState(false)

  const handleOnMutate = () => {
    toast(
      <Spinner size={40} />,
      "Actualizando puntuación",
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
      "¡Puntuación actualizada!",
      `Sigue así`
    )

    queryClient.invalidateQueries({ queryKey: ["", player.playerId] })
  }

  const updateScoreMutation = useMutation({
    mutationFn: ({ scoreDifferential }) => PlayersClient.updateScore(player?.playerId, scoreDifferential),
    onMutate: handleOnMutate,
    onError: handleOnError,
    onSuccess: handleOnSuccess
  })

  const handleNextChallenge = () => {
    const differential = isAccurate ? 10 : -10

    scoreDifferentialReference.current += differential

    regenerate()
  }

  const handleClose = () => {
    updateScoreMutation.mutate({
      scoreDifferential: scoreDifferentialReference.current
    })

    navigate("/home/ranked")
  }

  return (
    <Challenge
      key={generateUuid()}
      statement={randomChallenge.statement}
      texContent={randomChallenge.texContent}
      options={randomChallenge.options}
      onSelect={setIsAccurate}
      leftAction={{
        icon: <X size={40} />,
        onAction: handleClose
      }}
      rightAction={{
        icon: <ChevronRight size={40} />,
        onAction: handleNextChallenge
      }}
    />
  )
}
