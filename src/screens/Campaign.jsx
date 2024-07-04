import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import Button from '../components/Button'

const LevelCircle = ({ level }) => {
  return (
    <div
      className={`
        flex justify-center items-center w-40 h-40 rounded-full
        border-8 border-_blue bg-_yellow animate__animated animate__fadeIn
      `}
    >
      <span className="font-bold font-primary text-5xl text-_blue">
        {level}
      </span>
    </div>
  )
}

const LevelTile = ({ level, description }) => {
  return (
    <div className="flex items-center gap-x-10 animate__animated animate__fadeIn">
      <LevelCircle level={level} />

      <div className="flex flex-col gap-y-3">
        <span className="font-primary text-xl text-_black">
          {description}
        </span>

        <Button
          text="Jugar"
          onClick={() => console.log("jugando")}
        />
      </div>
    </div>
  )
}

const LevelStepper = () => {
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0)

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
    const nextSelectedLevel = selectedLevelIndex + 1 < levels.length ? selectedLevelIndex + 1 : levels.length - 1

    setSelectedLevelIndex(nextSelectedLevel)
  }

  const decrementSelectedLevel = () => {
    const nextSelectedLevel = selectedLevelIndex - 1 >= 0 ? selectedLevelIndex - 1 : 0

    setSelectedLevelIndex(nextSelectedLevel)
  }

  return (
    <div className="w-1/2 flex gap-x-7 animate__animated animate__fadeIn">
      <div className="w-fit flex flex-col items-center">
        <div
          className="hover:scale-110 transition-all"
          onClick={decrementSelectedLevel}
        >
          <ChevronUp
            size={90}
            color="#052559"
          />
        </div>

        <LevelCircle
          key={selectedLevelIndex}
          level={selectedLevelIndex + 1}
        />

        <div
          className="hover:scale-110 transition-all"
          onClick={incrementSelectedLevel}
        >
          <ChevronDown
            size={90}
            color="#052559"
          />
        </div>
      </div>

      <div
        key={selectedLevelIndex}
        className="w-full flex flex-col justify-center gap-y-3 animate__animated animate__fadeIn"
      >
        <span
        key={selectedLevelIndex}
          className="font-primary text-xl text-_black"
        >
          {levels[selectedLevelIndex].description}
        </span>

        <Button
          text="Jugar"
          onClick={() => console.log("jugando")}
        />
      </div>
    </div>
  )
}

export default () => {
  return (
    <div className="flex justify-center items-center w-full h-full animate__animated animate__fadeIn">
      <LevelStepper />
    </div>
  )
}
