import { useRef, useEffect } from 'react'
import katex from 'katex'

export default ({ children }) => {
  const containerRef = useRef(null)
  const texString = `\\textcolor{white}{${children}}`

  useEffect(() => {
    katex.render(texString, containerRef.current, {
      throwOnError: false,
      displayMode: true
    });
  }, [children])

  return (
    <div
      ref={containerRef}
      className="w-fit h-fit text-xl"
    >
    </div>
  )
}
