import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useHover from '../hooks/use-hover'
import { Medal, UserRound, House } from 'lucide-react'

const links = [
  {
    title: "Jugar",
    icon: <House size={30} />,
    path: "/home"
  },
  {
    title: "Clasificación",
    icon: <Medal size={30} />,
    path: "/ranking"
  },
  {
    title: "Mi perfil",
    icon: <UserRound size={30} />,
    path: "/profile"
  }
]

const LinkTile = ({ isSelected, onSelect, title, icon, path }) => {
  const [isHovering, hoveringEvents] = useHover()

  return (
    <div
      {...hoveringEvents}
      onClick={onSelect}
      className={`
        flex items-center py-2 px-2 rounded-lg
        font-primary text-lg cursor-pointer transition-all
        ${isHovering || isSelected ? "bg-_white" : "bg-_blue"}
      `}
    >
      <span
        className={`
          transition-all
          ${isHovering || isSelected ? "text-_blue" : "text-_white"}
        `}
      >
        {icon}
      </span>
    </div>
  )
}

const PlayerShield = ({ player }) => {
  return (
    <div className="flex justify-evenly items-center gap-x-5">
      <div
        className="relative w-fit h-fit"
      >
        <div
          className="w-fit h-fit rounded-full border-4 border-_yellow bg-_black animate__animated animate__fadeIn"
        >
          <img
            src="https://www.rothco.com/upload/product/product/large/1904-A-amazon.jpg"
            className="w-16 h-16 rounded-full"
          />
        </div>

        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-_yellow p-1 absolute right-0 top-2/3">
          <span className="font-bold font-primary text-sm text-_blue">
            {player.campaign_level}
          </span>
        </div>
      </div>

      <span className="font-primary text-lg text-_white">
        {player.name}
      </span>
    </div>
  )
}

export default () => {
  const navigate = useNavigate()
  const [currentLinkIndex, setCurrentLinkIndex] = useState(0)

  const player = {
    name: "Gabriel",
    first_surname: "Coronel",
    second_surname: "Cascante",
    campaign_level: 2,
    badges: [1, 2, 3]
  }

  useEffect(() => {
    navigate(links[currentLinkIndex].path)
  }, [currentLinkIndex])

  const linksElements = links
    .map(({ title, icon, path }, index) => {
      return (
        <LinkTile
          key={index}
          isSelected={index === currentLinkIndex}
          onSelect={() => setCurrentLinkIndex(index)}
          title={title}
          icon={icon}
          path={path}
        />
      )
    })

  return (
    <div className="flex flex-col w-fit h-full justify-center items-center px-7 gap-y-10 bg-_blue">
      {linksElements}
    </div>
  )
}
