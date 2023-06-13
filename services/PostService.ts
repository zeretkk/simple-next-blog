import { supabaseClient } from '../supabase/supabaseClient'

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

export default class PostService {
    static async getAll(): Promise<IPost[]> {
        const { data, error } = await supabaseClient.rpc('get_all_posts')
        if (error) throw error
        return data
    }
    static async getOne(id: string): Promise<IPost> {
        const { data, error } = await supabaseClient.rpc('get_post_by_id', {
            postid: id,
        })
        if (error) throw error
        return data
    }
    static async addOne(values: Partial<IPost>) {
        const { data, error } = await supabaseClient.from('posts').insert([values])
        if (error) throw error
        return data
    }
    static async getPaginated({ queryKey }): Promise<IPost[]> {
        const page = queryKey[1]
        const { data, error } = await supabaseClient.rpc('get_posts', {
            page,
            perpage: 10,
        })
        if (error) throw error
        return data
    }
    static async deleteOne(postId: number): Promise<void> {
        const { data, error } = await supabaseClient.from('posts').delete().eq('id', postId)
        if (error) throw error
        return data
    }
    static async getComents({ queryKey }): Promise<IComent[]> {
        const postId = queryKey[1]
        const { data, error } = await supabaseClient.rpc('get_coments_by_post', { postid: postId })
        if (error) throw error
        return data as IComent[]
    }
    static async addComent({ post_id, body }: Partial<IComent>): Promise<void> {
        const { data, error } = await supabaseClient.from('coments').insert([
            {
                post_id,
                body,
            },
        ])
        if (error) throw error
        return data
    }
}
