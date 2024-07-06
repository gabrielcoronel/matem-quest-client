import { useState } from 'react'

export default () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const modalHandler = {
    isOpen,
    onOpen,
    onClose
  }

  return modalHandler
}
