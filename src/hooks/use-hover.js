import { useState } from 'react'

export default () => {
  const [isHovering, setIsHovering] = useState(false)

  const hoveringEvents = {
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false)
  }

  return [isHovering, hoveringEvents]
}
