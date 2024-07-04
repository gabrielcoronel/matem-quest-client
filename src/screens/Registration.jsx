import { useState } from 'react'
import { UserRound, KeyRound, DoorOpen } from 'lucide-react'
import Divider from '../components/Divider'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'

const useFormSetters = (initialState) => {
  const [formState, setFormState] = useState(initialState)

  const createFormSetter = (fieldName) => {
    const setter = (fieldValue) => {
      const newFormState = {
        ...formState,
        [fieldName]: fieldValue
      }

      setFormState(() => newFormState)
    }

    return setter
  }

  return [formState, createFormSetter]
}

const LogIn = ({ onChangeScreen }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
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
          text={email}
          onChange={setEmail}
        />

        <PasswordInput
          placeholder="Contraseña"
          password={password}
          onChange={setPassword}
        />

        <Button
          text="Iniciar sesión"
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
              onClick={onChangeScreen}
            >
              Crea una cuenta
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

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
        text={formState.firstSurname}
        onChange={createFormSetter("firstSurname")}
      />

      <TextInput
        placeholder="Segundo apellido"
        text={formState.secondSurname}
        onChange={createFormSetter("secondSurname")}
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

const SignUp = ({ onChangeScreen }) => {
  const [currentForm, setCurrentForm] = useState("personal")
  const [formState, createFormSetter] = useFormSetters({
    name: "",
    firstSurname: "",
    secondSurname: "",
    email: "",
    password: ""
  })

  return (
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
              onClick={onChangeScreen}
            >
              Inicia sesión
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default () => {
  const [currentScreen, setCurrentScreen] = useState("log-in")

  return (
    <div className="w-full h-screen bg-_purple">
      {
        currentScreen === "log-in" ?
          <LogIn onChangeScreen={() => setCurrentScreen("sign-up")} /> :
          <SignUp onChangeScreen={() => setCurrentScreen("log-in")} />
      }
    </div>
  )
}
