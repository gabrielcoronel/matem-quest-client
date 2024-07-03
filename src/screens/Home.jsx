import { useState } from 'react'
import useHover from '../hooks/use-hover'
import Button from '../components/Button'
import LevelStepper from '../components/LevelStepper'

const Frame = ({ children }) => {
  return (
    <div className="w-full h-screen">
      {children}
    </div>
  )
}

const GameModeTab = ({ title, isSelected, onSelect, orientation }) => {
  const [isHovering, hoveringEvents] = useHover()

  return (

    <span
      {...hoveringEvents}
      className={`
        py-2 px-5 font-bold font-primary text-center text-lg
        cursor-pointer transition-all grow
        ${orientation === "left" ? "rounded-l-xl" : "rounded-r-xl"}
        ${isSelected || isHovering ? "text-_blue bg-_yellow" : "text-_white bg-_blue"}
      `}
      onClick={onSelect}
    >
      {title}
    </span>
  )
}

const GameModeTabber = ({ gameMode, onChange }) => {
  return (
    <div className="flex w-2/3 items-center">
      <GameModeTab
        title="Campaña"
        isSelected={gameMode === "campaign"}
        onSelect={() => onChange("campaign")}
        orientation="left"
      />

      <GameModeTab
        title="Clasificatoria"
        isSelected={gameMode === "ranked"}
        onSelect={() => onChange("ranked")}
        orientation="right"
      />
    </div>
  )
}

const CampaignMode = () => {
  return (
    <div className="w-full h-full animate__animated animate__fadeIn">
      <LevelStepper />
    </div>
  )
}

const RankedMode = () => {
  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full animate__animated animate__fadeIn">
      <span className="font-primary text-lg text-_black">
        Compite por puntos y demuestra que eres el mejor
      </span>

      <div className="w-1/6">
        <Button
          text="Jugar"
          onClick={() => console.log("jugando clasificatoria")}
        />
      </div>
    </div>
  )
}

export default () => {
  const [currentGameMode, setCurrentGameMode] = useState("campaign")

  return (
    <Frame>
      <div className="flex flex-col items-center w-full h-full p-7 gap-y-7 bg-_white">
        <div className="flex justify-center items-center w-full py-5">
          <GameModeTabber
            gameMode={currentGameMode}
            onChange={setCurrentGameMode}
          />
        </div>

        {
          currentGameMode === "campaign" ?
            <CampaignMode /> :
            <RankedMode />
        }
      </div>
    </Frame>
  )
}
