import { FC } from 'react'
import PostList from '../../components/Posts/PostList'
import { Container } from '@mui/material'

const Posts: FC = () => {
    return (
        <Container sx={{ pt: 2 }}>
            <PostList />
        </Container>
    )
}

export default Posts
