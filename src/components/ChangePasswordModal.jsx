import { useMutation } from '@tanstack/react-query'
import { usePlayer } from '../contexts/player-context'
import useFormSetters from '../hooks/use-form-setters'
import toast from '../utils/toast'
import validator from 'validator'
import { AuthClient, readClientError } from '../clients'
import { KeyRound, WifiOff, Ban, Check } from 'lucide-react'
import {
  Modal,
  PasswordInput,
  Button,
  Spinner
} from './'

export default ({ isOpen, onClose }) => {
  const { player } = usePlayer()

  const formValidator = ({ oldPassword, newPassword }) => {
    if (validator.isEmpty(oldPassword)) {
      return "Ingresa tu contraseña actual"
    }

    if (validator.isEmpty(newPassword)) {
      return "Ingresa una nueva contraseña"
    }

    return null
  }

  const [formState, createFormSetter, formError] = useFormSetters({
    oldPassword: "",
    newPassword: ""
  }, formValidator)

  const handleOnMutate = () => {
    toast(
      <Spinner size={40} />,
      "Actualizando contraseña",
      "Espera un momento"
    )
  }

  const handleOnError = (error) => {
    const [httpError, serverError] = readClientError(error)

    if (httpError) {
      toast(
        <WifiOff size={40} />,
        "Error de conexión",
        "Revisa tu conexión a Internet"
      )

      return
    }

    if (serverError) {
      toast(
        <Ban size={40} />,
        "Contraseña actual incorrecta",
        "Revisa que esté bien escrita"
      )

      return
    }
  }

  const handleOnSuccess = () => {
    toast(
      <Check size={40} />,
      "Éxito",
      "Contraseña actualizada con éxito"
    )
    onClose()
  }

  const changePasswordMutation = useMutation({
    mutationFn: ({ oldPassword, newPassword }) => AuthClient.changePassword(player?.playerId, oldPassword, newPassword),
    onMutate: handleOnMutate,
    onError: handleOnError,
    onSuccess: handleOnSuccess
  })

  const handleChange = () => {
    changePasswordMutation.mutate(formState)
  }

  return (
    <Modal
      title="Cambiar contraseña"
      sideImage={<KeyRound size={200} color="#f5d922" />}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PasswordInput
        placeholder="Actual contraseña"
        password={formState.oldPassword}
        onChange={createFormSetter("oldPassword")}
      />

      <PasswordInput
        placeholder="Nueva contraseña"
        password={formState.newPassword}
        onChange={createFormSetter("newPassword")}
      />

      <Button
        text="Cambiar"
        onClick={handleChange}
        disabled={formError !== null}
      />

      <span className="font-primary text-lg text-_yellow animate__animated animate__fadeIn">
        {formError}
      </span>
    </Modal>
  )
}
