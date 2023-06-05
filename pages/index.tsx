import { Button, CircularProgress, Collapse, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import PostService from '../services/PostService'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import PostItem from '../components/Posts/PostItem'
import PostForm from '../components/Posts/PostForm'
import Meta from '../components/Meta'

export default function Home() {
    const [isHidden, setIsHidden] = useState(true)
    const { isLoading, isError, data } = useQuery({
        queryKey: ['posts'],
        queryFn: PostService.getAll,
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
            <Meta title="Главная" description="Главня страница сайта" />
            <Collapse in={!isHidden}>
                <Grid item>
                    <PostForm />
                </Grid>
            </Collapse>
            <Grid item>
                <Button size="large" fullWidth color="primary" variant="contained" onClick={handleClick}>
                    {isHidden ? <AddIcon /> : <CloseIcon />}
                </Button>
            </Grid>

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
