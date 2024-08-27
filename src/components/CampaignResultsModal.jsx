import { CircleHelp, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Modal, Button } from './'

export default ({ accuracies, accuracyState, isOpen, onClose, onGoBack }) => {
  const possibleTitles = {
    correct: "¡Felicidades!",
    incorrect: "Inténtalo de nuevo",
    incomplete: "Parece que falta por hacer"
  }
  const possibleSideImages = {
    correct: <ThumbsUp size={200} color="#f5d922" />,
    incorrect: <ThumbsDown size={200} color="#f5d922" />,
    incomplete: <CircleHelp size={200} color="#f5d922" />
  }
  const amountCorrectAnswers = accuracies.filter((accuracy) => accuracy).length
  const amountTotalAnswers = accuracies.length

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={possibleTitles[accuracyState]}
      sideImage={possibleSideImages[accuracyState]}
    >
      <span className="font-primary font-bold text-9xl text-_yellow text-center">
        {amountCorrectAnswers}/{amountTotalAnswers}
      </span>

      <Button
        text="Volver"
        onClick={onGoBack}
      />
    </Modal>
  )
}
