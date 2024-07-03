import { useState } from 'react'
import { Play, ChevronUp, ChevronDown } from 'lucide-react'

const LevelCircle = ({ level, isSelected }) => {
  return (
    <div
      className={`
        flex justify-center items-center rounded-full
        ${isSelected ? "w-40 h-40" : "w-32 h-32"}
        ${!isSelected ? "opacity-60" : ""}
        border-8 border-_blue bg-_yellow`
      }
    >
      {
        isSelected ?
          (
            <div className="hover:scale-110 transition-all">
              <Play
                size={80}
                color="#052559"
              />
            </div>
          ) :
          (
            <span className="font-bold font-primary text-4xl text-_blue">
              {level}
            </span>
          )
      }
    </div>
  )
}

const LevelTile = ({ level, description, isSelected }) => {
  return (
    <div
      className={`
        flex items-center animate__animated animate__fadeIn
        ${isSelected ? "gap-x-10" : "gap-x-7"}
      `}
    >
      <LevelCircle
        level={level}
        isSelected={isSelected}
      />

      <span
        className={`
          font-primary
          ${isSelected ? "text-xl text-_black" : "text-_gray text-lg"}
        `}
      >
        {description}
      </span>
    </div>
  )
}

export default () => {
  const [selectedLevel, setSelectedLevel] = useState(0)

  const levels = [
    {
      description: "Descripción",
    },
    {
      description: "Descripción",
    },
    {
      description: "Descripción",
    },
    {
      description: "Descripción",
    },
  ]

  const incrementSelectedLevel = () => {
    const nextSelectedLevel = selectedLevel + 1 < levels.length ? selectedLevel + 1 : levels.length - 1

    setSelectedLevel(nextSelectedLevel)
  }

  const decrementSelectedLevel = () => {
    const nextSelectedLevel = selectedLevel - 1 >= 0 ? selectedLevel - 1 : 0

    setSelectedLevel(nextSelectedLevel)
  }

  const levelTilesElements = levels
    .map(({ description }, index) => {
      const level = index + 1
      const isSelected = selectedLevel === index

      return (
        <LevelTile
          key={`${level}${isSelected}`}
          level={level}
          description={description}
          isSelected={isSelected}
        />
      )
    })

  return (
    <div className="flex flex-col items-center gap-y-7">
      <div
        className="hover:scale-110 transition-all"
        onClick={decrementSelectedLevel}
      >
        <ChevronUp
          size={80}
          color="#052559"
        />
      </div>

      {levelTilesElements}

      <div
        className="hover:scale-110 transition-all"
        onClick={incrementSelectedLevel}
      >
        <ChevronDown
          size={80}
          color="#052559"
        />
      </div>
    </div>
  )
}
