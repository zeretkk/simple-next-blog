import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import PostService from '../../services/PostService'
import { Button, CircularProgress, Collapse, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import Meta from '../Meta'
import PostForm from './PostForm'
import PostItem from './PostItem'
import {useAuth} from "../../supabase/authProvider";

const PostList: FC = () => {
    const [isHidden, setIsHidden] = useState(true)
    const [page, setPage] = useState(1)
    const {user} = useAuth()
    const { isLoading, isError, data } = useQuery({
        queryKey: ['posts', page],
        queryFn: PostService.getPaginated,
    })
    const handleClick = () => {
        setIsHidden(!isHidden)
    }
    if (isLoading) {
        return (
            <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ height: '100dvh' }}
            >
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>
        )
    }
    if (isError) {
        return (
            <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ height: '100dvh' }}
            >
                <Grid item>
                    <Typography color={'red'}>Все сломалось</Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container direction={'column'} gap={2}>
            <Meta title='Главная' description='Главня страница сайта' />
            {user && <>
                <Collapse in={!isHidden}>
                    <Grid item>
                        <PostForm />
                    </Grid>
                </Collapse>
                <Grid item>
                    <Button size='large' fullWidth color='primary' variant='contained' onClick={handleClick}>
                        {isHidden ? <AddIcon /> : <CloseIcon />}
                    </Button>
                </Grid>
            </>}



            {data.map((post, i) => {
                return (
                    <Grid item key={i}>
                        <PostItem post={post} />
                    </Grid>
                )
            })}
        </Grid>
    )
}
export default PostList
