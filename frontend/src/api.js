import axios from 'axios'

//const BASE_URL = 'http://localhost:5000/api'

const BASE_URL = 'http://16.176.17.132:5000/api'
export const createTask = async (formData) => {
  const res = await axios.post(`${BASE_URL}/create-task`, formData)
  return res.data.task_id
}

export const checkStatus = async (taskId) => {
  const res = await axios.get(`${BASE_URL}/check-status`, {
    params: { id: taskId },
  })
  return res.data
}

export const getCollageInfo = async (taskId) => {
  const res = await axios.get(`${BASE_URL}/get-collage`, {
    params: { id: taskId },
  })
  return res.data
}

