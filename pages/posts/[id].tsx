import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { FC, HTMLAttributes } from 'react'
import PostService, { IPost } from '../../services/PostService'
import { Box, Button, CircularProgress, Container, Divider, IconButton, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Meta from '../../components/Meta'
import { useQuery } from '@tanstack/react-query'

interface IPostPageProps extends HTMLAttributes<any>, InferGetStaticPropsType<typeof getStaticProps> {}

const PostPage: FC<IPostPageProps> = ({ post }) => {
    const {
        data: coments,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['coments', post.id],
        queryFn: PostService.getComents,
    })
    return (
        <Container>
            <Stack>
                <Meta title={post.title} description={`${post.body.slice(0, 1800)}...`} />
                <Box>
                    <Typography variant='h3' align='center'>
                        {post.title}
                    </Typography>
                </Box>
                <Divider />
                <Container sx={{ my: 2 }}>
                    <picture style={{ display: 'block' }}>
                        <img
                            alt={post.title}
                            src={post.poster_url}
                            style={{ display: 'block', width: '100%', height: 'auto' }}
                        />
                    </picture>
                </Container>
                <Box>
                    <Divider />
                    <Typography>{post.body}</Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                    <Typography variant='h5'>
                        Коментарии{' '}
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Typography>
                    <Divider />
                    <Stack>
                        {isLoading && <CircularProgress />}
                        {isError && <Typography color={'error'}>Ошибка при получении коментариев</Typography>}
                        {coments &&
                            coments.map((coment, i) => {
                                return <Typography key={i}>{coment.body}</Typography>
                            })}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export const getStaticProps: GetStaticProps<{ post: IPost }> = async ({ params }) => {
    if (params) {
        const post = await PostService.getOne(params.id as string)
        if (!post.id) return { notFound: true }
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
        params: { id: post.id.toString() },
    }))
    return { paths, fallback: 'blocking' }
}
export default PostPage
