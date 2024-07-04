import { useState } from 'react'
import { CircleX } from 'lucide-react'

export default ({ text, onChange, placeholder }) => {
  const [isFocusing, setIsFocusing] = useState(false)

  return (
    <div
      onFocus={() => setIsFocusing(true)}
      onBlur={() => setIsFocusing(false)}
      className={`
        flex items-center w-full h-fit py-1.5 px-3 rounded-lg bg-_purple
        hover:scale-105
        ${isFocusing ? "border-2 border-_yellow" : "border border-_black"}
        transition-all
      `}
    >
      <input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-full outline-none bg-_purple placeholder:text-_yellow text-_white transition-all"
      />

      {
        text.length !== 0 ?
          (
            <div
              className="h-full cursor-pointer"
              onClick={() => onChange("")}
            >
              <CircleX color="#f5d922" />
            </div>
          ) :
          null
      }
    </div>
  )
}
