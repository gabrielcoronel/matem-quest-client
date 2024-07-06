import { useState } from 'react'
import Modal from './Modal'
import PasswordInput from './PasswordInput'
import Button from './Button'
import { KeyRound } from 'lucide-react'

export default ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  return (
    <Modal
      title="Cambiar contraseña"
      sideImage={<KeyRound size={200} color="#f5d922" />}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PasswordInput
        placeholder="Actual contraseña"
        password={oldPassword}
        onChange={setOldPassword}
      />

      <PasswordInput
        placeholder="Nueva contraseña"
        password={newPassword}
        onChange={setNewPassword}
      />

      <Button
        text="Cambiar"
        onClick={() => console.log("cambiando")}
      />
    </Modal>
  )
}
