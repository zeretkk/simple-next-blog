import '../styles/globals.css'
import MainLayout from '../components/MainLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../muiTheme'
import AuthProvider from '../supabase/authProvider'
import { supabaseClient } from '../supabase/supabaseClient'

function MyApp({ Component, pageProps }) {
    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>
            <ThemeProvider theme={theme}>
                <AuthProvider client={supabaseClient}>
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default MyApp
