import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Modal, TextInput, PasswordInput, Button } from './'

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
