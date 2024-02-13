export class ChromeCookies {
  creation_utc: string
  host_key: string
  top_frame_site_key: string
  name: string
  value: string
  encrypted_value: string
  path: string
  expires_utc: string
  is_secure: number
  is_httponly: number
  last_access_utc: string
  has_expires: number
  is_persistent: number
  priority: number
  samesite: number
  source_port: number
  last_update_utc: string

  constructor() {
    this.creation_utc = ''
    this.host_key = ''
    this.top_frame_site_key = ''
    this.name = ''
    this.value = ''
    this.encrypted_value = ''
    this.path = ''
    this.expires_utc = ''
    this.is_secure = 0
    this.is_httponly = 0
    this.last_access_utc = ''
    this.has_expires = 0
    this.is_persistent = 0
    this.priority = 0
    this.samesite = 0
    this.source_port = 0
    this.last_update_utc = ''
  }
}
