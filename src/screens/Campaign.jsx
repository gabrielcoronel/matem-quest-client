import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import Button from '../components/Button'

const LevelCircle = ({ level }) => {
  return (
    <div
      className={`
        flex justify-center items-center w-40 h-40 rounded-full
        border-8 border-_purple bg-_yellow animate__animated animate__fadeIn
        shadow-xl shadow-_black
      `}
    >
      <span className="font-bold font-primary text-5xl text-_purple">
        {level}
      </span>
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
      description: "Descripción1",
    },
    {
      description: "Descripción2",
    },
    {
      description: "Descripción3",
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
            color="#f5d922"
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
            color="#f5d922"
          />
        </div>
      </div>

      <div
        className="w-full flex flex-col justify-center gap-y-7 animate__animated animate__fadeIn"
      >
        <span
          className="font-primary text-xl text-_white"
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
