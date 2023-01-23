import axios from 'axios'
import { SERVER_URL } from '../utils/consts'

export const ServerClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
