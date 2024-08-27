import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePlayer } from '../contexts/player-context'
import useModalHandler from '../hooks/use-modal-handler.js'
import formatFullname from '../utils/format-fullname'
import { PlayersClient } from '../clients'
import {
  Variable,
  Divide,
  Equal,
  CircleHelp,
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

const getPlayerBadges = (player) => {
  if (player.badges === null || player.badges[0] === null) {
    return [{
      icon: "circle-help",
      title: "No hay medallas",
      description: "Completa los niveles del modo campaña para obtener medallas"
    }]
  }

  const badgesIds = [...new Set(player.badges.map(({ badge_id }) => badge_id))]
  const badges = badgesIds
    .map((badgeId) => {
      const [badge] = player.badges.filter(({ badge_id }) => badge_id === badgeId)

      return badge
    })

  return badges
}

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
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0)
  const badges = getPlayerBadges(player)
  const currentBadge = badges[currentBadgeIndex]
  
  const BadgeIcon = () => {
    const icon = currentBadge.icon

    if (icon === "variable") {
      return <Variable size={175} color="#4c1d95" />
    }

    if (icon === "divide") {
      return <Divide size={175} color="#4c1d95" />
    }

    if (icon === "equal") {
      return <Equal size={175} color="#4c1d95" />
    }

    if (icon === "circle-help") {
      return <CircleHelp size={175} color="#4c1d95" />
    }
  }

  const incrementBadgeIndex = () => {
    if (currentBadgeIndex < badges.length - 1) {
      setCurrentBadgeIndex(currentBadgeIndex + 1)
    }
  }

  const decrementBadgeIndex = () => {
    if (currentBadgeIndex > 0) {
      setCurrentBadgeIndex(currentBadgeIndex - 1)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full h-1/2">
      <div className="flex flex-row justify-center items-center gap-x-7 gap-y-3 w-full h-full">
        <div onClick={decrementBadgeIndex}>
          <CircleChevronLeft
            size={60}
            color="#f5d922"
            className={`
              hover:scale-105 transition-all cursor-pointer
              ${currentBadgeIndex <= 0 ? "invisible" : ""}
            `}
          />
        </div>

        <div
          className="relative w-fit h-fit"
        >
          <div
            key={currentBadgeIndex}
            className="w-fit h-fit rounded-full bg-_yellow border-4 border-_yellow bg-_black animate__animated animate__fadeIn"
          >
            <BadgeIcon />
          </div>
        </div>

        <div onClick={incrementBadgeIndex}>
          <CircleChevronRight
            size={60}
            color="#f5d922"
            className={`
              hover:scale-105 transition-all cursor-pointer
              ${currentBadgeIndex >= (badges.length - 1) ? "invisible" : ""}
            `}
          />
        </div>
      </div>

      <span
        className="font-primary text-2xl text-_yellow"
      >
        {currentBadge.title}
      </span>

      <span
        className="font-primary text-xl text-_white"
      >
        {currentBadge.description}
      </span>
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
  const { player } = usePlayer()
  const playerQuery = useQuery({
    queryKey: ["profile", player?.playerId],
    queryFn: () => PlayersClient.findById(player?.playerId),
    enabled: player !== null
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
