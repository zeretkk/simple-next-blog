import { FC } from 'react'
import PostList from '../../components/Posts/PostList'
import { Container } from '@mui/material'

const Posts: FC = () => {
    return (
        <Container>
            <PostList />
        </Container>
    )
}

export default Posts
