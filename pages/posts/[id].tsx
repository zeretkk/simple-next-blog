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
import AddIcon from '@mui/icons-material/Add'
import Meta from '../../components/Meta'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useAuth } from '../../supabase/authProvider'
import moment from 'moment'

interface IPostPageProps extends HTMLAttributes<any>, InferGetStaticPropsType<typeof getStaticProps> {}

const PostPage: FC<IPostPageProps> = ({ post }) => {
    const {
        data: coments,
        isLoading: comentsLoading,
        isError: comentsError,
    } = useQuery({
        queryKey: ['coments', post.id],
        queryFn: PostService.getComents,
    })
    const [formOpen, setFormOpen] = useState(false)
    const [newComent, setNewComent] = useState('')

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
    const { isLoading: addComentLoading, ...comentMutation } = useMutation({
        mutationFn: (data: { post_id: number; body: string }) => {
            return PostService.addComent({ ...data })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['coments'])
            setNewComent('')
        },
    })

    const handleDelete = () => {
        deleteMutation.mutate(post.id)
    }
    const handleAddComent = () => {
        comentMutation.mutate({ post_id: post.id, body: newComent })
    }
    return (
        <Container>
            <Stack>
                <Meta title={post.title} description={`${post.body.slice(0, 1800)}...`} />
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='h3' align='center'>
                        {post.title}
                    </Typography>
                    {user?.id === post.author_id && (
                        <IconButton color='error' onClick={handleDelete} disabled={!deleteLoading}>
                            <DeleteIcon />
                        </IconButton>
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
                    <Divider />
                    <Typography>{post.body}</Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                    <Typography variant='h5'>
                        Коментарии{' '}
                        {user && (
                            <IconButton onClick={() => setFormOpen(!formOpen)}>
                                <AddIcon />
                            </IconButton>
                        )}
                    </Typography>
                    <Divider />
                    <Stack sx={{ mb: 15 }}>
                        <Collapse in={formOpen}>
                            <TextField
                                multiline
                                name='comment'
                                rows={4}
                                fullWidth
                                label='Коментарий'
                                margin='normal'
                                value={newComent}
                                onChange={(event) => {
                                    setNewComent(event.target.value)
                                }}
                                disabled={addComentLoading}
                            />
                            <Button
                                fullWidth
                                color='success'
                                variant='contained'
                                onClick={handleAddComent}
                                disabled={addComentLoading}
                            >
                                Отправить
                            </Button>
                        </Collapse>
                        {comentsLoading && <CircularProgress />}
                        {comentsError && <Typography color={'error'}>Ошибка при получении коментариев</Typography>}
                        {coments &&
                            coments.map((coment, i) => {
                                return (
                                    <Box key={i} mt={2} borderRight={'solid'}>
                                        <Stack direction={'row'} alignItems={'center'} gap={1}>
                                            <Avatar component={'span'}>{coment.author_name?.substring(0, 1)}</Avatar>
                                            <Typography>{coment.author_name}</Typography>
                                            <Typography variant='caption'>
                                                {moment(coment.created_at).format('DD.MM.YYYY HH:mm')}
                                            </Typography>
                                        </Stack>
                                        <Typography sx={{ ml: 6 }}>{coment.body}</Typography>
                                    </Box>
                                )
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
