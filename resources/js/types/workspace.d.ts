import { User } from '.'

export type Workspace = {
  id: string
  name: string
  join_code: string
  members: Member[]
  channels: Channel[]
  conversations: Conversation[]
}

export type Member = {
  user_id: string
  role: string
  user: User
}

export type Channel = {
  id: string
  name: string
  created_at: string
  messages: Message[]
}

export type Conversation = {
  id: string
  workspace_id: string
  user_one_id: string
  user_two_id: string
  user: User
}

export type Message = {
  id: string
  body: string
  image?: string
  parent_id: string
  created_at: string
  updated_at: string
  user: User
  workspace: Workspace
  channel: Channel
  reactions: Reaction[]
  replies: Message[]
}

export type Reaction = {
  id: number
  user_id: string
  value: string
}
