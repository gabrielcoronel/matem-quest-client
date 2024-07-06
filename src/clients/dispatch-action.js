import axios from 'axios'
import { HTTPError, ServerError } from './client-errors'

const API_URL = "http://localhost:8080/" 

const axiosClient = axios.create({
  baseURL: API_URL
})

export default async (endpoint, data) => {
  const token = localStorage.getItem("matem-quest-token")

  try {
    const response = await axiosClient.post(
      endpoint,
      data,
      {
        headers: {
          token
        }
      }
    )

    return response.data
  } catch (error) {
    if (error.response) {
      throw new ServerError(error.response.data)
    } else {
      throw new HTTPError(error)
    }
  }
}
