export class ChromeUser {

  origin_url: string
  username_value: string
  password_value: string
  signon_realm: string
  date_created: string
  date_last_used: string
  date_password_modified: string
  showPassword: boolean = false
  constructor() {
    this.origin_url = ''
    this.username_value = ''
    this.password_value = ''
    this.signon_realm = ''
    this.date_created = ''
    this.date_last_used = ''
    this.date_password_modified = ''
  }
}
