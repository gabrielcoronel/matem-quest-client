import axios from 'axios'
import { HTTPError, ServerError } from './client-errors'

const API_URL = "http://localhost:8080/" 

const axiosClient = axios.create({
  baseURL: API_URL
})

export default async (endpoint, data) => {
  try {
    const response = await axiosClient.post(endpoint, data)

    if (response.status < 200 || response.status > 299) {
      throw ServerError(response.data)
    }

    return response.data
  } catch (error) {
    throw new HTTPError(error)
  }
}
