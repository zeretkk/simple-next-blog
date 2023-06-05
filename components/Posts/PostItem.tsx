import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { FC, HTMLAttributes } from 'react'
import { IPost } from '../../services/PostService'
import Link from 'next/link'

export interface PostItemProps extends HTMLAttributes<any> {
    post: IPost
}

const PostItem: FC<PostItemProps> = ({ post, ...attr }) => {
    return (
        <Card {...attr}>
            <CardMedia image={post.poster} title={post.title} sx={{ height: 480 }} />

            <CardContent>
                <Typography variant="caption">Реакций: {post.reactions} </Typography>
                <Typography variant="h5">{post.title}</Typography>
            </CardContent>
            <CardActions>
                <Link href={`/posts/${post.id}`}>
                    <Button size="small">Читать</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default PostItem
