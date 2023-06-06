import { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { FC, HTMLAttributes, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Profile } from '../types/user'

export interface IAuthContext {
    user: User | null
    session: Session | null
    profile: Profile | null
}
export const AuthContext = createContext<IAuthContext>({ user: null, session: null, profile: null })

export interface AuthProviderProps extends HTMLAttributes<any> {
    client: SupabaseClient
}
const AuthProvider: FC<AuthProviderProps> = ({ client, ...props }) => {
    const [session, setSesion] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        client.auth.onAuthStateChange(async (event, session) => {
            switch (event) {
                case 'INITIAL_SESSION':
                    if (!session) return
                case 'USER_UPDATED':
                case 'SIGNED_IN':
                    setSesion(session)
                    setUser(session?.user)
                    const { data, error } = await client
                        .from('profiles')
                        .select('*')
                        .eq('id', session?.user?.id)
                        .single<Profile>()
                    if (!error) {
                        setProfile(data)
                    } else {
                        console.log(error)
                    }
                    break
                case 'SIGNED_OUT':
                    setSesion(null)
                    setProfile(null)
                    setUser(null)
                    break
            }
        })
    }, [client])
    const contextValue: IAuthContext = useMemo(
        () => ({
            user,
            session,
            profile,
        }),
        [user, session, profile]
    )
    return <AuthContext.Provider value={contextValue} {...props} />
}
export default AuthProvider

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('Auth provider not configured')
    } else return context
}
