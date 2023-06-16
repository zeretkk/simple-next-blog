import { supabaseClient } from '../supabase/supabaseClient'
import { IComent, IPost } from '../types/posts'

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
    static async getPaginated({ queryKey }): Promise<{ posts: IPost[]; count: number }> {
        const page = queryKey[1]
        const { data, error } = await supabaseClient.rpc('get_posts', {
            page,
            perpage: 10,
        })
        if (error) throw error
        const { data: count, error: pagesErr } = await supabaseClient.rpc('get_total_posts_count')
        if (pagesErr) throw pagesErr
        return { posts: data, count }
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
        const { error } = await supabaseClient.from('coments').insert([{ post_id, body }])
        if (error) throw error
    }
    static async deleteComent(comentId: number): Promise<void> {
        const { error } = await supabaseClient.from('coments').delete().eq('id', comentId)
        if (error) throw error
    }
    static async getReactions(postId: number, authorId?: string): Promise<{ liked: boolean; likes: number }> {
        const { data: likedByUser, error } = authorId
            ? await supabaseClient.from('reactions').select('*').eq('to', postId).eq('author', authorId)
            : await supabaseClient.from('reactions').select('*').eq('to', postId)
        if (error) throw error
        const { count: likes, error: likesError } = await supabaseClient
            .from('reactions')
            .select('id, author', { count: 'exact' })
            .eq('to', postId)
        if (likesError) throw likesError
        return { liked: likedByUser?.length > 0 ?? false, likes: likes }
    }
    static async addReaction(postId: number): Promise<void> {
        const { error } = await supabaseClient.from('reactions').insert([{ to: postId, type: true }])
        if (error) throw error
    }
    static async deleteReaction(postId: number, author_id: string): Promise<void> {
        const { error } = await supabaseClient.from('reactions').delete().eq('to', postId).eq('author', author_id)
        if (error) throw error
        return
    }
}
