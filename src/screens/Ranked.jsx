import { useQuery } from '@tanstack/react-query'
import { usePlayer } from '../contexts/player-context'
import { useNavigate } from 'react-router-dom'
import { PlayersClient } from '../clients'
import { WifiOff } from 'lucide-react'
import { Button, LoadingIndicator } from '../components'

export default () => {
  const navigate = useNavigate()
  const { player } = usePlayer()
  const playerQuery = useQuery({
    queryKey: ["profile", player?.playerId],
    queryFn: () => PlayersClient.findById(player.playerId),
    enabled: player !== null
  })

  if (playerQuery.isFetching || (playerQuery.data === undefined)) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingIndicator size={40} />
      </div>
    )
  }

  if (playerQuery.isError) {
    return (
      <div className="flex flex-col justify-center items-center gap-y-7 w-full h-full animate__animated animate__fadeIn">
        <WifiOff
          color="#f5d922"
          size={120}
        />

        <span className="font-primary text-2xl text-_white text-center">
          Al parecer no hay conexión a Internet
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full animate__animated animate__fadeIn">
      <span className="font-primary font-bold text-4xl text-_yellow">
        {playerQuery.data.ranked_score ?? 0}
      </span>

      <div className="w-1/6">
        <Button
          text="Jugar"
          onClick={() => navigate("/gameplay/ranked")}
        />
      </div>
    </div>
  )
}
