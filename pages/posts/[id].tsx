import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { FC, HTMLAttributes, useState } from 'react'
import PostService, { IPost } from '../../services/PostService'
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Collapse,
    Container,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Meta from '../../components/Meta'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useAuth } from '../../supabase/authProvider'
import moment from 'moment'
import ComentarySection from '../../components/Posts/CommentarySection'

interface IPostPageProps extends HTMLAttributes<any>, InferGetStaticPropsType<typeof getStaticProps> {}

const PostPage: FC<IPostPageProps> = ({ post }) => {
    const { user } = useAuth()
    const router = useRouter()
    const queryClient = useQueryClient()
    const { isLoading: deleteLoading, ...deleteMutation } = useMutation({
        mutationFn: (id: number) => {
            return PostService.deleteOne(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
            return router.push('/posts')
        },
    })

    const handleDelete = () => {
        deleteMutation.mutate(post.id)
    }

    return (
        <Container>
            <Stack>
                <Meta title={post.title} description={`${post.body.slice(0, 1800)}...`} />
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='h3' align='center'>
                        {post.title}
                    </Typography>
                    <Stack>
                        {user?.id === post.author_id && (
                            <IconButton color='error' onClick={handleDelete} disabled={!deleteLoading}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Stack>
                </Stack>
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
                <ComentarySection postId={post.id} />
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
