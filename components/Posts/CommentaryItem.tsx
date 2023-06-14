import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PostService from '../../services/PostService'
import { FC, HTMLAttributes } from 'react'
import moment from 'moment'
import { useAuth } from '../../supabase/authProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IComent } from '../../types/posts'

export interface CommentaryItemProps extends HTMLAttributes<any> {
    coment: IComent
}

const CommenatyItem: FC<CommentaryItemProps> = ({ coment }) => {
    const { user } = useAuth()
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
    const stringToColor = (string: string) => {
        let hash = 0
        let i

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }

        let color = '#'

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff
            color += `00${value.toString(16)}`.slice(-2)
        }
        /* eslint-enable no-bitwise */
        return color
    }

    const handleDeleteComent = (id) => {
        deleteComentMutation.mutate(id)
    }
    return (
        <Box mt={2} borderRight={'solid'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Avatar sx={{ bgcolor: stringToColor(coment.author_id) }} component={'span'}>
                    {coment.author_name?.substring(0, 1)}
                </Avatar>
                <Typography>{coment.author_name}</Typography>
                <Typography variant='caption'>{moment(coment.created_at).format('DD.MM.YYYY HH:mm')}</Typography>
                {user?.id === coment.author_id && (
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
