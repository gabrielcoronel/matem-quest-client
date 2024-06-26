import { useState  } from 'react'
import useHover from '../hooks/use-hover.js'
import { DoorOpen, Mail, KeyRound, CircleChevronLeft, CircleChevronRight } from 'lucide-react'

const Frame = ({ children }) => {
  return (
    <div className="w-full h-screen bg-blue">
      {children}
    </div>
  )
}

const Actions = ({ player }) => {
  return (
    <div className="flex justify-end items-center gap-x-5 w-full p-3 bg-_blue">
      <div
        className="w-fit h-fit"
      >
        <DoorOpen
          size={40}
          color="#f5d922"
          className="hover:scale-110 transition-all"
        />
      </div>

      <div
        className="w-fit h-fit"
      >
        <Mail
          size={40}
          color="#f5d922"
          className="hover:scale-110 transition-all"
        />
      </div>

      <div
        className="w-fit h-fit"
      >
        <KeyRound
          size={40}
          color="#f5d922"
          className="hover:scale-110 transition-all"
        />
      </div>
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
          <span className="font-bold font-primary text-2xl text-_blue">
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
  const fullName = `${player.name} ${player.first_surname} ${player.second_surname}`

  return (
    <div className="flex flex-col items-center gap-y-7 w-full h-full bg-_blue pt-14 pb-7">
      <span className="font-bold font-primary text-4xl text-_white">
        {fullName}
      </span>

      <Avatar player={player} />
    </div>
  )
}

export default () => {
  const player = {
    name: "Gabriel",
    first_surname: "Coronel",
    second_surname: "Cascante",
    campaign_level: 2,
    badges: [1, 2, 3]
  }

  return (
    <Frame>
      <Actions player={player} />

      <Profile player={player} />
    </Frame>
  )
}
