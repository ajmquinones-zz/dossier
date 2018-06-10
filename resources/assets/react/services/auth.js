const axios = window.axios

import localforage from 'localforage'

/**
 * 
 */
export const authorize = async () => {  
  const response = await axios({
    baseURL: process.env.MIX_API_BASE_URL,
    method: 'post',
    url: '/oauth/token',
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.MIX_API_CLIENT_ID,
      client_secret: process.env.MIX_API_CLIENT_SECRET,
      scope: 'create-document delete-document read-document list-documents'
    }
  })

  return response.data  
}

export const checkSession = async () => {
  let {
    accessToken,
    expiresIn,
    tokenType
  } = await localforage.getItem('App/SESSION') || {}

  if (!accessToken || !expiresIn || !tokenType) {
    const { access_token, expires_in, token_type } = await authorize()
    accessToken = access_token
    expiresIn = (expires_in * 1000) + Date.now()
    tokenType = token_type
  }

  return { accessToken, expiresIn, tokenType }
}

export default {
  authorize,
  checkSession
}
