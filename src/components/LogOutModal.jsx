import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../contexts/player-context'
import { DoorOpen } from 'lucide-react'
import { Modal, Button } from './'

export default ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { setPlayer } = usePlayer()

  const handleLogOut = () => {
    setPlayer(() => ({ token: null, playerId: null }))

    navigate("/sign-up")
  }

  return (
    <Modal
      title="Cerrar sesión"
      sideImage={<DoorOpen size={200} color="#f5d922" />}
      isOpen={isOpen}
      onClose={onClose}
    >
      <span className="font-primary text-2xl text-_white text-center">
        Por lo visto ya te vas, espero que no sea la última vez que andes por aquí
      </span>

      <Button
        text="Confirmar"
        onClick={handleLogOut}
      />
    </Modal>
  )
}
