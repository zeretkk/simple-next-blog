import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { FC, HTMLAttributes } from 'react'
import PostService from '../../services/PostService'
import { Badge, Box, Container, Divider, IconButton, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Meta from '../../components/Meta'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useAuth } from '../../supabase/authProvider'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ComentarySection from '../../components/Posts/CommentarySection'
import { IPost } from '../../types/posts'
import moment from 'moment'

interface IPostPageProps extends HTMLAttributes<any>, InferGetStaticPropsType<typeof getStaticProps> {}

const PostPage: FC<IPostPageProps> = ({ post }) => {
    const { user, group } = useAuth()
    const router = useRouter()
    const queryClient = useQueryClient()
    const { data: reactions, error } = useQuery(['postReactons', { liked: false, likes: post.reactions }], {
        queryFn: () => {
            if (user) return PostService.getReactions(post.id, user.id)
            return PostService.getReactions(post.id)
        },
        initialData: { liked: false, likes: parseInt(post.reactions) },
    })
    const { isLoading: deleteLoading, ...deleteMutation } = useMutation({
        mutationFn: (id: number) => {
            return PostService.deleteOne(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
            return router.push('/posts')
        },
    })
    const { isLoading: likeLoading, ...likeMutation } = useMutation({
        mutationKey: ['postReactons', post.id],
        mutationFn: (id: number) => {
            if (reactions.liked) return PostService.deleteReaction(id, user.id)
            return PostService.addReaction(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['postReactons'])
        },
    })

    const handleDelete = () => {
        deleteMutation.mutate(post.id)
    }
    const handleLike = () => {
        likeMutation.mutate(post.id)
    }

    return (
        <Container>
            <Stack mt={2}>
                <Meta title={post.title} description={`${post.body.slice(0, 1800)}...`} />
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant='h3' align='center'>
                        {post.title}
                    </Typography>
                    {user && (
                        <Stack direction={'row'}>
                            {(user?.id === post.author_id || group?.post_deleting) && (
                                <IconButton color='error' onClick={handleDelete} disabled={deleteLoading}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                            {user?.id !== post.author_id && (
                                <IconButton
                                    disabled={likeLoading || user?.id === post.author_id}
                                    color={reactions.liked ? 'primary' : 'secondary'}
                                    onClick={handleLike}
                                >
                                    <Badge badgeContent={`${reactions?.likes}`} color='primary'>
                                        <FavoriteIcon />
                                    </Badge>
                                </IconButton>
                            )}
                        </Stack>
                    )}
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
                    <Typography variant='caption'>
                        Опубликованно пользователем {post.author} {moment(post.created_at).format('DD.MM.YYYY HH:mm')}
                    </Typography>
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
        try {
            const post = await PostService.getOne(params.id as string)
            if (!post.id) return { notFound: true }
            return {
                props: { post },
                revalidate: 60,
            }
        } catch {
            return { notFound: true }
        }
    }
    return { notFound: true }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await PostService.getAll()
    const paths = data.map((post) => ({
        params: { id: post.id.toString() },
    }))
    return { paths, fallback: 'blocking' }
}
export default PostPage
