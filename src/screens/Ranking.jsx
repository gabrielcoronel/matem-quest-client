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
    <div className="flex items-center rounded-t-xl bg-_blue">
      <span
        {...decrementButtonHoveringEvents}
        className={`
          rounded-tl-xl p-1 transition-all
          ${isDecrementButtonHovering ? "bg-_white text-_blue" : "bg-_blue text-_white"}
        `}
        onClick={handleDecrementPeriod}
      >
        <ChevronLeft color={isDecrementButtonHovering ? "#052559" : "#f5f5f5"} />
      </span>

      <span className="px-3 py-1 w-40 font-primary text-_white text-center">
        {PeriodHandler.toString(period)}
      </span>

      <span
        {...incrementButtonHoveringEvents}
        className={`
          rounded-tr-xl p-1 transition-all
          ${isIncrementButtonHovering ? "bg-_white text-_blue" : "bg-_blue text-_white"}
        `}
        onClick={handleIncrementPeriod}
      >
        <ChevronRight color={isIncrementButtonHovering ? "#052559" : "#f5f5f5"} />
      </span>
    </div>
  )
}

const RankingRow = ({ position, score, name }) => {
  return (
    <div className="flex w-full rounded-t-lg gap-x-3 py-3 px-5">
      <span className="w-1/6 font-primary">
        {position}
      </span>

      <span className="w-2/3 font-primary">
        {name}
      </span>

      <span className="w-1/6 font-primary">
        {score}
      </span>
    </div>
  )
}

const RankingTable = ({ ranking }) => {
  const rankingRowsElements = ranking
    .map(({ score, ...nameFields }, index) => {
      return (
        <>
          <Divider />

          <RankingRow
            key={index}
            position={index + 1}
            score={score}
            name={formatFullname(nameFields)}
          />
        </>
      )
    })
  return (
    <div className="w-full h-full rounded-bl-lg rounded-br-lg rounded-tl-lg border border-_gray shadow-lg shadow-_gray">
      <div className="flex w-full rounded-t-lg gap-x-3 py-3 px-5">
        <span className="w-1/6 font-primary">
          <Medal color="#052559" />
        </span>

        <span className="w-2/3 font-primary">
          <UserRound color="#052559" />
        </span>

        <span className="w-1/6 font-primary">
          <Trophy color="#052559" />
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
      <div className="flex flex-col items-center w-full h-full p-7 bg-_white">
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
