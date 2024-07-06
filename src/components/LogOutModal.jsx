import Modal from './Modal'
import Button from './Button'
import { DoorOpen } from 'lucide-react'

export default ({ isOpen, onClose }) => {
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
        onClick={null}
      />
    </Modal>
  )
}
