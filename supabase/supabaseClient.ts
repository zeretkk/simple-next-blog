import { createClient } from '@supabase/supabase-js'

export const supabaseClient = (() => {
    if (typeof window !== 'undefined') {
        return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
            auth: {
                storage: localStorage,
                persistSession: true,
            },
        })
    }
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: {
            persistSession: false,
        },
    })
})()
