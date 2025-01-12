import { useState } from 'react'

export const useOpenClose = () => {
  const [isOpen, setIsOpen]: any = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    open,
    close
  }
}
