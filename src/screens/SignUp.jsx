import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../contexts/player-context'
import useFormSetters from '../hooks/use-form-setters'
import toast from '../utils/toast'
import { readClientError, AuthClient } from '../clients'
import { UserRound, KeyRound, Check, WifiOff, Ban } from 'lucide-react'
import {
  Divider,
  TextInput,
  PasswordInput,
  Button,
  Spinner
} from '../components'

const PersonalInformationForm = ({ formState, createFormSetter, onSubmit }) => {
  return (
    <div className="flex flex-col items-center w-full gap-y-3 animate__animated animate__fadeIn">
      <UserRound
        size={80}
        color="#f5d922"
      />

      <TextInput
        placeholder="Nombre"
        text={formState.name}
        onChange={createFormSetter("name")}
      />

      <TextInput
        placeholder="Primer apellido"
        text={formState.first_surname}
        onChange={createFormSetter("first_surname")}
      />

      <TextInput
        placeholder="Segundo apellido"
        text={formState.second_surname}
        onChange={createFormSetter("second_surname")}
      />

      <Button
        text="Continuar"
        onClick={onSubmit}
      />
    </div>
  )
}

const CredentialsForm = ({ formState, createFormSetter, onSubmit }) => {
  return (
    <div className="flex flex-col items-center w-full gap-y-3 animate__animated animate__fadeIn">
      <KeyRound
        size={80}
        color="#f5d922"
      />

      <TextInput
        placeholder="Correo electrónico"
        text={formState.email}
        onChange={createFormSetter("email")}
      />

      <PasswordInput
        placeholder="Contraseña"
        password={formState.password}
        onChange={createFormSetter("password")}
      />

      <Button
        text="Crear cuenta"
        onClick={onSubmit}
      />
    </div>
  )
}

export default () => {
  const navigate = useNavigate()
  const playerContextValue = usePlayer()
  const [currentForm, setCurrentForm] = useState("personal")
  const [formState, createFormSetter] = useFormSetters({
    name: "",
    first_surname: "",
    second_surname: "",
    email: "",
    password: ""
  })

  const handleOnMutate = () => {
    toast(
      <Spinner size={40} />,
      "Creando cuenta",
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
        "Correo en uso",
        "Utiliza otro correo"
      )

      return
    }
  }

  const handleOnSuccess = ({ player_id, token }) => {
    toast(
      <Check size={40} />,
      "Éxito",
      "Disfruta tu aventura"
    )

    localStorage.setItem("matem-quest-token", token)

    playerContextValue.setPlayer(() => ({ ...playerContextValue.player, playerId: player_id }))

    navigate("/home")
  }

  const signUpMutation = useMutation({
    mutationFn: (player) => AuthClient.signUp(player),
    onMutate: handleOnMutate,
    onError: handleOnError,
    onSuccess: handleOnSuccess
  })

  return (
    <div className="w-full h-screen bg-_purple">
      <div className="flex flex-col justify-center items-center w-full h-full gap-y-5 animate__animated animate__fadeIn">
        <div className="flex flex-col items-center w-1/3 gap-y-3 p-7 rounded-lg shadow-lg shadow-_black">
          <span className="font-extrabold font-primary text-3xl text-_yellow">
            ¡Inicia tu aventura!
          </span>

          {
            currentForm === "personal" ?
              <PersonalInformationForm
                formState={formState}
                createFormSetter={createFormSetter}
                onSubmit={() => setCurrentForm("credentials")}
              /> :
              <CredentialsForm
                formState={formState}
                createFormSetter={createFormSetter}
                onSubmit={() => signUpMutation.mutate(formState)}
              />
          }

          <div className="flex flex-col justify-center items-center w-full gap-y-3">
            <Divider />

            <div className="flex justify-center items-center gap-x-1">
              <span
                className="font-primary text-_white"
              >
                ¿Ya tienes una cuenta?
              </span>

              <span
                className="font-bold hover:underline font-primary text-_yellow cursor-pointer"
                onClick={() => navigate("/log-in")}
              >
                Inicia sesión
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
