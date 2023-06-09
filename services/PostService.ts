import { supabaseClient } from '../supabase/supabaseClient'

export interface IPost {
    created_at: string
    title: string
    body: string
    tags: string
    id: number
    reactions: string
    poster_url: string
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
}
