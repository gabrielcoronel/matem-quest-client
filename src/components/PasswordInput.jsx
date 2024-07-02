import 'animate.css'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default ({ password, onChange, placeholder }) => {
  const [isHiding, setIsHiding] = useState(true)
  const [isFocusing, setIsFocusing] = useState(false)

  return (
    <div
      onFocus={() => setIsFocusing(true)}
      onBlur={() => setIsFocusing(false)}
      className={`
        flex items-center w-full h-fit py-1.5 px-3 rounded-lg bg-_white
        hover:scale-105
        ${isFocusing ? "border-2 border-_blue" : "border border-_gray"}
        transition-all
      `}
    >
      <input
        type={isHiding ? "password" : "text"}
        value={password}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-full outline-none placeholder:text-_gray text-_black transition-all bg-_white"
      />

      {
        password.length !== 0 ?
          (
            <div
              key={isHiding}
              className="h-full cursor-pointer animate__animated animate__fadeIn"
              onClick={() => setIsHiding(!isHiding)}
            >
              {
                isHiding ?
                <EyeOff color="#052559" /> :
                <Eye color="#052559" />
              }
            </div>
          ) :
          null
      }
    </div>
  )
}
