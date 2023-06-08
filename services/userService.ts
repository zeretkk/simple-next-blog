import { supabaseClient } from '../supabase/supabaseClient'

export default abstract class UserService {
    static async signUp(credentials: { email: string; password: string; firstName: string; secondName: string }) {
        const fullName = `${credentials.firstName} ${credentials.secondName}`
        return await supabaseClient.auth.signUp({ ...credentials, options: { data: { full_name: fullName } } })
    }
    static async signIn(credentials: { email: string; password: string }) {
        return await supabaseClient.auth.signInWithPassword({ ...credentials })
    }
    static async signOut() {
        return await supabaseClient.auth.signOut()
    }
}
