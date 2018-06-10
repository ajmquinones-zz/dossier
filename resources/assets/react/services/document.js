import appState from '@/stores/app' 
const axios = window.axios

const config = () => {
  const accessToken = appState.accessToken
  const tokenType = appState.tokenType

  return {
    baseURL: process.env.MIX_API_BASE_URL,
    headers: {
      'Authorization': `${tokenType} ${accessToken}`
    }
  }
}

/**
 * 
 * @param {string} title 
 * @param {object} file 
 */
export const create = async (title, document) => {
  const data = new FormData()
  data.append('title', title)
  data.append('document', document)

  const response = await axios({
    method: 'post',
    url: '/api/v1/document',
    data,
    ...config()
  })

  return response.data.data
}

/**
 * 
 */
export const list = async () => {
  const response = await axios({
    method: 'get',
    url: '/api/v1/documents',
    ...config()
  })

  return response.data.data
}

/**
 * 
 */
export const destroy = async id => {
  const response = await axios({
    method: 'delete',
    url: `/api/v1/document/${id}`,
    ...config()
  })

  return response.data.data
}

export default {
  create,
  destroy,
  list
}