import { observable, action, computed, reaction } from 'mobx'

import appState from '@/stores/app'
import api from '@/services/document'
import Document from './models/Document'

export class DocumentStore {

  @observable filters = new Map()
  @observable items = []
  @observable isDirty = false

  constructor() {
    this.monitorDirtyHandler = this.monitorDirty()
  }

  monitorDirty() {
    return reaction(
      () => this.isDirty,
      isDirty => {
        if (isDirty) {
          appState.loading(true)
          api.list()
            .then((data) => {
              data.forEach(({
                uid,
                documentType,
                title,
                fileSize,
                publicPath,
                createdAt,
                updatedAt
              }) => {
                this.items.push(new Document(uid, title, documentType, fileSize, publicPath))
              })
            })
            .catch((e) => {
              console.log(e)
              appState.criticalError('Error in fetching document list')
            })
            .then(() => appState.loading(false))
        }
      }
    )
  }

  @action
  setFilter(key, value) {
    this.filters.set(key, value)
  }

  @action
  dirty(isDirty = true) {
    this.isDirty = isDirty
  }

  @action
  add(title, document, callback) {
    appState.loading(true)
    api.create(title, document)
      .then(({ 
        uid,
        documentType,
        title,
        fileSize,
        publicPath,
        createdAt,
        updatedAt
       }) => {
        this.items.push(new Document(uid, title, documentType, fileSize, publicPath))
        appState.setSuccess(`Document ${title} successfully uploaded`)
        if (callback) callback()
      })
      .catch((e) => {
        console.log(e)
        appState.setError('Error in creating new document')
      }) 
      .then(() => appState.loading(false))
  }

  @action
  remove(uid) {

    appState.loading(true)
    api.destroy(uid)
      .then(({ 
        uid,
        documentType,
        title,
        fileSize,
        publicPath,
        createdAt,
        updatedAt
       }) => {
        appState.setSuccess(`Document ${title} successfully deleted`)
        const index = this.items.findIndex(item => item.uid === uid)
        if (index > -1) {
          this.items.remove(this.items[index])
        }
      })
      .catch((e) => {
        console.log(e)
        appState.setError('Error in deleting document')
      }) 
      .then(() => appState.loading(false))
  }

  @computed get documents() {
    return this.items.slice().filter(item => {
      const title = this.filters.get('title')
      const type = this.filters.get('type')

      if (title && item.title.toLowerCase().includes(title.toLowerCase())) {
        if (type && item.type.toLowerCase() !== type.toLowerCase()) {
          return false
        }
        return true
      }

      if (type && item.type.toLowerCase() === type.toLowerCase()) {
        if (title && !item.title.toLowerCase().includes(title.toLowerCase())) {
          return false
        }
        return true
      }

      return !title && !type
    })
  }

} 

export default new DocumentStore()
