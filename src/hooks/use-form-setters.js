import { useState } from 'react'

export default (initialState) => {
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
