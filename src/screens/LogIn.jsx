import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../contexts/player-context'
import useFormSetters from '../hooks/use-form-setters'
import toast from '../utils/toast'
import { readClientError, AuthClient } from '../clients'
import { DoorOpen, Check, WifiOff, Ban } from 'lucide-react'
import {
  Divider,
  TextInput,
  PasswordInput,
  Button,
  Spinner
} from '../components'

export default () => {
  const navigate = useNavigate()
  const { setPlayer } = usePlayer()
  const [formState, createFormSetter] = useFormSetters({
    email: "",
    password: ""
  })

  const handleOnMutate = () => {
    toast(
      <Spinner size={40} />,
      "Iniciando sesión",
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
        "Credenciales incorrectas",
        "Revisa que estén bien escritas"
      )

      return
    }
  }

  const handleOnSuccess = ({ player_id, token }) => {
    toast(
      <Check size={40} />,
      "Éxito",
      "Bienvenido de vuelta"
    )

    setPlayer(() => ({
      token: token,
      playerId: player_id
    }))

    navigate("/home")
  }

  const logInMutation = useMutation({
    mutationFn: ({ email, password }) => AuthClient.logIn(email, password),
    onMutate: handleOnMutate,
    onError: handleOnError,
    onSuccess: handleOnSuccess
  })

  return (
    <div className="w-full h-screen bg-_purple">
      <div className="flex flex-col justify-center items-center w-full h-full gap-y-5 animate__animated animate__fadeIn">
        <div className="flex flex-col items-center w-1/3 gap-y-3 p-7 rounded-lg shadow-lg shadow-_black">
          <span className="font-extrabold font-primary text-3xl text-_yellow">
            ¡Estás de vuelta!
          </span>

          <DoorOpen
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
            text="Iniciar sesión"
            onClick={() => logInMutation.mutate(formState)}
          />

          <div className="flex flex-col justify-center items-center w-full gap-y-3">
            <Divider />

            <div className="flex justify-center items-center gap-x-1">
              <span
                className="font-primary text-_white"
              >
                ¿No te has registrado?
              </span>

              <span
                className="font-bold hover:underline font-primary text-_yellow cursor-pointer"
                onClick={() => navigate("/sign-up")}
              >
                Crea una cuenta
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
