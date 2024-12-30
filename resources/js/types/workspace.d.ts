export type Workspace = {
  id: string
  name: string
  join_code: string
  members: Member[]
}

export type Member = {
  user_id: string
  role: string
}
