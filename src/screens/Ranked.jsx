import { useNavigate } from 'react-router-dom'
import { Button } from '../components'

export default () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full animate__animated animate__fadeIn">
      <span className="font-primary text-lg text-_white">
        Compite por puntos y demuestra que eres el mejor
      </span>

      <div className="w-1/6">
        <Button
          text="Jugar"
          onClick={() => navigate("/gameplay/ranked")}
        />
      </div>
    </div>
  )
}
