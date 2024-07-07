import { createContext, useState, useEffect, useContext } from 'react'

const PlayerContext = createContext(null)

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    const stringifiedPlayer = JSON.stringify(player)

    localStorage.setItem("matem-quest-player", stringifiedPlayer)
  }, [player])

  const contextValue = {
    player,
    setPlayer
  }

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const playerContextValue = useContext(PlayerContext)

  return playerContextValue
}
