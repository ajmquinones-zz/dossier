import { observable, action, computed, reaction } from 'mobx'

import Document from './models/Document'

export class DocumentStore {

  @observable filters = new Map()
  @observable items = [
    new Document('Document 1', 'PDF', 2000, 'xxxx', 'http://google.com'),
    new Document('Document 1', 'PDF', 2000, 'xxxx', 'http://google.com'),
    new Document('Document 1', 'PDF', 2000, 'xxxx', 'http://google.com')
  ]

  @action
  setFilter(filter) {
    this.filters.replace(filter)
  }

  @action
  add(document) {
    items.push(document)
  }

  @action
  remove(id) {
    const index = items.findIndex(item => item.id === id)
    if (index > -1) {
      items.remove(items[index])
    }
  }

  @computed get documents() {
    return this.items.slice()
  }

} 

export default new DocumentStore()
