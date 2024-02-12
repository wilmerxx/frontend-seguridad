export class Firefox {

  originAttributes: string
  name: string
  value: string
  path: string
  host: string
  expiry: string
  lastAccessed: string
  isHttpOnly: number
  isSecure: number

  constructor() {
    this.originAttributes = ''
    this.name = ''
    this.value = ''
    this.path = ''
    this.host = ''
    this.expiry = ''
    this.lastAccessed = ''
    this.isHttpOnly = 0
    this.isSecure = 0
  }

}
