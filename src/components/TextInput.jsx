import { useState } from 'react'
import { CircleX } from 'lucide-react'

export default ({ text, onChange, placeholder }) => {
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
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-full outline-none placeholder:text-_gray text-_black transition-all bg-_white"
      />

      {
        text.length !== 0 ?
          (
            <div
              className="h-full cursor-pointer"
              onClick={() => onChange("")}
            >
              <CircleX color="#052559" />
            </div>
          ) :
          null
      }
    </div>
  )
}
