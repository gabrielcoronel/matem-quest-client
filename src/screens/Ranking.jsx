import { useState } from 'react'
import { Trophy, Medal, UserRound, ChevronLeft, ChevronRight } from 'lucide-react'
import useHover from '../hooks/use-hover'
import formatFullname from '../utils/format-fullname'
import PeriodHandler from '../utils/period-handler'
import Divider from '../components/Divider'
import Frame from '../components/Frame'

const PeriodStepper = ({ period, onChange }) => {
  const [isDecrementButtonHovering, decrementButtonHoveringEvents] = useHover()
  const [isIncrementButtonHovering, incrementButtonHoveringEvents] = useHover()

  const handleIncrementPeriod = () => {
    const nextPeriod = PeriodHandler.getNext(period)

    onChange(nextPeriod)
  }

  const handleDecrementPeriod = () => {
    const previousPeriod = PeriodHandler.getPrevious(period)

    onChange(previousPeriod)
  }

  return (
    <div className="flex items-center rounded-t-xl border-t-2 border-l-2 border-r-2 border-t-_yellow border-l-_yellow border-r-_yellow">
      <span
        {...decrementButtonHoveringEvents}
        className={`
          rounded-tl-lg p-1 transition-all
          ${isDecrementButtonHovering ? "bg-_yellow" : "bg-_purple"}
        `}
        onClick={handleDecrementPeriod}
      >
        <ChevronLeft color={isDecrementButtonHovering ? "#4c1d95"  : "#f5d922"} />
      </span>

      <span className="px-3 py-1 w-44 font-bold font-primary text-_white text-center">
        {PeriodHandler.toString(period)}
      </span>

      <span
        {...incrementButtonHoveringEvents}
        className={`
          rounded-tr-lg p-1 transition-all
          ${isIncrementButtonHovering ? "bg-_yellow" : "bg-_purple"}
        `}
        onClick={handleIncrementPeriod}
      >
        <ChevronRight color={isIncrementButtonHovering ? "#4c1d95" : "#f5d922"} />
      </span>
    </div>
  )
}

const RankingRow = ({ position, score, name }) => {
  return (
    <div className="flex w-full rounded-t-lg gap-x-3 py-3 px-5">
      <span className="w-1/6 font-bold font-primary text-_yellow">
        {position}
      </span>

      <span className="w-2/3 font-bold font-primary text-_white">
        {name}
      </span>

      <span className="w-1/6 font-bold font-primary text-_white">
        {score}
      </span>
    </div>
  )
}

const RankingTable = ({ ranking }) => {
  const rankingRowsElements = ranking
    .map(({ score, ...nameFields }, index) => {
      return (
        <div
          key={index}
        >
          <Divider />

          <RankingRow
            position={index + 1}
            score={score}
            name={formatFullname(nameFields)}
          />
        </div>
      )
    })
  return (
    <div className="w-full h-full rounded-bl-lg rounded-br-lg rounded-tl-lg border-2 border-_yellow">
      <div className="flex w-full rounded-t-lg gap-x-3 py-3 px-5">
        <span className="w-1/6 font-primary">
          <Medal color="#f5d922" />
        </span>

        <span className="w-2/3 font-primary">
          <UserRound color="#f5d922" />
        </span>

        <span className="w-1/6 font-primary">
          <Trophy color="#f5d922" />
        </span>
      </div>

      {rankingRowsElements}
    </div>
  )
}

export default () => {
  const [currentPeriod, setCurrentPeriod] = useState(PeriodHandler.getCurrent())

  const ranking = [
    {
      name: "Gabriel",
      first_surname: "Coronel",
      second_surname: "Cascante",
      score: 17
    },
    {
      name: "Gabriel",
      first_surname: "Coronel",
      second_surname: "Cascante",
      score: 17
    },
    {
      name: "Gabriel",
      first_surname: "Coronel",
      second_surname: "Cascante",
      score: 17
    },
  ]

  return (
    <Frame>
      <div className="flex flex-col items-center w-full h-full p-7 bg-_purple">
        <div className="flex justify-end items-center w-full">
          <PeriodStepper
            period={currentPeriod}
            onChange={setCurrentPeriod}
          />
        </div>

        <RankingTable
          ranking={ranking}
        />
      </div>
    </Frame>
  )
}
