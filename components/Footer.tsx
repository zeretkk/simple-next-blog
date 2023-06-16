import { Box, Container, Typography } from '@mui/material'
import { FC } from 'react'

const Footer: FC = () => {
    return (
        <Box bgcolor={'#D7D7DC'}>
            <Container>
                <Typography variant='body2' color='inherit'>
                    &copy; {new Date().getFullYear()} Kirill Stepkin.
                </Typography>
            </Container>
        </Box>
    )
}
export default Footer
