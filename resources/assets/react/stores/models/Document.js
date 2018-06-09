import { observable } from 'mobx'

let counter = 0

export default class Document {

  @observable title = ''
  @observable type = ''
  @observable size = ''
  @observable hash = ''
  @observable url = ''

  constructor(title, type, size, hash, url) {
    this.id = counter++
    this.title = title
    this.type = type
    this.size = size
    this.hash = hash
    this.url = url
  }
}
