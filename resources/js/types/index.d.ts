import { Workspace } from './workspace'

export type User = {
  id: string
  name: string
  email: string
  email_verified_at?: string
  avatar?: string
  workspaces: Workspace[]
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User
  }
}
