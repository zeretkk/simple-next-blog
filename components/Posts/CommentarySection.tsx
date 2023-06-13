import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Collapse,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { FC, FormEvent, useState } from 'react'
import { useAuth } from '../../supabase/authProvider'
import PostService from '../../services/PostService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import CommenatyItem from './CommentaryItem'

export interface IComentarySectionProps {
    postId: number
}

const ComentarySection: FC<IComentarySectionProps> = ({ postId }) => {
    const [formOpen, setFormOpen] = useState(false)
    const [newComent, setNewComent] = useState('')
    const queryClient = useQueryClient()
    const { user } = useAuth()

    const {
        data: coments,
        isLoading: comentsLoading,
        isError: comentsError,
    } = useQuery({
        queryKey: ['coments', postId],
        queryFn: PostService.getComents,
    })
    const {
        isLoading: addComentLoading,
        error: addComentError,
        ...comentMutation
    } = useMutation({
        mutationFn: (data: { post_id: number; body: string }) => {
            return PostService.addComent({ ...data })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['coments'])
            setNewComent('')
        },
    })

    const handleAddComent = (e: FormEvent | MouseEvent) => {
        e.preventDefault()
        comentMutation.mutate({ post_id: postId, body: newComent })
    }

    return (
        <Box sx={{ my: 2 }}>
            <Typography variant='h5'>
                Комментарии{' '}
                {user && (
                    <IconButton onClick={() => setFormOpen(!formOpen)}>
                        <AddIcon />
                    </IconButton>
                )}
            </Typography>
            <Divider />
            <Stack sx={{ mb: 15 }}>
                <Collapse in={formOpen}>
                    <form onSubmit={handleAddComent}>
                        {addComentError && (
                            <Typography color={'error'}>Произошла ошибка при добавлении комментария</Typography>
                        )}

                        <TextField
                            multiline
                            name='comment'
                            rows={4}
                            fullWidth
                            label='Комментарий'
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
                    </form>
                </Collapse>
                {comentsLoading && <CircularProgress />}
                {comentsError && <Typography color={'error'}>Ошибка при получении коментариев</Typography>}
                {coments &&
                    coments.map((coment, i) => {
                        return <CommenatyItem key={i} coment={coment} />
                    })}
            </Stack>
        </Box>
    )
}

export default ComentarySection
