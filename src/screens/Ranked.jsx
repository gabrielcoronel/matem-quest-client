import { Button } from '../components'

export default () => {
  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full animate__animated animate__fadeIn">
      <span className="font-primary text-lg text-_white">
        Compite por puntos y demuestra que eres el mejor
      </span>

      <div className="w-1/6">
        <Button
          text="Jugar"
          onClick={() => console.log("jugando clasificatoria")}
        />
      </div>
    </div>
  )
}
