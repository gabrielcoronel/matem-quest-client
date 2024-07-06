import { useState } from 'react'
import Modal from './Modal'
import TextInput from './TextInput'
import PasswordInput from './PasswordInput'
import Button from './Button'
import { Mail } from 'lucide-react'

export default ({ isOpen, onClose }) => {
  const [newEmail, setNewEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Modal
      title="Cambiar correo electrónico"
      sideImage={<Mail size={200} color="#f5d922" />}
      isOpen={isOpen}
      onClose={onClose}
    >
      <TextInput
        placeholder="Nuevo correo electrónico"
        text={newEmail}
        onChange={setNewEmail}
      />

      <PasswordInput
        placeholder="Contraseña"
        password={password}
        onChange={setPassword}
      />

      <Button
        text="Cambiar"
        onClick={() => console.log("cambiando")}
      />
    </Modal>
  )
}
