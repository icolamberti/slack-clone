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
  messages: Message[]
}

export type Message = {
  id: number
  body: string
  image?: string
  created_at: string
  updated_at: string
  user: User
  workspace: Workspace
  channel: Channel
  reactions: Reaction[]
}

export type Reaction = {}
