import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useRandomChallenge from '../hooks/use-random-challenge'
import { v4 as generateUuid } from 'uuid'
import { Challenge } from '../components'
import { ChevronRight, X } from 'lucide-react'

export default () => {
  const navigate = useNavigate()
  const scoreDifferentialReference = useRef(0)
  const [randomChallenge, regenerate] = useRandomChallenge()
  const [isAccurate, setIsAccurate] = useState(false)

  const handleNextChallenge = () => {
    const differential = isAccurate ? 10 : -10

    scoreDifferentialReference.current += differential

    regenerate()
  }

  const handleClose = () => {
    navigate("/home/ranked")
  }

  return (
    <Challenge
      key={generateUuid()}
      statement={randomChallenge.statement}
      texContent={randomChallenge.texContent}
      options={randomChallenge.options}
      onSelect={setIsAccurate}
      leftAction={{
        icon: <X size={40} />,
        onAction: handleClose
      }}
      rightAction={{
        icon: <ChevronRight size={40} />,
        onAction: handleNextChallenge
      }}
    />
  )
}
