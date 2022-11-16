import axios from 'axios'
import { BASE_URL } from '../utils/consts'

export const DefaultPraktikumClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export const PraktikumClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
