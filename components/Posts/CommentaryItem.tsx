import { Box, IconButton, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PostService from '../../services/PostService'
import { FC, HTMLAttributes } from 'react'
import moment from 'moment'
import { useAuth } from '../../supabase/authProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IComent } from '../../types/posts'
import ColoredAvatar from '../ColoredAvatar'

export interface CommentaryItemProps extends HTMLAttributes<any> {
    coment: IComent
}

const CommenatyItem: FC<CommentaryItemProps> = ({ coment }) => {
    const { user, group } = useAuth()
    const queryClient = useQueryClient()
    const {
        isLoading: deleteComentLoading,
        error: deleteComentError,
        ...deleteComentMutation
    } = useMutation({
        mutationFn: (comentId: number) => {
            return PostService.deleteComent(comentId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['coments'])
        },
    })

    const handleDeleteComent = (id) => {
        deleteComentMutation.mutate(id)
    }
    return (
        <Box mt={2} borderRight={'solid'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
                <ColoredAvatar component={'span'} designator={coment.author_name} />
                <Typography>{coment.author_name}</Typography>
                <Typography variant='caption'>{moment(coment.created_at).format('DD.MM.YYYY HH:mm')}</Typography>
                {(user?.id === coment.author_id || group?.comment_deleting) && (
                    <IconButton
                        color='error'
                        onClick={() => handleDeleteComent(coment.id)}
                        disabled={deleteComentLoading}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </Stack>
            <Typography sx={{ ml: 6 }}>{coment.body}</Typography>
        </Box>
    )
}
export default CommenatyItem
