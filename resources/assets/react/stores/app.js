import { observable, action } from 'mobx'

export class AppState {

  @observable isError = false
  @observable error = ''
  @observable isSuccess = false
  @observable success = ''

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
}

export default new AppState()