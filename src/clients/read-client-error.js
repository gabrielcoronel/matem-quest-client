import { HTTPError, ServerError } from './client-errors'

export default (clientError) => {
  const httpError = clientError instanceof HTTPError ? clientError : null
  const serverError = clientError instanceof ServerError ? clientError : null

  return [httpError, serverError]
}
