export class EdgeUser {
  origin_url: string
  action_url: string
  username_value: string
  password_value: string
  date_created: string
  date_last_used: string


  constructor() {
    this.origin_url = ''
    this.action_url = ''
    this.username_value = ''
    this.password_value = ''
    this.date_created = ''
    this.date_last_used = ''
  }
}
