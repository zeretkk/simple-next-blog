import { FC, HTMLAttributes } from 'react'
import { Box } from '@mui/material'
import Header from './Header'
import Footer from './Footer'

const MainLayout: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return (
        <>
            <Header />
            <Box minHeight={'100vh'} py={2}>
                {children}
            </Box>
            <Footer />
        </>
    )
}

export default MainLayout
