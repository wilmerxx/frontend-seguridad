export class Edge {

  creation_utc: string
  encrypted_value: string
  expires_utc: string
  has_expires: number
  host_key: string
  is_httponly: number
  is_persistent: number
  is_secure: number
  last_access_utc: string
  name: string
  path: string
  priority: number
  samesite: number
  source_port: number
  top_frame_site_key: string
  value: string


  constructor() {
    this.creation_utc = ''
    this.encrypted_value = ''
    this.expires_utc = ''
    this.has_expires = 0
    this.host_key = ''
    this.is_httponly = 0
    this.is_persistent = 0
    this.is_secure = 0
    this.last_access_utc = ''
    this.name = ''
    this.path = ''
    this.priority = 0
    this.samesite = 0
    this.source_port = 0
    this.top_frame_site_key = ''
    this.value = ''
  }

}
