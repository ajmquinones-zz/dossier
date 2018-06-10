import { observable, action, when, computed, reaction } from 'mobx'
import localforage from 'localforage'

import authService from '@/services/auth'

import documentStore from './document'

export class AppState {

  @observable accessToken = null
  @observable tokenType = null
  @observable expiresIn = null
  @observable isCritical = false
  @observable critical = ''
  @observable isError = false
  @observable error = ''
  @observable isSuccess = false
  @observable success = ''
  @observable isLoading = false

  tokenRenewalTimeout = null

  constructor() {
    when(
      () => this.isAuthenticated,
      () => documentStore.dirty(true)
    )

    this.monitorAuthHandler = this.monitorAuthentication()
  }

  monitorAuthentication() {
    return reaction(
      () => this.isAuthenticated,
      isAuthenticated => {
        if (!isAuthenticated) {
          this.loading()
          authService.checkSession()
            .then(({ accessToken, expiresIn, tokenType }) => 
              this.setSession(accessToken, expiresIn, tokenType ))
            .catch(e => {
              this.criticalError('Authentication error')
            })
            .then(() => this.loading(false))
        }
      },
      { fireImmediately: true }
    )
  }

  @action
  setSession(accessToken, expiresIn, tokenType) {
    this.accessToken = accessToken
    this.expiresIn = expiresIn
    this.tokenType = tokenType

    this.tokenRenewalTimeout && clearTimeout(this.tokenRenewalTimeout)
    if (expiresIn - Date.now() > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.clearSession()
      }, expiresIn - Date.now())
    }
    
    localforage.setItem('App/SESSION', {
      accessToken,
      expiresIn,
      tokenType
    })
  }

  setRenewalTimeout() {
    
  }

  @action
  clearSession() {
    this.accessToken = null
    this.expiresIn = null
    this.tokenType = null
    this.tokenRenewalTimeout && clearTimeout(this.tokenRenewalTimeout)

    localforage.removeItem('App/SESSION')
  }

  @computed
  get isAuthenticated() {
    return !!this.accessToken && Date.now() < this.expiresIn
  }

  @action
  criticalError(message) {
    this.critical = message
    this.isCritical = true
  }

  @action
  setError(message) {
    this.error = message
    this.isError = true
  }

  @action
  setSuccess(message) {
    this.success = message
    this.isSuccess = true
  }

  @action
  clearMessages() {
    this.isError = false
    this.isSuccess = false
  }

  @action
  loading(isLoading = true) {
    this.isLoading = isLoading
  }
}

export default new AppState()