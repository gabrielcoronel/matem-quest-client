import { useState, useEffect } from 'react'

export default (initialState, validator) => {
  const [formState, setFormState] = useState(initialState)
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (validator) {
      const newError = validator(formState)

      setFormError(newError)
    }
  }, [formState])

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

  return [formState, createFormSetter, formError]
}
