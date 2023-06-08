import { FC, HTMLAttributes } from 'react'
import { Box } from '@mui/material'
import Header from './Header'

const MainLayout: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default MainLayout
