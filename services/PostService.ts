import axios from 'axios'

export interface IPost {
    createdAt: string
    title: string
    body: string
    tags: string
    id: string
    reactions: string
    poster: string
}

export default class PostService {
    static async getAll(): Promise<IPost[]> {
        const { data } = await axios.get<IPost[]>(`https://647dab38af984710854a1762.mockapi.io/post`)
        return data.reverse()
    }
    static async getOne(id: string): Promise<IPost> {
        const { data } = await axios.get<IPost>(`https://647dab38af984710854a1762.mockapi.io/post/${id}`)
        return data
    }
    static async addOne(data: Partial<IPost>) {
        return axios.post('https://647dab38af984710854a1762.mockapi.io/post', data)
    }
}
