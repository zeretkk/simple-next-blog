import { FC, HTMLAttributes } from 'react'
import { Container } from '@mui/material'
import Header from './Header'

const MainLayout: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return (
        <>
            <Header />
            <Container>{children}</Container>
        </>
    )
}

export default MainLayout
