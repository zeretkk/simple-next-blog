import '../styles/globals.css'
import MainLayout from '../components/MainLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../muiTheme'

function MyApp({ Component, pageProps }) {
    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>
            <ThemeProvider theme={theme}>
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default MyApp
