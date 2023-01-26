import axios from 'axios'

export const ServerClient = axios.create({
  baseURL: __SERVER_URL__,
  withCredentials: true,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
