import { useMutation } from '@tanstack/react-query'
import { usePlayer } from '../contexts/player-context'
import useFormSetters from '../hooks/use-form-setters'
import toast from '../utils/toast'
import validator from 'validator'
import { AuthClient, readClientError } from '../clients'
import { Mail, WifiOff, Ban, Check } from 'lucide-react'
import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Spinner
} from './'

export default ({ isOpen, onClose }) => {
  const { player } = usePlayer()

  const formValidator = ({ email, password }) => {
    if (!validator.isEmail(email)) {
      return "Ingresa un correo electrónico válido"
    }

    if (validator.isEmpty(password)) {
      return "Ingresa una contraseña"
    }

    return null
  }

  const [formState, createFormSetter, formError] = useFormSetters({
    email: "",
    password: ""
  }, formValidator)

  const handleOnMutate = () => {
    toast(
      <Spinner size={40} />,
      "Actualizando correo electrónico",
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
        "Contraseña incorrecta",
        "Revisa que esté bien escrita"
      )

      return
    }
  }

  const handleOnSuccess = () => {
    toast(
      <Check size={40} />,
      "Éxito",
      "Correo electrónico actualizado con éxito"
    )
    onClose()
  }

  const changeEmailMutation = useMutation({
    mutationFn: ({ email, password }) => AuthClient.changeEmail(player?.playerId, email, password),
    onMutate: handleOnMutate,
    onError: handleOnError,
    onSuccess: handleOnSuccess
  })

  const handleChange = () => {
    changeEmailMutation.mutate(formState)
  }

  return (
    <Modal
      title="Cambiar correo electrónico"
      sideImage={<Mail size={200} color="#f5d922" />}
      isOpen={isOpen}
      onClose={onClose}
    >
      <TextInput
        placeholder="Nuevo correo electrónico"
        text={formState.email}
        onChange={createFormSetter("email")}
      />

      <PasswordInput
        placeholder="Contraseña"
        password={formState.password}
        onChange={createFormSetter("password")}
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
