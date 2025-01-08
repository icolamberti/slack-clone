import { User } from '.'

export type Workspace = {
  id: string
  name: string
  join_code: string
  members: Member[]
  channels: Channel[]
}

export type Member = {
  user_id: string
  role: string
  user: User
}

export type Channel = {
  id: string
  name: string
}
