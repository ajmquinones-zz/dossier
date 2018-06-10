import { observable } from 'mobx'

let counter = 0

export default class Document {

  @observable uid = ''
  @observable title = ''
  @observable type = ''
  @observable size = ''
  @observable url = ''

  constructor(uid, title, type, size, url) {
    this.id = counter++
    this.uid = uid
    this.title = title
    this.type = type
    this.size = size
    this.url = url
  }
}
