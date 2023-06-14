export interface IProfile {
    id: string
    updated_at: string
    username: string
    full_name: string
    avatar_url: string
    discord: string
    group: number
}
export interface IGroup {
    id: string
    name: string
    post_deleting: boolean
    comment_deleting: boolean
    dashboard_access: boolean
}
