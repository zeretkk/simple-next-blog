import '../styles/globals.css'
import MainLayout from '../components/MainLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function MyApp({ Component, pageProps }) {
    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </QueryClientProvider>
    )
}

export default MyApp
