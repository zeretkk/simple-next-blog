import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { FC, HTMLAttributes } from 'react'
import Link from 'next/link'
import { IPost } from '../../types/posts'
import ColoredAvatar from '../ColoredAvatar'
import moment from 'moment'

export interface IPostItemProps extends HTMLAttributes<any> {
    post: IPost
}

const PostItem: FC<IPostItemProps> = ({ post, ...attr }) => {
    return (
        <Card {...attr}>
            <CardHeader
                title={post.author}
                subheader={moment(post.created_at).format('DD.MM.YYYY HH:mm')}
                avatar={<ColoredAvatar designator={post.author} component={'div'} />}
            />
            <CardMedia image={post.poster_url} title={post.title} sx={{ height: 480 }} />

            <CardContent>
                <Typography variant='caption'>Реакций: {post.reactions} </Typography>
                <Typography variant='h5'>{post.title}</Typography>
            </CardContent>
            <CardActions>
                <Link href={`/posts/${post.id}`}>
                    <Button size='small'>Читать</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default PostItem
