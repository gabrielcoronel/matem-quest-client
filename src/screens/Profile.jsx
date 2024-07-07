import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePlayer } from '../contexts/player-context'
import useHover from '../hooks/use-hover.js'
import useModalHandler from '../hooks/use-modal-handler.js'
import formatFullname from '../utils/format-fullname'
import { PlayersClient } from '../clients'
import {
  DoorOpen,
  Mail,
  KeyRound,
  CircleChevronLeft,
  CircleChevronRight,
  WifiOff
} from 'lucide-react'
import {
  Frame,
  LogOutModal,
  ChangeEmailModal,
  ChangePasswordModal,
  LoadingIndicator
} from '../components'

const Actions = ({ player }) => {
  const logOutModalHandler = useModalHandler()
  const changeEmailModalHandler = useModalHandler()
  const changePasswordModalHandler = useModalHandler()

  const actions = [
    {
      icon: <DoorOpen size={40} />,
      onClick: logOutModalHandler.onOpen
    },
    {
      icon: <Mail size={40} />,
      onClick: changeEmailModalHandler.onOpen
    },
    {
      icon: <KeyRound size={40} />,
      onClick: changePasswordModalHandler.onOpen
    }
  ]

  const actionsButtonsElements = actions
    .map(({ icon, onClick }, index) => {
      return (
        <span
          key={index}
          className="text-_yellow hover:scale-110 transition-all"
          onClick={onClick}
        >
          {icon}
        </span>
      )
    })

  return (
    <div className="flex justify-end items-center gap-x-5 w-full p-3">
      {actionsButtonsElements}

      <LogOutModal
        isOpen={logOutModalHandler.isOpen}
        onClose={logOutModalHandler.onClose}
      />

      <ChangeEmailModal
        isOpen={changeEmailModalHandler.isOpen}
        onClose={changeEmailModalHandler.onClose}
      />

      <ChangePasswordModal
        isOpen={changePasswordModalHandler.isOpen}
        onClose={changePasswordModalHandler.onClose}
      />
    </div>
  )
}

const Avatar = ({ player }) => {
  const [isHovering, hoveringEvents] = useHover()
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0)

  const incrementBadgeIndex = () => {
    const amountBadges = player.badges.length
    const nextBadgeIndex = currentBadgeIndex + 1 < amountBadges ? currentBadgeIndex + 1 : 0

    setCurrentBadgeIndex(nextBadgeIndex)
  }

  const decrementBadgeIndex = () => {
    const amountBadges = player.badges.length
    const nextBadgeIndex = currentBadgeIndex - 1 >= 0 ? currentBadgeIndex - 1 : amountBadges - 1

    setCurrentBadgeIndex(nextBadgeIndex)
  }

  const handleSelectBadge = () => {
    console.log(player.badges[currentBadgeIndex])
  }

  return (
    <div className="flex flex-row justify-center items-center gap-x-7 gap-y-3 w-full h-1/2">
      <div onClick={decrementBadgeIndex}>
        <CircleChevronLeft
          size={90}
          color="#f5d922"
          className="hover:scale-105 transition-all"
        />
      </div>

      <div
        className="relative w-fit h-fit"
      >
        <div
          key={currentBadgeIndex}
          className="w-fit h-fit rounded-full border-4 border-_yellow bg-_black animate__animated animate__fadeIn"
        >
          <img
            {...hoveringEvents}
            style={{ opacity: isHovering ? 0.6 : 1 }}
            src="https://www.rothco.com/upload/product/product/large/1904-A-amazon.jpg"
            className="w-60 h-60 rounded-full"
            onClick={handleSelectBadge}
          />
        </div>

        <div className="flex justify-center items-center w-16 h-16 rounded-full bg-_yellow p-5 absolute right-0 top-2/3">
          <span className="font-bold font-primary text-2xl text-_purple">
            {player.campaign_level}
          </span>
        </div>
      </div>

      <div onClick={incrementBadgeIndex}>
        <CircleChevronRight
          size={90}
          color="#f5d922"
          className="hover:scale-105 transition-all"
        />
      </div>
    </div>
  )
}

const Profile = ({ player }) => {
  const fullName = formatFullname(player)

  return (
    <div className="flex flex-col items-center gap-y-7 w-full h-full pt-14 pb-7">
      <span className="font-bold font-primary text-4xl text-_yellow">
        {fullName}
      </span>

      <Avatar player={player} />
    </div>
  )
}

export default () => {
  const { player: { playerId } } = usePlayer()
  const playerQuery = useQuery({
    queryKey: ["profile", playerId],
    queryFn: () => PlayersClient.findById(playerId)
  })

  if (playerQuery.isFetching) {
    return (
      <Frame>
        <div className="flex justify-center items-center w-full h-full">
          <LoadingIndicator size={40} />
        </div>
      </Frame>
    )
  }

  if (playerQuery.isError) {
    return (
      <Frame>
        <div className="flex flex-col justify-center items-center gap-y-7 w-full h-full animate__animated animate__fadeIn">
          <WifiOff
            color="#f5d922"
            size={120}
          />

          <span className="font-primary text-2xl text-_white text-center">
            Al parecer no hay conexión a Internet
          </span>
        </div>
      </Frame>
    )
  }

  return (
    <Frame>
      <Actions player={playerQuery.data} />

      <Profile player={playerQuery.data} />
    </Frame>
  )
}
