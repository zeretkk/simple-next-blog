import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { FC, HTMLAttributes } from 'react'
import PostService, { IPost } from '../../services/PostService'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Meta from '../../components/Meta'

interface PostPageProps extends HTMLAttributes<any>, InferGetStaticPropsType<typeof getStaticProps> {}

const PostPage: FC<PostPageProps> = ({ post }) => {
    return (
        <Stack>
            <Meta title={post.title} description={`${post.body.slice(0, 1800)}...`} />
            <Box>
                <Typography variant="h3" align="center">
                    {post.title}
                </Typography>
            </Box>
            <Divider />
            <Container sx={{ my: 2 }}>
                <picture>
                    <img alt={post.title} src={post.poster} width={640} height={480} />
                </picture>
            </Container>
            <Divider />

            <Box>
                <Typography>{post.body}</Typography>
            </Box>
        </Stack>
    )
}

export const getStaticProps: GetStaticProps<{ post: IPost }> = async ({ params }) => {
    if (params) {
        const post = await PostService.getOne(params.id as string)
        return {
            props: {
                post,
            },
            revalidate: 60,
        }
    }
    return {
        notFound: true,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await PostService.getAll()
    const paths = data.map((post) => ({
        params: { id: post.id },
    }))
    return { paths, fallback: 'blocking' }
}
export default PostPage
