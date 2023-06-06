import { supabaseClient } from '../supabase/supabaseClient'

export default abstract class UserService {
    static async signUp(credentials: { email: string; password: string }) {
        return await supabaseClient.auth.signUp({ ...credentials })
    }
    static async signIn(credentials: { email: string; password: string }) {
        return await supabaseClient.auth.signInWithPassword({ ...credentials })
    }
    static async signOut() {
        return await supabaseClient.auth.signOut()
    }
}
