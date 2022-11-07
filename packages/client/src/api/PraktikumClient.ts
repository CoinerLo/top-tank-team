import axios from 'axios'

const baseURL = 'https://ya-praktikum.tech/api/v2/'

export const DefaultPraktikumClient = axios.create({
  baseURL,
  withCredentials: true,
})

export const PraktikumClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
