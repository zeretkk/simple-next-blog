export interface IPost {
    created_at: string
    title: string
    body: string
    tags: string
    id: number
    reactions: string
    poster_url: string
    author: string
    author_id?: string
}
export interface IComent {
    id: number
    created_at: string
    post_id: number
    author_id: string
    author_name: string
    body: string
}
